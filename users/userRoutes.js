var express = require('express'),
    router = express.Router(),
    User = require('./user-model');
    
router.get('/login', function(req, res) {
    res.send('Login page'); 
});


module.exports = router;