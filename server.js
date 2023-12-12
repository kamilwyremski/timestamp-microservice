const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/:date', (req, res) => {
  const inputDate = req.params.date;
  let timestamp;
  let date;

  if (!isNaN(inputDate)) {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});