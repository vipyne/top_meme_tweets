# Top Meme Tweets

Use the Twitter Search API to find the top tweets for a given hashtag.

## To use:

### Create your Twitter API Application

1. Go to http://dev.twitter.com/apps and create a new read-only application. Your callback URL should be specified as `http://localtest.me:8080/oauth`.
2. Once you've set it up, have Twitter generate an access token for you.
3. Create four environment variables from the data on your app settings page:
  ```bash
  export TWITTER_CONSUMER_KEY=(your Consumer key)
  export TWITTER_CONSUMER_SECRET=(your Consumer secret)
  export TWITTER_ACCESS_TOKEN=(your Access token)
  export TWITTER_ACCESS_TOKEN_SECRET=(your Access token secret)
  ```
4. Install nodemon and the app dependencies, then start the server:
  ```bash
  $ npm install -g nodemon
  $ npm install
  $ nodemon server.js
  ```

