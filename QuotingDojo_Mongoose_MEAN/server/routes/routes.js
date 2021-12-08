const mongoose = require('mongoose');
var UserQuote = mongoose.model('UserQuote');

module.exports = function(app) {
// Routes
// Root Request
app.get('/', function(req, res) {
    res.render('index')
})

// Add Quotes Request 
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    var quote = new UserQuote(req.body);
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quote.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong saving user');
            console.log(quote.errors);
            res.render('quotes', {errors: quote.errors});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a user!');
            res.redirect('quotes');
        }
    })
})

app.get('/quotes', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    // .sort -createdAt to sort descending
    UserQuote.find({}).sort('-createdAt').exec(function(err, quotes) {
        if(err) {
            console.log("didn't get quote data");
            res.render('quotes');
        } else {
            console.log("got quote data");
            res.render('quotes', {userQuotes: quotes});
        }
    })
})}