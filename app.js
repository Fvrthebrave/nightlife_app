'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    yelp = require('yelp-fusion'),
    app = express();

const clientId = 'k9le3C38kyN_er7s3Ynm-g';
const clientSecret = 'qlQkz6kOtEt0TqRc3VV76WyJx7iX1w2zrVY7RvUTBzC0XMsvWwbEdmqIqee34Ncg';
    
mongoose.connect('mongodb://localhost/nightlife_app');  

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
    res.render('index'); 
});

app.post('/search', function(req, res) {
    var searchRequest = {
        term: req.body.search,
        location: 'Laguna Niguel, CA'
    };
    
    console.log('*********** REQUEST: ' + req);
    
    yelp.accessToken(clientId, clientSecret).then(response => {
      const client = yelp.client(response.jsonBody.access_token);
    
      client.search(searchRequest).then(response => {
        const results = response.jsonBody.businesses;
        console.log(results);
        
        res.render('results', { results: results });
      });
    }).catch(e => {
      console.log(e);
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Listening...');    
});
