const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;


module.exports = {
    query
}

function query(filterBy) {
    console.log('Likes SERVICE: about to connect to DreamDateDB');
    // var queryToMongo = createQueryToMongo(query);
    // var sorter = query.sort === 'price' ? 'price' : 'name';
    // console.log('sorter:', sorter)
    return mongoService.connect()
        .then(db => {
            let id = ObjectId(filterBy.userId);
            return db.collection('city').find({ }).toArray();
        })
}
