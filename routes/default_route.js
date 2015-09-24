var express = require('express'),
	router  = express.Router();

var path    = require("path");

// /bears
router.route('/teste')
    
    .post(function(req, res) {
        console.log(req.body);
        res.json(req.body);
    })

	//get all bears
	.get(function(req, res) {
        res.sendFile('index.html', {root: './templates/'});
	});

    


module.exports = router;