var request = require('request');
var tokens = require('./secrets.js');

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

getRepoContributors("jquery", "jquery", function(err, contributors) {
  console.log("Errors:", err);
  for(var i = 0; i < contributors.length; i++){
    console.log(contributors[i].avatar_url);
  }
});
