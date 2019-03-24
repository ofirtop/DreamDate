const userService = require('../services/userService');
module.exports = addUserRoutes;

function addUserRoutes(app) {
    //User REST API

    //LOGIN
    app.post('/user/login', (req, res) => {
        const userCredentials = req.body;
        return userService.checkLogin(userCredentials)
            .then(user => {
                req.session.loggedInUser = user;
                console.log('user-route - LOGIN - req.session.loggedInUser.name:', req.session.loggedInUser.name);
                return res.json(user)
            })
            .catch(err => {
                console.log('user-route: LOGIN catch:', err);
                res.status(500).send('Wrong Credentials')
            })      
    })

    //LOGOUT
    app.get('/user/logout', (req, res) => {
        console.log('user-route:LOGOUT - req.session.loggedInUser: ',req.session.loggedInUser)
        req.session.destroy();
        console.log('user-route:LOGOUT - AFTER DESTROY: req.session.loggedInUser: ',req.session.loggedInUser)
        res.json({})
    });

    //GET list
    app.get('/user', (req, res) => {
        console.log('Entering user-route: GET list');
         let query = req.query; //contains the filter
        userService.query(query)
        .then(users => {
            return res.json(users)
        });
    })
    
    //GET single
    app.get('/user/:userId', (req, res) => {
        let userId = req.params.userId;
        userService.getById(userId)
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
        console.log('User UPDATE: ',user)
        userService.update(user)
            .then(updatedUser => {
                console.log('UPDATED User RECEIVED FROM Service: ',updatedUser)
                return res.json(updatedUser)
            })
    })

}