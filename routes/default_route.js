var express = require('express'),
	router  = express.Router();


// /bears
router.route('/teste')
    
    .post(function(req, res) {
        console.log(req.body);
        res.json(req.body);
    })

	//get all bears
	.get(function(req, res) {
        res.json({body: req.body});
	});

    


module.exports = router;