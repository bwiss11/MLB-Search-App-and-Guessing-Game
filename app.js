/*
    SETUP
*/

const bodyParser = require("body-parser")
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
const path = require('path');

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.json());

PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future
console.log(__dirname)


/*
    ROUTES
*/
// Provides routing for each url
app.get('/', function(req, res)                
    {   
        res.sendFile(path.join(__dirname + '/pages/playerSearch.html'))
    });   

app.get('/playerSearch', function(req, res)                
    {
        res.sendFile(path.join(__dirname + '/pages/playerSearch.html'))
    });  
    
app.get('/random', function(req, res)                
    {
        res.sendFile(path.join(__dirname + '/pages/random.html'))
    }); 

app.get('/guessingGame', function(req, res)                 
    {
        res.sendFile(path.join(__dirname + '/pages/guessingGame.html'))
    }); 

app.get('/StyleA.css', function(req, res)               
    {
        res.sendFile(path.join(__dirname + '/css/StyleA.css'))
    });  

app.get('/js/search.mjs', function(req, res)                
    {
        res.sendFile(path.join(__dirname + '/js/search.mjs'))
    }); 

app.get('/js/random.mjs', function(req, res)                
    {
        res.sendFile(path.join(__dirname + '/js/random.mjs'))
    }); 

app.get('/js/guessingGame.mjs', function(req, res)              
    {
        res.sendFile(path.join(__dirname + '/js/guessingGame.mjs'))
    }); 

/*
    LISTENER
*/
app.listen(PORT, function(){           
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});