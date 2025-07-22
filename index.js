const path = require('path');
const express = require('express');

/**
 * Serve static middleware for Swagman Web assets
 */
const serve = express.static(path.join(__dirname, '../public'), {
  index: false,
  maxAge: '1d'
});

/**
 * Setup middleware to render swagger documentation
 */
const setup = (swaggerDoc, options = {}) => {
  return (req, res) => {
    const title = options.title || 'Swagman Web';
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  <div id="swagman-web"></div>
  
  <link rel="stylesheet" href="./swagman-embed.css">
  <script src="./swagman-embed.iife.js"></script>
  <script>
    window.LOCAL_SPEC = ${JSON.stringify(swaggerDoc)};
    
    document.addEventListener('DOMContentLoaded', function() {
      window.renderSwagman('swagman-web', {
        spec: window.LOCAL_SPEC
      });
    });
  </script>
</body>
</html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  };
};

module.exports = {
  serve,
  setup
};