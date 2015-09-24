var express = require('express'),
	router  = express.Router();


var WidgetServiceNow     = require('./../models/widget_service_now');
var Param                = require('./../models/param');

// /WidgetServiceNows
router.route('/widget_service_now')

	//create a WidgetServiceNow
	.post(function(req, res) {

		var widget_service_now = new WidgetServiceNow();

		widget_service_now.chart_type = req.body.chart_type;
        widget_service_now.filter_by = req.body.filter_by;
        widget_service_now.filters = req.body.filters;
        widget_service_now.teams = req.body.teams;

        var param = new Param();

        param.name = req.body.param.name;
        param.value = req.body.param.value;

        widget_service_now.params = param._id;

		widget_service_now.save(function(err) {
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
router.route('/widget_service_now/:widget_id')

    // get the WidgetServiceNow with that id (accessed at GET http://localhost:8080/api/WidgetServiceNows/:WidgetServiceNow_id)
    .get(function(req, res) {
        WidgetServiceNow.findById(req.params.widget_id, function(err, WidgetServiceNow) {
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

            //WidgetServiceNow.name = req.body.name;  // update the WidgetServiceNows info

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