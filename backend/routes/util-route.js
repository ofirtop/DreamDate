const likeService = require('../services/utilService');
module.exports = addUtilRoutes;

function addUtilRoutes(app) {
    //Util REST API

    //GET list of cities
    app.get('/city', (req, res) => {//CHANGE FUNCTION - SEE REMARK !!!!!!!!!!!!!!!!!!!!!!!
        
        utilService.query()
            .then(cities => {
                return res.json(cities)
            })
            .catch(err => {
                console.log('util-route: GET list of Cities: Error retuned from mongo: ', err)
            })
    })

}