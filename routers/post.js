const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/posts', (req, res) => {
    Post.find({ hidden: false }, function (err, posts) {
        if (err) console.log(err);
        res.render('index', { posts })
    });

});

router.post('/posts', (req, res) => {
    res.send(req.body.title);
});

router.delete('/posts', (req, res) => {
    res.send('Delete all post');
});

router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, function (err, post) {
        if (err) console.log(err);
        res.render('post.ejs', { post })
    });
});

router.put('/posts/:id', (req, res) => {
    res.send(`Update post number: ${req.params.id}`);
});

router.delete('/posts/:id', (req, res) => {
    res.send(`Delete post number: ${req.params.id}`);
});

module.exports = router;