const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const userService = require('./userService');


module.exports = {
    getHistoryMsgs,
    add,
    getTopMsgs,
    markMsgAsRead
};

async function markMsgAsRead(msgId){
    msgId = new ObjectId(msgId);

    let db = await mongoService.connect();
    return db.collection('msg').updateOne({ _id: msgId }, { $set: {isRead: true} });
}

async function getHistoryMsgs(userId1, userId2) {
    //TODO get from DB
    userId1 = new ObjectId(userId1);
    userId2 = new ObjectId(userId2);

    return mongoService.connect()
        .then(db => {
            return db.collection('msg').find(
                {
                    //$or: [ { "from": userId1 },{ "to": userId2 }]
                    $or: [
                        {
                            "from": userId1,
                            "to": userId2
                        },
                        {
                            "from": userId2,
                            "to": userId1
                        }
                    ]
                }).toArray()
        });
}

function add(msg) {
    msg.isRead = false;
    msg.from = new ObjectId(msg.from);
    msg.to = new ObjectId(msg.to);

    return mongoService.connect()
        .then(db => db.collection('msg').insertOne(msg))
        .then(result => {
            msg._id = result.insertedId;
            //console.log('msgSvc', 'insert msg', msg);
            return msg;
        })
        .catch(err => {
            //console.error('msgSvc', 'insert msg', err);
            throw err;
        });
}

async function getTopMsgs(userId) {
    //console.log('msgSvc', 'getTopMsgs', userId);
    userId = new ObjectId(userId)
    let msgs = await mongoService.connect()
        .then(db => {
            return db.collection('msg')
                .aggregate([
                    {
                        $match: {
                            "to": userId
                        }
                    },
                    {
                        $group: {
                            _id: '$from',
                            maxTimestamp: { $max: '$timestamp' }
                        }
                    },
                    {
                        $sort: {
                            maxTimestamp: -1
                        }
                    },
                    {
                        $lookup: {
                            from: 'msg',
                            let: { fromId: "$_id", timeStamp: "$maxTimestamp" },
                            pipeline: [
                                {
                                    $match:
                                    {
                                        $expr:
                                        {
                                            $and:
                                                [
                                                    { $eq: ["$from", "$$fromId"] },
                                                    { $eq: ["$timestamp", "$$timeStamp"] }
                                                ]
                                        }
                                    }
                                }
                            ],
                            as: 'msg'
                        }
                    },
                    {
                        $unwind: "$msg"
                    },
                    {
                        $lookup: {
                            from: 'user',
                            localField: 'msg.from',
                            foreignField: '_id',
                            as: 'fromUser'
                        }
                    },
                    {
                        $unwind: "$fromUser"
                    },
                    {
                        $project: {
                            "_id": "$msg._id",
                            "txt": "$msg.txt",
                            "isRead": "$msg.isRead",
                            "fromUser._id": 1,
                            "fromUser.name": 1,
                            "fromUser.mainImage": 1,
                        }
                    },

                ]).toArray()
        });
    //console.log('msgs', msgs);
    return Promise.resolve(msgs);
}