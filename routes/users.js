var express = require('express'),
  fakeRestaurant = require('fake-restaurant');

var router = express.Router();

var users = [
  'pippo',
  'caio',
  'sempronio'
];

var firstMiddleware = (req, res, next) => {
  if(users.indexOf(req.query.token) != -1){
    next();
  } else {
    res.status(401).send({message : 'Autentication Failed'});
  }
};

router.get('/orders', firstMiddleware, (req,res) => {
  return res.status(200).json(fakeRestaurant.getOrderByClient(req.query.token));
});


router.post('/', firstMiddleware, (req, res, next) => {
  var newOrder = {};
  if (req.body.hasOwnProperty('price') || req.body.hasOwnProperty('items')) {
    newOrder.price = req.body.price;
    newOrder.items = req.body.items;
  } else {
    return res.status(400).json({ message: "Bad request!"});
  }
  var orderToAdd = fakeRestaurant.addOrder(newOrder, req.query.token);
  if (orderToAdd) {
    return res.status(201).json({message: "Thanks "+ req.query.token +" Order Added!"});
  }
});

module.exports = router;
