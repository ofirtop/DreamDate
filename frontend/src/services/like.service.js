import userService from './user.service.js';

export default {
    queryMembersILike,
    queryMembersWhoLikeMe,
    add
};

let membersILikes = [];
let membersWhoLikeMe = [];

let loggedInUserId = 1;

_createLikes();

function _createLikes(){
    for(let i = 0; i < 3; i++){
        membersILikes.push(_createLike(loggedInUserId, i*3)); 
    }

    for(let i = 0; i < 3; i++){
        membersWhoLikeMe.push(_createLike(i*2, loggedInUserId)); 
     }

     let i = 2;
     setInterval(()=>{
        //  let memberWhoLikeMe = membersWhoLikeMe.find(like => like.from === i);
        //  while(memberWhoLikeMe){
        //     memberWhoLikeMe = membersWhoLikeMe.find(like => like.from === ++i);
        //  }
         membersWhoLikeMe.push(_createLike(i++, loggedInUserId))
     }, 10000);

}
function _createLike(from, to){
    return {from, to};
}

function queryMembersILike(userId){
    return Promise.resolve(membersILike);
}

function queryMembersWhoLikeMe(userId){
    //return Promise.resolve(membersWhoLikeMe);
    return membersWhoLikeMe;
}

function add(userId, memberId){
    likes.push(_createLike(userId, memberId));
}
