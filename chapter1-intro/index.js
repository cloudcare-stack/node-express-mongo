const http = require('http');

const fs = require('fs');
const homePage = fs.readFileSync('index.html');
const aboutPage = fs.readFileSync('about.html');
const contactPage = fs.readFileSync('contact.html');
const notFoundPage = fs.readFileSync('404.html');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end(homePage);
  } else if (req.url === '/about') {
    res.end(aboutPage);
  } else if (req.url === '/contact') {
    res.end(contactPage);
  } else {
    res.end(notFoundPage);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

