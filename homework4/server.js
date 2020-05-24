const http = require('http');
const fs = require('fs').promises;

http
  .createServer(requestListener)
  .listen(8000, 'localhost');

function requestListener(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });

  if (request.url === '/bye.html') {
    readFile('bye.html', response);
  }

  if (request.url === '/' || request.url === '/index.html') {
    readFile('index.html', response);
  }
}

function readFile(file, response) {
  fs.readFile(`${__dirname}/${file}`)
    .then((content) => {
      response.write(content);
    })
    .catch((err) => {
      console.log(err);
      response.end();
    });
}