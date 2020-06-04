const db = require('../models');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// api call to add item to log 
// api call to get information for profile
// api call to get items for basket??