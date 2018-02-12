var express = require('express'),
  fakeRestaurant = require('fake-restaurant');

var router = express.Router();

router.use((req,res,next) => {
  if(req.query.token=='admin'){
    next();
  } else {
    res.status(401).send({message : 'Autentication Failed'});
  }
});

router.get('/reset', (req,res) => {
  return res.status(200).json(fakeRestaurant.reset());
});

router.get('/orders', (req,res) => {
  var filteredOrders = [];
  if (req.query.status !== undefined) {
    filteredOrders = fakeRestaurant.getOrderByStatus(req.query.status);
  } else {
    filteredOrders = fakeRestaurant.getAll();
  }

  if (req.query.client !== undefined) {
    filteredOrders = filteredOrders.filter((order) => {
      return order.client === req.query.client;
    });
  }

  if (req.query.client === undefined && req.query.status === undefined){
    return res.status(200).json(fakeRestaurant.getAll());
  } else {
    return res.status(200).json(filteredOrders);
  }
});

router.get('/profit', (req,res) => {
  return res.status(200).json(fakeRestaurant.getProfit());
});

router.get('/orders/:id', (req,res) => {
  if (!Number.isInteger(parseInt(req.params.id)) || parseInt(req.params.id)<0 ) {
    return res.status(400).json({message:"Error: id must be a positive integer"})
  }
  var orderToFind = fakeRestaurant.getOrderById(parseInt(req.params.id));
  if (orderToFind) {
    return res.status(200).json(orderToFind);
  } else {
    return res.status(404).json({ message: 'Order with ID #' + req.params.id + ' not found.' });
  }

});


router.put('/orders/:id', (req, res) => {
  if (Object.keys(req.body).length === 0){
    return res.status(412).json({message: 'Body not found.'});
  }
  if (req.body.status===undefined || (req.body.status!== 'closed' && req.body.status!== 'ready')) {
    return res.status(400).json({message: 'Error! Bad request' });
  }
  else if (fakeRestaurant.setOrderStatus(parseInt(req.params.id), req.body.status)) {
    return res.status(200).json({message: 'Order with ID #' + req.params.id + ' has been change the status to ' + req.body.status});
  } else {
    return res.status(404).json({message: 'Error! Order with ID #' + req.params.id + ' not found.' });
  }
});


router.delete('/orders/:id', (req, res) => {
  if (fakeRestaurant.deleteOrder(parseInt(req.params.id))) {
    return res.status(200).json({ message: 'Order with ID #' + req.params.id + ' deleted.' });
  } else {
    return res.status(404).json({ message: 'Error! Order with ID #' + req.params.id + ' not found.' });
  }
});


module.exports = router;
