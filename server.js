// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', function (req, res){
  var date = new Date();
  res.json({ "unix": date.getTime(), "utc": date.toUTCString()});
});

app.get('/api/timestamp/:datestring', function (req, res) {
  var date_string = req.params.datestring;
  
  // Under ISO 8601, a 4-digit string counts as a year.
  // Any numeric string longer than this must be a Unix timestamp.
  var date;
  if (isNaN(date_string) || date_string.length <= 4) {
    date = new Date(date_string);
  } else {
    date = new Date(parseInt(date_string));
  }
  if (date.toUTCString() === "Invalid Date") {
    res.json({ "error": "Invalid Date" });
  } else {
    res.json({ "unix": date.getTime(), "utc": date.toUTCString()});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});