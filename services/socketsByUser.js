let userSockets = {};
let socketProcessing = {};

socketProcessing.add = function(userId, socket) {
    if (!userSockets[userId]) {
        userSockets[userId] = [socket];
    } else {
        userSockets[userId].push(socket);
    }
}

socketProcessing.remove = function(userId, socket) {
    userSockets[userId].splice(userSockets[userId].indexOf(socket), 1);
}

socketProcessing.send = function(userId, socketChannel, body) {
    console.log()
    for(var i = 0; i < userSockets[userId].length; i++) {
        console.log('hit!!!!!!!!!!!!!!!!!!!!!!!!!')

        userSockets[userId][i].emit(socketChannel, body);
    }
}

module.exports = {
    socketProcessing
};