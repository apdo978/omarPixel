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

// HEAD endpoint that redirects to the Yu-Gi-Oh API
app.head('/', (req, res) => {
  console.log('HEAD request received - Redirecting to Yu-Gi-Oh API');
  res.header({
    'Access-Control-Allow-Methods': 'GET',
  });
//   res.redirect(302, 'https://yugioh.free.beeceptor.com/');
});

// Optional: GET endpoint for testing in browser
app.get('/', (req, res) => {
  console.log('GET request received - Redirecting to Yu-Gi-Oh API');
    res.header({
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/html'
  });
  res.send(html);

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
