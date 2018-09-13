const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.access_token;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if(err) {
      res.status(500).json({
        message: 'invalid token'
      });  
    } else {
      User.findOne({_id: decoded.id, email: decoded.email})
      .then(user => {
        if(!user) {
          res.status(401).json({
            message: 'not authenticated'
          });    
        } else {
          req.decoded = decoded;
          next();
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err.message
        });  
      });
    }
  });
}