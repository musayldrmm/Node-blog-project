const path =require('path')
const express=require('express')
const app = express()
const port = 3000
const hostname= '127.0.0.1'
const main = require('./routes/main')
const mail=require('./routes/mail')
const user = require('./routes/user')
const post = require('./routes/post')
const admin = require('./routes/admin')
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const expressSession  = require('express-session');
var cors = require('cors')

const mongoose = require('mongoose');
app.use(
  expressSession({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: null},
    store: MongoStore.create({
      mongoUrl:`mongodb://localhost:27017/dbname`
      })
  })
);
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public")); //css ve image klasörlerinin pathi

app.use('/',main);
app.use('/users',user)
app.use('/mail',mail)
app.use('/post',post)
app.use('/admin',admin)
mongoose.connect('mongodb://localhost:27017/dbname');
mongoose.connection.on('connected', () => {
  console.log('Connected to database ');
}); 
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

app.listen(port, hostname,() => {
    console.log(`Server calışıyor ,http://${hostname}:${port}/`)
  })
  