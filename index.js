const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const html = fs.readFileSync('index.html', 'utf8').toString();

// Logger middleware - logs all requests
app.use(morgan('combined'));

// Custom logging middleware for additional details
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});


app.head('/', (req, res) => {
  console.log('HEAD request received - Redirecting to Yu-Gi-Oh API');
  res.redirect(301,'/google');
  // res.header({
  //   'Access-Control-Allow-Methods': 'POST',
  // });

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
