const http = require('http');

const url = require('url');

const fs = require('fs');



const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);



  if (parsedUrl.pathname === '/' && req.method === 'GET') {

    const category = parsedUrl.query.category;

    if (!category) {

      fs.readFile('products.json', (err, data) => {

        if (err) {

          console.error('Error reading products.json:', err);

          res.statusCode = 500;

          res.end('Internal Server Error');

          return;

        }

        const products = JSON.parse(data);

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(products));

      });

    } else {

      fs.readFile('products.json', (err, data) => {

        if (err) {

          console.error('Error reading products.json:', err);

          res.statusCode = 500;

          res.end('Internal Server Error');

          return;

        }

        const products = JSON.parse(data);

        const filteredProducts = products.filter(product => product.category === category);

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(filteredProducts));

      });

    }

  } else {

    res.statusCode = 404;

    res.end('Not Found');

  }

});



server.listen(3001, (err) => {

  if (err) {

    console.error('Unable to start server:', err);

  } else {

    console.log('Server started at port 3001');

  }

});

