var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var list;
  fs.readFile(exports.paths.list, 'utf8', function(err, content){
    if (err) {
      console.log('error reading file');
    } else {
      list = content;
      list = list.split('\n');
      callback(list);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(array){
    callback(array.indexOf(url) !== -1, array);
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(bool, array){
    if (!bool){
      array.push(url);
      array = array.join('\n');
      fs.writeFile(exports.paths.list, array, function(err){
        if (err){
          console.log("error writing file");
        } else {
          callback();
        }
      })
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files){
    if (err){
      console.log('problem reading files');
    } else {
      callback(files.indexOf(url) !== -1);
    }
  });
};

exports.downloadUrls = function(urlArray) {
  // for each url in array
  _.each(urlArray, function(url){
    //search internet for url
    http.get({
      host: url,
      path: '/'
    }, function(response){
      var htmlFile = '';
      response.on('data', function(chunk){
        htmlFile += chunk;
      });
      response.on('end', function(){
        // download site html to archive and give name as url
        fs.writeFile(exports.paths.archivedSites+'/'+url, htmlFile, function(err){
          if(err){
            console.log('error writing file');
          } else{
            console.log('you saved the website!');
          }
        });
      });
    })
    .end();
  });
};
//exports.downloadUrls(['www.google.com', 'www.autostraddle.com', 'www.hackreactor.com']);
