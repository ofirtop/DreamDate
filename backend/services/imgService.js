const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;
//Require Wrapper Library for the Pexels service (images service)
const PexelsAPI = require('pexels-api-wrapper');

const API_PEXELS_KEY = '563492ad6f91700001000001a9cb562806c14598b9107bae5e8012e4';

module.exports = {
    query
}

function query(query) {
    //Create Client instance by passing in API key
    var pexelsClient = new PexelsAPI(API_PEXELS_KEY);

    //Search API

    // Param Type Description
    // query string	The search term to query the API with
    // per_page	number	The number of results to return per page (Defaults to 10)
    // page	number	The page number to return (Defaults to 1)
    // PexelsAPI.search(query, per_page, page);
    return pexelsClient.search(query.term, 30, 1)
        .then(function (result) {
            for (i = 0; i < 30; i++) {
                // console.log('result.photos:', result.photos[i].src.original);
                console.log('result.photos:', result.photos[i].src.medium);
            }
        }).
        catch(function (e) {
            console.err(e);
        });
}

