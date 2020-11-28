var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users');

var userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.get('/', function(req, res, next) {
  Users.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  })
  .catch((err) => next(err));
})

userRouter.post('/', function(req, res, next) {
  Users.create(req.body)
  .then((user) => {
    console.log('User created ', user);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  })
  .catch((err) => next(err));
})

userRouter.put('/', function(req, res, next) {
  res.statusCode = 403;
  res.end('PUT operation not supported on /users');
})

userRouter.delete('/', function(req, res, next) {
  Users.deleteMany({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  })
  .catch((err) => next(err));
})

userRouter.get('/:userName', function(req, res, next) {
  Users.findOne({ userName:req.params.userName })
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  })
  .catch((err => next(err)));
})

userRouter.post('/:userName', function(req, res, next) {
  res.statusCode = 403;
  res.end('POST operation not supported on /users');
})

userRouter.put('/:userName', function(req, res, next) {
  Users.findOneAndUpdate({ userName:req.params.userName }, { $set: req.body })
  .then((user) => {
    console.log('Updated user ', user)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  })
  .catch((err => next(err)));
})

userRouter.delete('/:userName', function(req, res, next) {
  Users.findOneAndDelete({ userName:req.params.userName })
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  })
  .catch((err => next(err)));
})

module.exports = userRouter;
