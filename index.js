// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use('/api', (req, res, next) => {
  const date = req.path.slice(1)
  let utcTime = new Date(date).toUTCString();
  let unix = new Date(date).getTime();
  if(isNaN(new Date(date))) {
    utcTime = new Date(+date).toUTCString();
    unix = date;
  }
  if(date === '') {
    utcTime = new Date(Date.now()).toUTCString();
    unix = Date.now()
  }
  console.log(unix, utcTime)
  
  res.json({"unix": unix, "utc": utcTime})
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
