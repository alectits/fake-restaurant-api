var express = require('express'),
  bodyParser = require('body-parser');

var app = express();
var admin = require('./routes/admin');
var users = require('./routes/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', admin);
app.use('/users', users);

var port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server running on localhost:' + port);
});

module.exports = app;
