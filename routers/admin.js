const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');
const upload = multer({ dest: 'public/images/uploads', limits: { fieldSize: 25 * 1024 * 1024 } });

router.get('/admin/posts', function (req, res) {
    if (req.isAuthenticated()) {
        Post.find(function (err, posts) {
            if (err) console.log(err);
            res.render('admin/allPosts', { posts });
        })
    } else {
        res.redirect('/login');
    }
});

router.post('/admin/posts', upload.single('postImage'), function (req, res) {
    if (req.isAuthenticated()) {
        const post = {
            title: req.body.postTitle,
            header: req.body.postHeader,
            body: req.body.postBody,
            img: req.file.filename
        };

        Post.create(post, function (err) {
            if (err) console.log(err);
            res.redirect('/admin/posts');
        });
    } else {
        res.send('You are not allowed');
    }
});

router.get('/admin/posts/new', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('admin/newPost');
    } else {
        res.redirect('/login');
    }
});

router.get('/admin/posts/:id', function (req, res) {
    if (req.isAuthenticated()) {
        const id = req.params.id;
        Post.findById(id, function (err, post) {
            if (err) console.log(err);
            res.render('admin/updatePost.ejs', { post })
        });
    } else {
        res.redirect('/login');
    }
});

router.patch('/admin/posts/:id', function (req, res) {
    if (req.isAuthenticated()) {
        const id = req.params.id;
        const body = req.body;
        Post.findOneAndUpdate({ _id: id }, body, { new: true, useFindAndModify: false }, function (err) {
            if (err) res.send('An error occured when updating post');
            res.send('The post succesfully updated');
        });
    } else {
        res.send('You are not allowed');
    }
});

router.delete('/admin/posts/:id', function (req, res) {
    if (req.isAuthenticated()) {
        const id = req.params.id;
        Post.findOneAndDelete({ _id: id }, function (err) {
            if (err) res.send('An error occured when updating post');
            res.send('The post succesfully deleted');
        });
    } else {
        res.send('You are not allowed');
    }
});

router.post('/admin/posts/:id', upload.single('postImage'), function (req, res) {
    if (req.isAuthenticated()) {
        let img;
        if (!req.file) {
            img = req.body.oldImage
        } else {
            img = req.file.filename
        };

        const post = {
            title: req.body.postTitle,
            header: req.body.postHeader,
            body: req.body.postBody,
            img: img
        };

        const id = req.params.id;

        Post.findOneAndUpdate({ _id: id }, post, { new: true, useFindAndModify: false }, function (err) {
            if (err) res.send('An error occured when updating post');
            res.redirect('/admin/posts');
        });
    } else {
        res.send('You are not allowed');
    }
});

module.exports = router;