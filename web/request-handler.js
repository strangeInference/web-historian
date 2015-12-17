var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');// require more modules/folders here!

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var indexHtml;
fs.readFile('./web/public/index.html', 'utf8', function(err, content){
  if (err){
    console.log('file can not be read');
  }else{
    indexHtml = content;
  }
})

exports.handleRequest = function (req, res) {

  var statusCode = 200;
  var headers = defaultCorsHeaders;

  if (req.method === 'GET'){
    headers['content-type'] = 'text/html';
    res.writeHead(statusCode, headers);
    res.end(indexHtml);
  }

  res.end(archive.paths.list);
};
