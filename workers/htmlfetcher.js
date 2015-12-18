// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');
var CronJob = require('cron').CronJob;
var fs = require('fs');
// every minute
// read list of urls
module.exports.job = new CronJob('00 * * * * *', function(){
  archive.readListOfUrls(archive.downloadUrls);
  
}, function(){
  
  console.log('cron update url');
}, true);

