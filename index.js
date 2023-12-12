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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date?', (req, res) => {
  const inputDate = req.params.date;
  let timestamp;
  let date;

  if (!inputDate) {
    timestamp = Date.now();
    date = new Date(timestamp);
  } else if (!isNaN(inputDate)) {
    timestamp = parseInt(inputDate, 10);
    date = new Date(timestamp);
  } else {
    date = new Date(inputDate);
    timestamp = date.getTime();
  }

  if (isNaN(timestamp) || isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  const response = {
    unix: timestamp,
    utc: date.toUTCString(),
  };

  res.json(response);
});


// listen for requests :)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});