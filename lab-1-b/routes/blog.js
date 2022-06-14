const express = require('express');
const mongoClient = require("../database");
const {ObjectId} = require("mongodb");
const router = express.Router();

router.get('/', async function(req, res, next) {
  const blogDb = await mongoClient.db('blog').collection('blogs');
  const blogs = await blogDb.find().toArray();
  res.json(blogs)
});

router.post('/', async function(req, res, next) {
  const blogDb = await mongoClient.db('blog').collection('blogs');

  const { title, description} = req.body;
  const createdBlog = await blogDb.insertOne({ title, description, author: req.user.email, comments: []});

  const blog = await blogDb.findOne({_id: createdBlog.insertedId });
  res.json(blog)
});

router.post('/comment', async function(req, res, next) {
  const blogDb = await mongoClient.db('blog').collection('blogs');

  const { description, postId } = req.body;
  const commentId = new ObjectId();

  const createdBlog = await blogDb.findOneAndUpdate({_id: ObjectId(postId)},  {$push: { 'comments': {$each: [{description, _id: commentId, author: req.user.email }], $position: 0,} } }, {returnDocument: "after"})
  res.json(createdBlog.value)
});

router.delete('/comment/:postId/:id', async function(req, res, next) {
  const blogDb = await mongoClient.db('blog').collection('blogs');

  const { id, postId } = req.params;
  const createdBlog = await blogDb.findOneAndUpdate({_id: ObjectId(postId)},  { $pull: { 'comments': { _id: ObjectId(id) } } }, {returnDocument: 'after'})
  res.json(createdBlog.value)
});

router.delete('/:id', async function(req, res, next) {
  const blogDb = await mongoClient.db('blog').collection('blogs');

  const { id } = req.params;
  const createdBlog = await blogDb.findOneAndDelete({_id: ObjectId(id)})
  res.json(createdBlog.value)
});

module.exports = router;
