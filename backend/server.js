const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');

const addUserRoutes = require('./routes/users-route')
const addLikesRoutes = require('./routes/likes-route')


const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);



app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8084'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello Charlies Angels...')
})

addUserRoutes(app)
addLikesRoutes(app)


/*SOCKET START */
const connectedSockets = [];

io.on('connection', socket => {
  console.log('user connected', socket.id);
  connectedSockets.push(socket);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.userId);
    let idx = connectedSockets.findIndex(currSocket => currSocket.userId === socket.userId);
    if (idx >= 0) connectedSockets.splice(idx, 1);
    socket.broadcast.emit('member logout', socket.userId);
  });

  socket.on('login', userId => {
    console.log('user login', userId);
    socket.userId = userId;
    socket.broadcast.emit('member login', userId);
  });

  socket.on('logout', () => {
    console.log('user logout', socket.userId);
    socket.broadcast.emit('member logout', socket.userId);
  });

  socket.on('chat msg from', msg => {
    console.log('received chat msg', msg);

    let targetSocket = connectedSockets.find(currSocket => currSocket.userId === msg.toId);
    console.log('found target socket: ', !!targetSocket);

    if (targetSocket) targetSocket.emit('chat msg to', msg);
  });

  socket.on('chat start typing', msg=>{
    console.log('start typing', msg);

    let targetSocket = connectedSockets.find(currSocket => currSocket.userId === msg.toId); 
    console.log('found target socket: ', !!targetSocket);

    if (targetSocket) targetSocket.emit('chat start typing', msg);
  });
});
/*SOCKET END */

const PORT = process.env.PORT || 3003;
httpServer.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))