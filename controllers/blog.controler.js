const Blog = require('../models/blog.model');

exports.getIndex = (req, res, next) => {
    Blog.fetchAll(blogs => {
        res.render('blog/blog', {
            blogs: blogs,
            pageTitle: 'Blog',
            path: 'Home'
        });
    });
};

exports.getBlogs = (req, res, next) => {
    Blog.fetchAll(blogs => {
        res.render('blog/blogs-list', {
            blogs: blogs,
            pageTitle: 'Blogs',
            pageSubtitle: 'List of all blogs',
            path: 'Blogs'
        });
    });
};

exports.getBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    Blog.findById(blogId, blog => {
        res.render('blog/blog-detail', {
            blog: blog,
            pageTitle: blog.title,
            pageSubtitle: blog.subtitle,
            path: 'Blogs'
        });
    });
};

exports.getAddBlog = (req, res, next) => {
    res.render('blog/edit-blog', {
        pageTitle: 'Add Blog',
        path: '/blog/add-product',
        editing: false
    });
};

exports.postAddBlog = (req, res, next) => {
    //const imageUrl = [req.body.imageUrl1, req.body.imageUrl2, req.body.imageUrl3];
    const images = req.body.images;
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const subject = req.body.subject;
    const content = req.body.content;
    const contentFull = req.body.contentFull;
    const date = Date.now();
    const blog = new Blog(null, images, title, subtitle, subject, content, contentFull, date);
    blog.save();
    res.redirect('/');
};