const express = require('express'),
    app = express(),
    homeRouter = require('./routers/home'),
    postRouter = require('./routers/post'),
    adminRouter = require('./routers/admin'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

// Use ejs as view engine
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('public'));

// Body Parser for Post Request
app.use(bodyParser.urlencoded({ extended: true }));

//Session Parameters
app.use(session({
    secret: 'Thisismysecret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Routers Middleware
app.use(homeRouter);
app.use(postRouter);
app.use(adminRouter);

// MongoDB Connection
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://bilal:bilal123@cluster0-m6z5q.mongodb.net/blogDB', { useNewUrlParser: true });

// Server Start on port env or on 3333 for local 
app.listen(process.env.PORT || 3333, () => console.log('Server is started.'));