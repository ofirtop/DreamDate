const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
const userService = require('./userService');


module.exports = {
    getHistoryMsgs,
    add,
    getTopMsgs
};

let msgs = [];

function getHistoryMsgs(userId1, userId2) {
    //TODO get from DB
    let filteredMsgs = msgs.filter(msg => (msg.from === userId1 && msg.to === userId2)
        || (msg.from === userId2 && msg.to === userId1)
    );

    return Promise.resolve(filteredMsgs);
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
    console.log('msgSvc', 'getTopMsgs', userId);
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
    console.log('msgs', msgs);
    return Promise.resolve(msgs);
}