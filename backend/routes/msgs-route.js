const msgService = require('../services/msgService');

module.exports = addMsgRoutes;

function addMsgRoutes(app) {
  //Msg REST API

  //GET MSGS by MemberId
  app.get('/user-msg/:memberId', async (req, res) => {
    if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

    let userId = req.session.loggedInUser._id;
    let memberId = req.params.memberId;
    let msgs = await msgService.getHistoryMsgs(userId, memberId);
    res.json(msgs);
  });

  //GET top msgs of user
  app.get('/user-msg', async (req, res) => {
    if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

    let userId = req.session.loggedInUser._id;
    let msgs = await msgService.getTopMsgs(userId);
    res.json(msgs);
  });

  //GET top msgs of user
  app.get('/msg/:msgId', async (req, res) => {
    //console.log('route','GET /msg/:msgId', req.params.msgId);
    
    if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

    let { msgId } = req.params;
    let msg = await msgService.getById(msgId);
    //console.log('msg',msg);
    
    res.json(msg);
  });

  app.put('/msg/:msgId', async (req, res) => {
    if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

    let { msgId } = req.params;
    await msgService.markMsgAsRead(msgId);
    res.end();
  });

}