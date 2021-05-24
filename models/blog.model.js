const fs = require('fs');
const path = require('path');
const uuid = require('uuid');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'blogs.json'
);

const getBlogsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Blog {
    constructor(id, images, title, subtitle, subject, content, contentFull, date) {
        this.id = id;
        this.images = images;
        this.title = title;
        this.subtitle = subtitle;
        this.subject = subject;
        this.content = content;
        this.contentFull = contentFull;
        this.date = date;
    }

    static fetchAll(cb) {
        getBlogsFromFile(cb);
    }

    static findById(id, cb) {
        getBlogsFromFile(blogs => {
            const blog = blogs.find(p => p.id === id);
            cb(blog);
        });
    }

    save() {
        getBlogsFromFile(blogs => {
            if (this.id) {
                const existingBlogIndex = blogs.findIndex(
                    blog => blog.id === this.id
                );
                const updatedBlogs = [...blogs];
                updatedBlogs[existingBlogIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedBlogs), err => {
                    console.log(err);
                });
            } else {
                this.id = uuid.v4();
                blogs.push(this);
                fs.writeFile(p, JSON.stringify(blogs), err => {
                    console.log(err);
                });
            }
        });
    }
};