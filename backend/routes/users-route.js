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
                console.log('**********************************************************');
                console.log('NEW LOGIN : ', req.session.loggedInUser.name);
                console.log('**********************************************************');
                return res.json(user)
            })
            .catch(err => {
                console.log('user-route: LOGIN catch:', err);
                res.status(500).send('Wrong Credentials')
            })
    })

    //SIGNUP
    app.post('/user/signup', (req, res) => {

        const userCredentials = req.body;
        
        return userService.signUp(userCredentials)
            .then(user => {
                req.session.loggedInUser = user;
                console.log('**********************************************************');
                console.log('NEW LOGIN (AFTER SIGNUP) : ', req.session.loggedInUser.name);
                console.log('**********************************************************');
                return res.json(user)
            })
            .catch(err => {
                console.log('user-route: SIGNUP catch:', err);
                res.status(500).send('Problem Signup')
            })
    })    

    //LOGOUT
    app.get('/user/logout', (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');
        console.log('**********************************************************');
        console.log('LOGOUT : ', req.session.loggedInUser.name);
        console.log('**********************************************************');

        req.session.destroy();
        // res.json({})

        res.end()
    });

    //GET list
    app.get('/user', (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

        let query = req.query; //contains the filter                     
        console.log(`New Members List - Request by ** ${req.session.loggedInUser.name} **`)
        userService.query(query, req.session.loggedInUser)
            .then(users => {
                console.log(`List Requested by ** ${req.session.loggedInUser.name} ** Retrieved:`)
                users.forEach(user => {
                    console.log(`   >>   ${user.name}`)
                });
                console.log(`********** END OF LIST **********`)

                return res.json(users)
            });
    })

    //GET single
    app.get('/user/:userId', (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

        let userId = req.params.userId;
        userService.getMemberById(userId, req.session.loggedInUser)
            .then(user => res.json(user))
    })

    //DELETE
    app.delete('/user/:userId', (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');
        let userId = req.params.userId;
        userService.remove(userId)
            .then(() => res.json({}))
    })

    //ADD (CREATE)
    app.post('/user', (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

        var user = req.body;
        userService.add(user)
            .then(user => res.json(user))
    })

    // UPDATE
    app.put('/user/:userId', (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

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
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');

        let userId = req.session.loggedInUser._id;
        let memberId = req.body._id;
        console.log(`New Update <LIKE> Requested by ${req.session.loggedInUser} on ${memberId}`)
        userService.updateLike(userId, memberId)
            .then(() => {
                console.log('<LIKE> Request Confirmed');
                res.json({ message: 'Updated' })
            })
    })

    //UPDATE NOT LIKE
    app.put('/notlike', (req, res) => {
        if (req.session.loggedInUser === undefined) return res.status(500).send('Wrong Credentials');
        
        let userId = req.session.loggedInUser._id;
        let memberId = req.body._id;
        console.log(`New Update <NOT LIKE> Requested by ${req.session.loggedInUser} on ${memberId}`)
        userService.updateDoNotLike(userId, memberId)
            .then(() => {
                console.log('<NOT LIKE> Request Confirmed');
                res.json({ "_id": memberId })
            })
    })
}