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

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// error handler
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(400).send(err.message);
// });


var Bear     = require('./models/bear');


// ===============================================================

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost'); // connect to our database


// ROUTES FOR THE API
// =============================================================================
var router = express.Router(); 

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// more routes for our API will happen here


// /bears
router.route('/bears')

	//create a bear
	.post(function(req, res) {

		var bear = new Bear();
		bear.name = req.body.name;

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});

	})

	.get(function(req, res) {
		Bear.find(function(err, bears){
			if (err)
				res.send(err);

			res.json(bears);
		});
	});


// /bears/:bear_id
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


app.listen(port);
console.log('Server listening on port ' + port);
