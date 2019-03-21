const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const imgService = require('./imgService')

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}

function query(/*query*/) {
    console.log('User SERVICE: about to connect to DreamDateDB')
    // var queryToMongo = createQueryToMongo(query);
    // var sorter = query.sort === 'price' ? 'price' : 'name';
    // console.log('sorter:', sorter)
    return mongoService.connect()
        .then(db => {
            console.log('connection to DreamDateDB established.')
            // if (query.sort === 'price' || query.sort !== 'name'){
            // console.log('userService: query() - sort by PRICE')
            // return db.collection('user').find(queryToMongo).sort({ 'price': 1 }).toArray();

            return db.collection('user').find({}).toArray()
                .then(users => {
                    // imgService.query({term:'woman', usersCount:users.length})
                    return users
                })
            // }
            // else {
            //     // console.log('NAME')
            //     return db.collection('user').find(queryToMongo).sort({ 'name': 1 }).toArray();
            // }
        })
}

function createQueryToMongo(query) {
    let queryToMongo = {};
    if (query.name) queryToMongo.name = { '$regex': query.name };//search for a string with the name
    if (query.type) queryToMongo.type = { '$regex': query.type };

    if (query.inStock !== 'NA') {
        if (query.inStock === true || query.inStock === 'true') queryToMongo.inStock = true;
        else queryToMongo.inStock = false;
    }

    return queryToMongo;
}

function getById(userId) {
    var id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection('user').findOne({ _id: id }))
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