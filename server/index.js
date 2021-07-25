const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const apis = require('./apis/index')
const cors = require('cors');
require('dotenv').config({
  path: './properties.env',
})


const app = express();

app.use(cors())

app.use(bodyParser.json())

app.use('/api', apis)

const client = new MongoClient(process.env.MONGODB_TEST, { useNewUrlParser: true });
client.connect(err => {
  if(err){
    console.log("---------------MongoDb connection error----------------")
    console.log(err)
  }
  console.log("----------------MongoDb connected-------------------")
  const db = client.db(process.env.DATABASE)
  app.locals.db = db
  app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));
});


