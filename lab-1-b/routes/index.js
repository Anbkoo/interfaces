const express = require('express');
const mongoClient = require('../database');
const verifyToken = require('../verifyToken')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post('/sign-up', async function(req, res, next) {
  try{
    const usersDb = await mongoClient.db('blog').collection('users');

    const { name, email, gender, dateOfBirth } = req.body;
    let {password} = req.body
    const isUserExists = await usersDb.findOne({email:email});

    if(isUserExists){
      res.status(401).send('User already exists')
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const createdUser = await usersDb.insertOne({name, email, password, gender, dateOfBirth});
    const user = await usersDb.findOne({_id: createdUser.insertedId});

    delete user.password
    res.json(user)
  }catch(err){
    next(err)
  }

});

router.post('/sign-in', async function(req, res, next) {
  const usersDb = await mongoClient.db('blog').collection('users');
  const user = await usersDb.findOne({email: req.body.email});

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if(validPassword){
    const token = jwt.sign(
        { id: user.id, email: user.email },
        "SECRET_BLOG_KEY",
        { expiresIn: "1d" }
    );
    user.token = token;
    delete user.password
    res.json(user)
  } else {
    res.status(401).send("Invalid credentials")
  }

});

router.get('/profile', verifyToken, async function(req, res, next) {
  const usersDb = await mongoClient.db('blog').collection('users');
  const user = await usersDb.findOne({email: req.user.email});
  delete user.password

  res.json(user)
});

router.post('/profile', verifyToken,async function(req, res, next) {
  const usersDb = await mongoClient.db('blog').collection('users');
  const user = await usersDb.findOneAndUpdate({email: req.user.email},{$set: req.body},{returnDocument: "after"}  );
  delete user.value.password;

  res.json(user.value)
});

module.exports = router;
