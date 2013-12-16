var TEMPLATES = (function() {
  var _cache = {}

  function _tUrl(name) {
    console.log("templates:: /templates/" + name + ".hbs")
    return "/templates/" + name + ".hbs"
  }

  return {
    precompile: function(names) {
      for (var i in names) {
        var self = this
        $.get(_tUrl(names[i]), function(source) {
          console.log('names[i]', names[i])
          console.log('source:', source)
          self.compileAndCache(names[i], source)
        })
      }
    },

    compileAndCache: function(name, source) {
      var template = Handlebars.compile(source)
      _cache[name] = template
      // console.log('template::', template)
      return template
    },

    render: function(name, context, renderCallback) {
      var self = this
      console.log('render this:', this)
      var template = _cache[name]
      if (template) {
        console.log('ka')
        console.log(template(context))
        console.log('context:', context)
        console.log('name:', name)
        console.log('_cache:', _cache)
        console.log(_cache['tweet'])
        console.log(template)
        renderCallback(template(context))
      } else {
        console.log('boom')
        // $.get(_tUrl(name, Controller.compileCacheAndRender("<source>")))
      }
    },

    compileCacheAndRender: function(source) {
      template = self.compileAndCache(name, source)
      console.log('inside function template', template)
      renderCallback(template(context))
    }
  }
})()

var Controller = {
  init: function() {
    console.log('got to controller init')
    TEMPLATES.precompile(['tweet'])
    console.log('tweet template?', ['tweet'])
    $('form').on('submit', this.showTweetsForMeme)
  },

  showTweetsForMeme: function(e) {
    // 'this' is the event target!
    console.log('showTweetsForMeme this', this)
    e.preventDefault()
    $(".container .tweets").html('')
    var $form = $(event.target)
    $.post($form.attr('action'), $form.serialize(), Controller.renderTweets.bind(Controller))
  },

  renderTweets: function(tweets) {
    for (var i in tweets) {
      console.log('rendertweets this', this)
      TEMPLATES.render('tweet', tweets[i], Controller.appendTweet)
    }
  },

  appendTweet: function(html) {
    $(".container .tweets").append(html)
  }
}

$(function() {
  Controller.init()
})
