const msgService = require('../services/msgService');

module.exports = addMsgRoutes;

function addMsgRoutes(app) {
    //Msg REST API

      //GET MSGS by MemberId
      app.get('/msg/:memberId', async (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

        let userId = req.session.loggedInUser._id;
        let memberId = req.params.memberId;
        let msgs = await msgService.getHistoryMsgs(userId, memberId);
        res.json(msgs);
    });

    app.get('/msg', async (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

        let userId = req.session.loggedInUser._id;
        let msgs = await msgService.getTopMsgs(userId);
        res.json(msgs);
    });
}