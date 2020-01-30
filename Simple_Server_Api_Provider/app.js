const express = require('express');
const app = express();
const mongoose = require('mongoose');

//importing routes
const inv_router = require('./routes/inv_routes');
const rec_router = require('./routes/rec_routes');

//express middleware to get req.body
app.use(express.json());

//using route middlewares
app.use('/inventories',inv_router);
app.use('/records',rec_router);
module.exports = app;