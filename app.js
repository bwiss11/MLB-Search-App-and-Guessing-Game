// App.js

/*
    SETUP
*/

const bodyParser = require("body-parser")
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
const path = require('path');
const router = express.Router();



app.use(bodyParser.urlencoded({
    extended:true
}));

PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future
console.log(__dirname)
/*
    ROUTES
*/


app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {   
        res.sendFile(path.join(__dirname + '/pages/exampleResults.html'))
    });   

app.get('/playerSearch', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/pages/playerSearch.html'))
    });  
    
app.get('/random', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/pages/random.html'))
    }); 

app.get('/StyleA.css', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/css/StyleA.css'))
    });  

app.get('/adley.png', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/adley.png'))
    });  

app.get('/errorPageExample', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/pages/errorPageExample.html'))
    });  

app.get('/exampleResults', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/pages/exampleResults.html'))
    }); 

app.post('/exampleResults', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        console.log('post example results called')
        res.sendFile(path.join(__dirname + '/pages/exampleResults.html'))
    }); 

app.get('/testResult', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        console.log('logging')
        res.send('ok!')
    }); 

app.get('/backExample', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/pages/backExample.html'))
    }); 

app.get('/js/test.mjs', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/js/test.mjs'))
    }); 

app.get('/js/searchPlayer.js', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.sendFile(path.join(__dirname + '/js/searchPlayer.js'))
    }); 

// app.post('/backExample', function(req, res)                 // This is the basic syntax for what is called a 'route'
//     {
//         var first = req.body
//         res.send('firstname is' + first.inputfirstname)
//         logger(first.inputfirstname)
//     }); 



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});