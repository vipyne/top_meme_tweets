var express    = require('express'),
    app        = express(),
    server     = require('http').createServer(app),
    twitterAPI = require('node-twitter-api')


//---------- set up Twitter stuff
if (!process.env.TWITTER_CONSUMER_KEY ||
    !process.env.TWITTER_CONSUMER_SECRET ||
    !process.env.TWITTER_ACCESS_TOKEN ||
    !process.env.TWITTER_ACCESS_TOKEN_SECRET) {
  console.log('ERROR: TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, and TWITTER_ACCESS_TOKEN_SECRET must be set in your environment.')
  process.exit()
}

var twitter = new twitterAPI({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callback: 'http://localtest.me:8080/oauth'
})

var
  token = process.env.TWITTER_ACCESS_TOKEN,
  secret = process.env.TWITTER_ACCESS_TOKEN_SECRET

twitter.verifyCredentials(token, secret, function(error, data, response) {
  if (error) {
    console.log('ERROR: Invalid Twitter access token and/or access token secret.')
    console.log(error)
    process.exit()
  } else {
    console.log('SUCCESS: Twitter credentials are valid.')
  }
})


//---------- start listening
var port = process.env.PORT || 8080
console.log("Listening on port", port)
server.listen(port)
app.use(express.bodyParser())
app.use(express.static(__dirname + "/public"))
app.post('/tweets-for-meme', tweetsForMeme)

function tweetsForMeme(req, res) {
  var meme = "#" + req.body.meme
  twitter.search({q: meme, count: 3, result_type: 'recent'}, token, secret, function(error, data, response) {
    if (error) {
      console.log("ERROR:", error, response)
    } else {
      var body = JSON.stringify(data)
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Length', body.length)
      res.end(body)
    }
  })
}
