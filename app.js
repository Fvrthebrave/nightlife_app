var express = require('express'),
    mongoose = require('mongoose'),
    app = express();
    
mongoose.connect(process.env.DATABASEURL);  
console.log(process.env.DATABASEURL);

app.set(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index'); 
});

app.post('/search', function(req, res) {
    // API_KEY: k9le3C38kyN_er7s3Ynm-g
    // SECRET: qlQkz6kOtEt0TqRc3VV76WyJx7iX1w2zrVY7RvUTBzC0XMsvWwbEdmqIqee34Ncg
    
    // Run Yelp API search here...
    res.send('Search page coming...');
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Listening...');    
});
