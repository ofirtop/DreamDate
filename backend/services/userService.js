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

function query(query) {
    console.log('User SERVICE: about to connect to DreamDateDB')
    var queryToMongo = createQueryToMongo(query);
     
    // var sorter = query.sort === 'price' ? 'price' : 'name';
    // console.log('sorter:', sorter)
    return mongoService.connect()
        .then(db => {
            console.log('userService: query - connection to DreamDateDB established.')
            
            return db.collection('user').find(queryToMongo).toArray();
            // return db.collection('user').find({"dateOfBirth" : { $gte : new Date("1990-10-01T00:00:00.000Z") },"gender":"female"}).toArray();
        })
}

function createQueryToMongo(query) {   
    let queryToMongo = {};
    // if (query.name) queryToMongo.name = { '$regex': query.name };//search for a string with the name
    // if (query.type) queryToMongo.type = { '$regex': query.type };

    // if (query.inStock !== 'NA') {
    //     if (query.inStock === true || query.inStock === 'true') queryToMongo.inStock = true;
    //     else queryToMongo.inStock = false;
    // }
    if (query.city){
        console.log('CITY: ',query.city)
         queryToMongo.city = { '$regex': query.city };
    }
    if (query.minHeight){
        console.log('MIN HEIGHT: ',query.minHeight)
         queryToMongo.height =  { $gte : +query.minHeight }
    }
    if (query.gender) queryToMongo.gender = query.gender;
    if(query.minAge && query.maxAge){
        var minDate = _getMinDate(query.minAge)
        var maxDate = _getMaxDate(query.maxAge)
        queryToMongo.dateOfBirth =  { $lt : minDate ,$gte : maxDate}
    }
    else if (query.minAge) { 
        var minDate = _getMinDate(query.minAge)
        queryToMongo.dateOfBirth =  { $lt : minDate }
    }
    else if (query.maxAge) { 
        var maxDate = _getMaxDate(query.maxAge)
        queryToMongo.dateOfBirth =  { $gte : maxDate }
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

function _getMinDate(queryMinAge){
    console.log('ENTER MIN AGE: ',queryMinAge)
    var minDate = new Date();
    minDate.setFullYear( minDate.getFullYear() - queryMinAge );
    console.log('MIN YEAR: ',minDate);
    return minDate;
}

function _getMaxDate(queryMaxAge){
    console.log('ENTER MAX AGE: ',queryMaxAge)
    var maxDate = new Date();
    maxDate.setFullYear( maxDate.getFullYear() - queryMaxAge );
    console.log('MAX YEAR: ',maxDate);
    return maxDate;
}
