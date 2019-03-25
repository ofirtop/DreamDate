const userService = require('../services/userService');
module.exports = addUserRoutes;

function addUserRoutes(app) {
    //User REST API

    //LOGIN
    app.post('/user/login', (req, res) => {

        const userCredentials = req.body;
        // console.log('userCredentials', userCredentials); 
        return userService.checkLogin(userCredentials)
            .then(user => {
                // console.log('user: ', user)
                req.session.loggedInUser = user;
                res.cookie('testTest', 'check123')
                console.log('user-route - LOGIN - req.session.loggedInUser:', req.session.loggedInUser.name);
                return res.json(user)
            })
            .catch(err => {
                console.log('user-route: LOGIN catch:', err);
                res.status(500).send('Wrong Credentials')
            })
    })

    //LOGOUT
    app.get('/user/logout', (req, res) => {
        // console.log('user-route:LOGOUT - req.session.loggedInUser: ', req.session.loggedInUser.name)
        req.session.destroy();
        // console.log('user-route:LOGOUT - AFTER DESTROY: req.session.loggedInUser: ',req.session.loggedInUser)
        // res.json({})

        res.end()
    });

    //GET list
    app.get('/user', (req, res) => {
        let query = req.query; //contains the filter                     
        // console.log('users-toute:GET list - req.session.loggedInUser: ', req.session.loggedInUser)
        userService.query(query, req.session.loggedInUser)
            .then(users => {
                return res.json(users)
            });
    })

    //GET single
    app.get('/user/:userId', (req, res) => {
        let userId = req.params.userId;
        userService.getById(userId, req.session.loggedInUser)
            .then(user => res.json(user))
    })

    //DELETE
    app.delete('/user/:userId', (req, res) => {
        let userId = req.params.userId;
        console.log('this is the params', userId)

        userService.remove(userId)
            .then(() => res.json({}))
    })

    //ADD (CREATE)
    app.post('/user', (req, res) => {
        var user = req.body;

        userService.add(user)
            .then(user => res.json(user))
    })

    // UPDATE
    app.put('/user/:userId', (req, res) => {
        const user = req.body;
        console.log('User UPDATE: ', user)
        userService.update(user)
            .then(updatedUser => {
                console.log('UPDATED User RECEIVED FROM Service: ', updatedUser)
                return res.json(updatedUser)
            })
    })

    //UPDATE LIKE
    app.put('/like', (req, res) => {
        let userId = req.session.loggedInUser._id;
        let memberId = req.body._id;

        userService.updateLike(userId, memberId)
            .then(() => {
                console.log('updated like');
                res.json({ message: 'Updated' })
            })
    })

    //UPDATE NOT LIKE
    app.put('/notlike', (req, res) => {
        let userId = req.session.loggedInUser._id;
        let memberId = req.body._id;
        console.log('INSIDE USER ROUTE: ', memberId)
        userService.updateDoNotLike(userId, memberId)
            .then(() => {
                console.log('updated NOT like');
                res.json({ message: 'Updated' })
            })
    })
}