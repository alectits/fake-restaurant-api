var express = require('express'),
  fakeRestaurant = require('fake-restaurant');

var router = express.Router();

var users = [
  'pippo',
  'caio',
  'sempronio'
];

var dummyAuth = (req, res, next) => {
  if (users.includes(req.query.token)) {
    next();
  } else {
    res.status(401).send({
      message: 'Autentication Failed'
    });
  }
};

router.get('/orders', dummyAuth, (req, res) => {
  return res.status(200).json(fakeRestaurant.getOrderByClient(req.query.token));
});


router.post('/', dummyAuth, (req, res, next) => {
  var newOrder = {};
  if (req.body.hasOwnProperty('price') || req.body.hasOwnProperty('items')) {
    newOrder.price = req.body.price;
    newOrder.items = req.body.items;
  } else {
    return res.status(400).json({
      message: "Bad request!"
    });
  }
  var orderToAdd = fakeRestaurant.addOrder(newOrder, req.query.token);
  if (orderToAdd) {
    return res.status(201).json({
      message: "Thanks " + req.query.token + " Order Added!"
    });
  }
});

module.exports = router;