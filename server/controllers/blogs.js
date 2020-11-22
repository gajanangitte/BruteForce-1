const Blog = require('../models/blog');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.loadBlogs = async (req, res, next, id) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    req.blog = blog;
  } catch (error) {
    if (error.name === 'CastError')
      return res.status(400).json({ message: 'Invalid Blog id.' });
    return next(error);
  }
  next();
};

exports.createBlog = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  try {
    const { title, tags, text } = req.body;
    const author = req.user.id;
    const blog = await Blog.create({
      title,
      author,
      tags,
      text
    });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

exports.showB = async (req, res, next) => {
  try {
    const { id } = req.blog;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('answers');
    // console.log(blog);
    res.json(blog);
  } catch (error) {
    const { id } = req.blog;
    // console.log(hello)
    next(error);
  }
};

exports.listBlogs = async (req, res, next) => {
  try {
    const { sortType = '-score' } = req.body;
    const blogs = await Blog.find().sort(sortType);
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

exports.listBByTags = async (req, res, next) => {
  try {
    const { sortType = '-score', tags } = req.params;
    const blogs = await Blog.find({ tags: { $all: tags } }).sort(sortType);
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

exports.listBByUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { sortType = '-created' } = req.body;
    const author = await User.findOne({ username });
    const blogs = await Blog.find({ author: author.id }).sort(sortType).limit(10);
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

exports.removeBlog = async (req, res, next) => {
  try {
    await req.blog.remove();
    res.json({ message: 'Your blog has been successfully deleted.' });
  } catch (error) {
    next(error);
  }
};

exports.loadComment = async (req, res, next, id) => {
  try {
    const comment = await req.blog.comments.id(id);
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });
    req.comment = comment;
  } catch (error) {
    if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid comment id.' });
    return next(error);
  }
  next();
};

exports.blogValidate = [
  body('title')
    .exists()
    .trim()
    .withMessage('is required')

    .notEmpty()
    .withMessage('cannot be blank')

    .isLength({ max: 150 })
    .withMessage('must be at most 150 characters long'),

  body('text')
    .exists()
    .trim()
    .withMessage('is required')

    .isLength({ min: 30 })
    .withMessage('must be at least 30 characters long')

    .isLength({ max: 300000 })
    .withMessage('must be at most 300000 characters long'),

  body('tags').exists().withMessage('is required')
];
