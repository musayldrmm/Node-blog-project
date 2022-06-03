const path =require('path')
const express=require('express')
const app = express()
const port = 3000
const hostname= '127.0.0.1'
const main = require('./routes/main')
const mail=require('./routes/mail')
const user = require('./routes/user')
const post = require('./routes/post')
const bodyParser = require("body-parser");

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public")); //css ve image klasörlerinin pathi

app.use('/',main);
app.use('/users',user)
app.use('/mail',mail)
app.use('/post',post)
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
  