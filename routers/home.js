const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.get('/', (req, res) => {
    res.redirect('/posts');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/admin/posts');
    } else {
        res.render('login');
    }
});

router.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) res.redirect('/login');
        passport.authenticate('local')(req, res, function () {
            res.redirect('/admin/posts');
        });
    });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            res.redirect('/login');
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/admin/posts');
            });
        }
    });
});

module.exports = router;