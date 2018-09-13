const router = require('express').Router();
const jwt = require('jsonwebtoken');
const translate = require('google-translate-api');
const crypt = require('../helpers/crypt');
const isLogin = require('../middlewares/isLogin');
const objectId = require('../helpers/objectId');
const Quote = require('../models/quote');

router.post('/', isLogin, (req, res) => {
  let input = {
    status: req.body.status,
    user: objectId(req.decoded.id)
  }

  Quote.create(input)
  .then(newQuote => {
    res.status(201).json({
      message: 'create new quote success',
      quote: newQuote
    });   
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

router.get('/', (req, res) => {
  Quote.find()
  .then(quotes => {
    res.status(200).json({
      message: 'success get all quotes',
      quotes: quotes
    });   
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    });
  })
});

router.delete('/:id', isLogin, (req, res) => {
  let quoteId = objectId(req.params.id);
  
  Quote.findOneAndRemove({_id: quoteId})
  .then(oldQuote => {
    if(!oldQuote) {
      res.status(500).json({
        message: 'tidak ada data quote ini'
      });
    } else {
      res.status(200).json({
        message: 'success delete quote',
        oldQuote: oldQuote
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      message: err.message
    });
  });
});

router.get('/:id/translate', (req, res) => {
  let quoteId = objectId(req.params.id);

  Quote.findOne({_id: quoteId})
  .then(quote => {
    if(!quote) {
      res.status(500).json({
        message: 'tidak data quote ini'
      });
    } else {
      translate(quote.status, {to: 'en'})
      .then(translated => {
        res.status(200).json({
          message: 'success using google translate API',
          translated: translated.text
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
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