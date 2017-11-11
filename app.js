'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    User = require('./users/user-model'),
    userRoutes = require('./users/userRoutes'),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    yelp = require('yelp-fusion'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    app = express();

const clientId = 'k9le3C38kyN_er7s3Ynm-g';
const clientSecret = 'qlQkz6kOtEt0TqRc3VV76WyJx7iX1w2zrVY7RvUTBzC0XMsvWwbEdmqIqee34Ncg';
    
mongoose.connect('mongodb://localhost/nightlife_app');  

app.set('view engine', 'ejs');

// Set routes..
app.use(userRoutes);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

/****************PASSPORT CONFIG***********************/
app.use(require('express-session') ({
    secret: 'Chewy is the best dog ever!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
/*****************************************************/

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.get('/', function(req, res) {
    res.render('index'); 
});

app.post('/search', function(req, res) {
    var searchRequest = {
        term: req.body.search,
        location: 'Laguna Niguel, CA'
    };
    
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
