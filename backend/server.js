const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');

const addUserRoutes = require('./routes/users-route')
const addLikesRoutes = require('./routes/likes-route')
const addSocket = require('./socket.js');


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
addSocket(io);


const PORT = process.env.PORT || 3003;
httpServer.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))