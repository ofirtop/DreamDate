const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const addUserRoutes = require('./routes/users-route')
const addLikesRoutes = require('./routes/likes-route')

const app = express()
app.use(cors({
  origin: ['http://localhost:8080','http://localhost:8081'],
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

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))