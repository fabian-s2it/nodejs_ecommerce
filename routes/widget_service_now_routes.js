var express = require('express'),
	router  = express.Router();


var WidgetServiceNow     = require('./../models/WidgetServiceNow');

// /WidgetServiceNows
router.route('/WidgetServiceNow')

	//create a WidgetServiceNow
	.post(function(req, res) {

		var WidgetServiceNow = new WidgetServiceNow();
		WidgetServiceNow.name = req.body.name;

		WidgetServiceNow.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'WidgetServiceNow created!' });
		});

	})


	//get all WidgetServiceNows
	.get(function(req, res) {
		WidgetServiceNow.find(function(err, WidgetsServiceNow){
			if (err)
				res.send(err);

			res.json(WidgetsServiceNow);
		});
	});


// /WidgetServiceNows/:WidgetServiceNow_id
router.route('/WidgetServiceNows/:WidgetServiceNow_id')

    // get the WidgetServiceNow with that id (accessed at GET http://localhost:8080/api/WidgetServiceNows/:WidgetServiceNow_id)
    .get(function(req, res) {
        WidgetServiceNow.findById(req.params.WidgetServiceNow_id, function(err, WidgetServiceNow) {
            if (err)
                res.send(err);
            res.json(WidgetServiceNow);
        });
    })

    // update the WidgetServiceNow with this id (accessed at PUT http://localhost:8080/api/WidgetServiceNows/:WidgetServiceNow_id)
    .put(function(req, res) {

        // use our WidgetServiceNow model to find the WidgetServiceNow we want
        WidgetServiceNow.findById(req.params.WidgetServiceNow_id, function(err, WidgetServiceNow) {

            if (err)
                res.send(err);

            WidgetServiceNow.name = req.body.name;  // update the WidgetServiceNows info

            // save the WidgetServiceNow
            WidgetServiceNow.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'WidgetServiceNow updated!' });
            });

        });

    })

    // delete a WidgetServiceNow
    .delete(function(req,res) {

    	WidgetServiceNow.remove({
            _id: req.params.WidgetServiceNow_id
        }, function(err, WidgetServiceNow) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });


module.exports = router;