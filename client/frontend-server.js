const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
require('dotenv').config({
  path: './config/properties.env',
})

const DIST_DIR = path.join(__dirname, "./dist")

const app = express();

app.use(bodyParser.json())

app.use(express.static(DIST_DIR));

const HTML_FILE = path.join(DIST_DIR, 'index.html')

app.get('/*', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));



