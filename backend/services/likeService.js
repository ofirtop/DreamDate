const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    query,
    add,
    remove
}

function query(filterBy) {
    console.log('Likes SERVICE: about to connect to DreamDateDB');
    // var queryToMongo = createQueryToMongo(query);
    // var sorter = query.sort === 'price' ? 'price' : 'name';
    // console.log('sorter:', sorter)
    return mongoService.connect()
        .then(db => {
            let id = ObjectId(filterBy.userId);
            return db.collection('like').find({ $or: [{ "to._id": id }, { "from._id": id }] }).toArray();
        })
}

function remove(likeId) {
    var id = new ObjectId(likeId);
    return mongoService.connect()
        .then(db => db.collection('like').deleteOne({ _id: id }))

}

function add(like) {
    console.log('BACKEND - userService:add() like received (maybe its not like but memberId):',like);
    return mongoService.connect()
        .then(db => db.collection('like').insertOne(like))
        .then(result => {
            like._id = result.insertedId;

            console.log('DB RES: inserted ID: ',like._id)
            return like;
        })
}