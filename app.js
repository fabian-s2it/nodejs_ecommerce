// BASE SETUP
// =================================================================

var express = require('express');

var app = express();
var application_root = __dirname;

var server = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8001;

app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===============================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost'); // connect to our database


// GET OUR ROUTERS ----------------------------------
var bear_router 	= require('./routes/bear_routes'),
	client_router 	= require('./routes/client_routes'),
	project_router	= require('./router/project_routes'); 



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', bear_router);
app.use('/api', client_router);
app.use('/api', project_router);


app.listen(port, function(){
	console.log('Server listening on port ' + port);
});

