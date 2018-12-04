var request = require('request');
var tokens = require('./secrets.js');
var fs = require('fs');
var path = require('path');

var args = process.argv.splice(2, 2);

if (args.length < 2) {
  console.log('Error');
  process.exit();
}

console.log(args);

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + tokens.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {

    var contributors = JSON.parse(body)
    cb(err, contributors);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           // console.log('Downloading image...');
         })
         .on('end', function (response) {
          // console.log('Download complete.');
         })
         .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function(err, contributors) {
  console.log("Errors:", err);
  for(var i = 0; i < contributors.length; i++){
    var contributor = contributors[i]
    downloadImageByURL(contributors[i].avatar_url, path.resolve(__dirname, 'avatars/' + contributor.login + '.jpg'));
  }
});


