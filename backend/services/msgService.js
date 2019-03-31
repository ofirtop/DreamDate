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
    //TODO add to DB

    msgs.push(msg);
    //console.log('msgs', msgs);

    return Promise.resolve();
}

function getTopMsgs(userId) {
    //TODO get from Msg table in DB
    //console.log('msgs', msgs);
    let userMsgs = msgs.filter(msg => (msg.to === userId));
    userMsgs.reverse();
    let topMsgsMap = userMsgs.reduce((acc, msg) => {
        if (acc[msg.from]) return acc;

        acc[msg.from] = msg;
        return acc;
    }, {});

    //console.log('topMsgsMap', topMsgsMap);

    let topMsgs = Array.from(Object.values(topMsgsMap));
    //console.log('topMsgs arr', topMsgs);
    topMsgs = topMsgs.sort((msgA, msgB) => msgA.timestamp < msgB.timestamp);
    //console.log('topMsgs arr sorted', topMsgs);

    //get member details
    let memberDetailsPrms = [];
    topMsgs.forEach(async msg => {
        console.log('msg from',msg.from );
        
        memberDetailsPrms.push(userService.getMemberById(msg.from, userId)
            .then(member => {
                let msgCopy = JSON.parse(JSON.stringify(msg));
                msgCopy.from = { _id: member._id, name: member.name, mainImage: member.mainImage };
                return msgCopy;
            }));

    });
    //console.log('topMsgs final', topMsgs);

    return Promise.all(memberDetailsPrms, msgsForClient => {
       // console.log('topMsgsWithDetails', topMsgs);
        return msgsForClient;
    });
}