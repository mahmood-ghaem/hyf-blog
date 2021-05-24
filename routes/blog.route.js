'use strict';
const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog.controler');


/* GET home page. */
router.get('/', blogController.getIndex);

/* GET blogs page. */
router.get('/blogs', blogController.getBlogs);

/* GET blog page. */
router.get('/blog/:blogId', blogController.getBlog);

/* GET add-blog */
router.get('/add-blog', blogController.getAddBlog);

/* POST add-blog */
router.post('/add-blog', blogController.postAddBlog);

module.exports = router;