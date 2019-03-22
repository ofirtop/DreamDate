export default {
    query,
    add
};

let likes = [];

function _createLikes(userId = '5c921ba999879a164c7df9ed') {
    likes.push(_createLike(userId, '5c921ba999879a164c7df9f4'));
    likes.push(_createLike(userId, '5c921ba999879a164c7df9ef'));
    likes.push(_createLike('5c921ba999879a164c7df9ef', userId));
    likes.push(_createLike('5c921ba999879a164c7df9fe', userId));

console.log('likeService. _createLikes. likes:', likes);

    // setTimeout(() => {
    //     likes.push(_createLike('5c921ba999879a164c7df9fd', userId));
    // }, 60 * 1000);
}
function _createLike(from, to) {
    return { from, to };
}

function query(userId) {
    _createLikes(userId);
    return Promise.resolve(likes);
}

function add(userId, memberId) {
    likes.push(_createLike(userId, memberId));
}
