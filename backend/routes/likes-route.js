const likeService = require('../services/likeService');
module.exports = addLikeRoutes;

function addLikeRoutes(app) {
    //LIKE REST API

    //GET list of likes which likes this userId
    app.get('/like/:userId', (req, res) => {//CHANGE FUNCTION - SEE REMARK !!!!!!!!!!!!!!!!!!!!!!!
        //INSTEAD OF PASSING req.params (REQUESTER ID) > Pass: req.session.loggedInUser._Id
        likeService.query(req.params)
            .then(likes => {
                return res.json(likes)
            })
            .catch(err => {
                console.log('like-route: GET list: Error retuned from mongo: ', err)
            })
    })

    //DELETE
    app.delete('/like', (req, res) => {
        let likeId = req.body._id;
        console.log('likes-route:delete > req.params.likeId:', likeId)

        likeService.remove(likeId)
            .then(() => res.json({}))
            .catch(err => {
                console.log('likes-route: delete: Error from mongoDB: ', err);
            })
    })

    //ADD (CREATE)
//     app.put('/user/like', (req, res) => {//CHANGE FUNCTION - SEE REMARK !!!!!!!!!!!!!!!!!!!!!!!
//         //like body should be from "to._Id" only the from Id will be retrieved from session
//         var like = req.body;
//         console.log('LIKE: ', like);
//         console.log('req.session.loggedInUser.name', req.session.loggedInUser.name);
//         // if (req.session.loggedInUser._id === like.from._id) //THIS WILL GO ACTIVE AFTER LOGIN USER IS WORKING
//         likeService.add(like)
//             .then(receivedLike => res.json(receivedLike))
//     })
}