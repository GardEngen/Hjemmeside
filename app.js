const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () =>{
    console.log('Connnected to database'+ config.database)
});

// On Error
mongoose.connection.on('error', (err) =>{
    console.log('Database error'+ err)
});

//int app with express
const app = express();

const users = require('./routes/users');
//Port number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Body parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//passing in passport
require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req,res) => {
    res.send('Invalid Endpointt');
                                              
});

app.get('*',(req, res)=>{
    "use strict";
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

// Start server
app.listen(port, () => {
    console.log('Server started on port '+ port );
});