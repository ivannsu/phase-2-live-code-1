const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypt = require('../helpers/crypt');
const User = require('../models/user');

router.post('/register', (req, res) => {
  let input = {
    name: req.body.name,
    email: req.body.email,
    password: crypt(req.body.password)
  }

  User.findOne({email: input.email})
  .then(user => {

    if(!user) {
      User.create(input)
      .then(newUser => {
        res.status(201).json({
          message: 'register success'
        });   
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });  
      });
    } else {
      res.status(500).json({
        message: 'email already registered'
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

router.post('/login', (req, res) => {
  let input = {
    email: req.body.email,
    password: crypt(req.body.password)
  }

  User.findOne(input)
  .then(user => {
    if(!user) {
      res.status(500).json({
        message: 'username or password wrong'
      });  
    } else {
      let token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email
      }, process.env.JWT_SECRET_KEY);

      res.status(200).json({
        message: 'login success',
        token: token,
        userId: user._id
      }); 
    }
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

module.exports = router;