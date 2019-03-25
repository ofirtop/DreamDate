const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const imgService = require('./imgService')

module.exports = {
    query,
    getById,
    add,
    remove,
    update,
    checkLogin,
    updateLike,
    updateDoNotLike,
    getMemberById
}

function query(query, loggedUser) {
    console.log('ENTER QUERY: ',query)
    var queryToMongo = createQueryToMongo(query);
    console.log('ENTER QUERY (queryToMongo): ',queryToMongo)

    return mongoService.connect()
        .then(db => {
            return db.collection('user').find(queryToMongo).toArray()
            // return db.collection('user').find({}).toArray()
                .then(members => {
                    if (members) {
                        members = members.filter(currMember => {
                            var idx = currMember.MemberWhoDidNotLikeMe.findIndex(item => {
                                return item._id + '' === loggedUser._id + ''
                            })
                            console.log('idx:', idx)
                            if (idx === -1) return true;
                            return false;
                        })

                        let modifiedMembers = members.map(member => {
                            return _modifyUserBeforeSend(member, loggedUser)
                        })
                        // console.log(modifiedMembers)
                        return modifiedMembers;
                    } else {
                        return Promise.reject("No Clients")
                    }
                })

        })
}

function updateLike(userId, memberId) {
    return Promise.all([getById(userId), getById(memberId)])
        .then(([user, member]) => {
            member.membersWhoLikeMe.push({ "_id": new ObjectId(userId), "isRead": false });
            user.membersILike.push({ "_id": new ObjectId(memberId) });

            return Promise.all([update(user), update(member)])
        })
}

function updateDoNotLike(userId, memberId) {
    console.log('userService:updateDoNotLike(): ', memberId);

    return getById(memberId)
        .then(member => {
            member.MemberWhoDidNotLikeMe.push({ "_id": new ObjectId(userId) })
            return update(member);
        })
}

function _modifyUserBeforeSend(memberToModify, loggedUser) {
    console.log('memberToModify.name: ', memberToModify.name)

    memberToModify.likes = { "iLike": false, "likeMe": false, "isRead": false };
    //Does the userToModify likes the loggedInUser?
    if (memberToModify.membersILike.length !== 0) {
        let memberILikeId = memberToModify.membersILike.find(memberILike => {
            // if (memberILike === undefined) console.log('MEMBER TO MODIFY: (memberILike===undefined)', memberToModify.name)
            // if (loggedUser === undefined) console.log('MEMBER TO MODIFY: (loggedUser===undefined) ', memberToModify.name)
            if (memberILike) return (memberILike._id + '') === (loggedUser._id + '');
            return false;
        })
        memberToModify.likes.likeMe = memberILikeId ? true : false;
    } else { memberToModify.likes.likeMe = false; }

    //Does the loggedInUser likes the userToModify?
    if (memberToModify.membersWhoLikeMe.length !== 0) {
        let memberWhoLikeMeId = memberToModify.membersWhoLikeMe.find(memberWhoLikeMe => {
            if (memberWhoLikeMe) return (memberWhoLikeMe._id + '') === (loggedUser._id + '');
            return false;
        })
        memberToModify.likes.iLike = memberWhoLikeMeId ? true : false;
    } else { memberToModify.likes.iLike = false; }

    return memberToModify;
}

function checkLogin(userCredentials) {
    // console.log('userCredentials', userCredentials);

    return mongoService.connect()
        .then(db => {
            // console.log(`LOGIN ATTEMPT, name: ${userCredentials.name} pass: ${userCredentials.pass}`)
            return db.collection('user').findOne({ $and: [{ "name": userCredentials.name }, { "pass": userCredentials.pass }] })
                .then(user => {
                    if (user) {
                        var userToReturn = { ...user };
                        userToReturn.pass = '';
                        return Promise.resolve(userToReturn)
                    } else {
                        return Promise.reject('Wrong Credentials: ')
                    }
                })
        })
}

function createQueryToMongo(query) {
    let queryToMongo = {};

    // if (query.city) {
    //     queryToMongo.city = { '$regex': query.city };
    // }
    // if (query.minHeight) {
    //     queryToMongo.height = { $gte: +query.minHeight }
    // }
    // if (query.gender) queryToMongo.gender = query.gender;
    if (query.minAge && query.maxAge) {
        var minDate = _getMinDate(query.minAge)
        var maxDate = _getMaxDate(query.maxAge)
        console.log('filter minAge: ', query.minAge, 'maxAge: ', query.maxAge);
        console.log('Mongo minDate: ', minDate, 'maxDate: ', maxDate);
        
        queryToMongo.dateOfBirth = { $lt: minDate, $gte: maxDate }
    }
    else if (query.minAge) {
        var minDate = _getMinDate(query.minAge)
        queryToMongo.dateOfBirth = { $lt: minDate }
    }
    else if (query.maxAge) {
        var maxDate = _getMaxDate(query.maxAge)
        queryToMongo.dateOfBirth = { $gte: maxDate }
    }
    console.log(queryToMongo)
    return queryToMongo;
}

function getById(userId) {
    var id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id: id }))
}

function getMemberById(userId,loggedInUser) {
    var id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id: id }))
        .then(memberToModify => {
            var userToSend = _modifyUserBeforeSend(memberToModify,loggedInUser);
            console.log(userToSend);
            return userToSend;
        })
}

function remove(userId) {
    var id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection('user').deleteOne({ _id: id }))

}

function add(user) {
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user))
        .then(result => {
            user._id = result.insertedId;
            return user
        })
}

function update(user) {
    const strId = user._id
    user._id = new ObjectId(user._id)
    return mongoService.connect()
        .then(db => db.collection('user').updateOne({ _id: user._id }, { $set: user }))
        .then(() => user)
}

function _getMinDate(queryMinAge) {
    // console.log('ENTER MIN AGE: ', queryMinAge)
    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - queryMinAge);
    // console.log('MIN YEAR: ', minDate);
    return minDate;
}

function _getMaxDate(queryMaxAge) {
    // console.log('ENTER MAX AGE: ', queryMaxAge)
    var maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - queryMaxAge);
    // console.log('MAX YEAR: ', maxDate);
    return maxDate;
}
