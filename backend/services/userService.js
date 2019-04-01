const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const imgService = require('./imgService')
const socketService = require('./socketService');

module.exports = {
    query,
    getById,
    add,
    remove,
    update,
    checkLogin,
    signUp,
    updateLike,
    updateDoNotLike,
    getMemberById,
    queryMatch
}

function query(query, loggedUser) {
    console.log(`Query Details:`)
    var queryToMongo = createQueryToMongo(query);

    return mongoService.connect()
        .then(db => {
            return db.collection('user').find(queryToMongo).toArray()
                // return db.collection('user').find({}).toArray()
                .then(members => {
                    if (members) {
                        members = members.filter(currMember => {
                            if (currMember._id + '' === loggedUser._id + '') return false;
                            var idx = currMember.MemberWhoDidNotLikeMe.findIndex(item => {
                                return item._id + '' === loggedUser._id + ''
                            })
                            if (idx === -1) return true;
                            return false;
                        })

                        let modifiedMembers = members.map(member => {
                            return _modifyUserBeforeSend(member, loggedUser)
                        })
                        // console.log(modifiedMembers)

                        //remove match members
                        modifiedMembers = modifiedMembers.filter(member => !(member.likes.iLike));

                        return modifiedMembers;
                    } else {
                        return Promise.reject("No Clients")
                    }
                })

        })
}

function queryMatch(loggedUser) {
    console.log(`Query Match Details:`)

    return mongoService.connect()
        .then(db => {
            return db.collection('user').find().toArray()
                .then(members => {
                    if (members) {
                        let modifiedMembers = members.map(member => {
                            return _modifyUserBeforeSend(member, loggedUser)
                        })
                        var filteredMembers = modifiedMembers.filter(currMember => {
                            if (currMember._id + '' === loggedUser._id + '') return false;
                            return currMember.likes.iLike && currMember.likes.likeMe;
                        })
                        // console.log(modifiedMembers)
                        return filteredMembers;
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
    console.log('userService:updateDoNotLike() memberId: ', memberId);
    console.log('userService:updateDoNotLike() userId: ', userId);

    return getById(memberId)
        .then(member => {
            console.log('userService: updateDoNotLike(): ', member)

            member.MemberWhoDidNotLikeMe.push({ "_id": new ObjectId(userId) })
            return update(member);
        })
}

function _modifyUserBeforeSend(memberToModify, loggedUser) {
    memberToModify.likes = { "iLike": false, "likeMe": false, "isRead": false };
    //Does the userToModify likes the loggedInUser?
    if (memberToModify.membersILike.length !== 0) {
        let memberILikeId = memberToModify.membersILike.find(memberILike => {
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

    //online status
    memberToModify.online =  socketService.getByUserId(memberToModify._id);

    return memberToModify;
}

function checkLogin(userCredentials) {
    return mongoService.connect()
        .then(db => {
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

function signUp(userCredentials) {
    console.log('userService signup')
    console.log(userCredentials, 'lengthPass:', userCredentials.pass.length);
    
    if (userCredentials.pass.length < 3) return Promise.reject('Wrong Credentials: password must be at list 3 characters');
    _getByName(userCredentials.name)
        .then(existingUser=>{
            if(existingUser) return Promise.reject('User Allready Exists!');
        })
    var user = _getEmptyUser(userCredentials);
    return add(user)
        .then(user => {
            user.pass = '';
            return Promise.resolve(user);
        })
        .catch(err => { Promise.reject(`Could not create new user : ${err}`) })
}

function _getEmptyUser(userCredentials) {
    return {
        name: userCredentials.name,
        pass: userCredentials.pass,
        email: '',
        gender: '',
        dateOfBirth: new Date(),
        city: '',
        maritalStatus: '',
        numOfChildren: 0,
        height: 0,
        interestedIn: {
            minAge: 0,
            maxAge: 0,
            gender: ''
        },
        descr: '',
        mainImage: '',
        images: [],
        membersILike: [],
        membersWhoLikeMe: [],
        membersIWatched: [],
        membersWhoWatchedMe: [],
        MemberWhoDidNotLikeMe: []
    }

}

function createQueryToMongo(query) {
    let queryToMongo = {};

    if (query.city) {
        queryToMongo.city = { '$regex': query.city };
        console.log(`City: ${queryToMongo.city}`)
    }
    if (query.minHeight) {
        queryToMongo.height = { $gte: +query.minHeight }
        console.log(`Min Height: ${queryToMongo.height}`)
    }
    if (query.gender) {
        queryToMongo.gender = query.gender;
        console.log(`Gender: ${queryToMongo.gender}`)
    }
    if (query.minAge && query.maxAge) {
        var minDate = _getMinDate(query.minAge)
        var maxDate = _getMaxDate(query.maxAge)
        queryToMongo.dateOfBirth = { $lt: minDate, $gte: maxDate }

        console.log(`Min Age: ${query.minAge} (DBO: ${minDate})`)
        console.log(`Max Age: ${query.maxAge} (DBO: ${maxDate})`)
    }
    else if (query.minAge) {
        var minDate = _getMinDate(query.minAge)
        queryToMongo.dateOfBirth = { $lt: minDate }
        console.log(`Min Age: ${query.minAge} (DBO: ${minDate})`)
    }
    else if (query.maxAge) {
        var maxDate = _getMaxDate(query.maxAge)
        queryToMongo.dateOfBirth = { $gte: maxDate }
        console.log(`Max Age: ${query.maxAge} (DBO: ${maxDate})`)
    }
    return queryToMongo;
}

function getById(userId) {
    var id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id: id }))
}

function _getByName(userName) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ name: userName }))
}

function getMemberById(userId, loggedInUser) {
    var id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id: id }))
        .then(memberToModify => {
            var userToSend = _modifyUserBeforeSend(memberToModify, loggedInUser);
            //console.log(userToSend);
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
    user.dateOfBirth = new Date(user.dateOfBirth);
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
