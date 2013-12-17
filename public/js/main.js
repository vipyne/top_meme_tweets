var TEMPLATES = (function() {
  var _cache = {}

  function _tUrl(name) {
    return "/templates/" + name + ".hbs"
  }

  return {
    precompile: function(names) {
      for (var i in names) {
        var self = this
        $.get(_tUrl(names[i]), function(source) {
          self.compileAndCache(names[i], source)
        })
      }
    },

    compileAndCache: function(name, source) {
      var template = Handlebars.compile(source)
      _cache[name] = template
      return template
    },

    render: function(name, context, renderCallback) {
      var self = this
      var template = _cache[name]
      if (template) {
        renderCallback(template(context))
      } else {
        $.get(_tUrl(name, Controller.compileCacheAndRender))
      }
    },

    compileCacheAndRender: function(source) {
      template = self.compileAndCache(name, source)
      renderCallback(template(context))
    }
  }
})()

var Controller = {
  init: function() {
    TEMPLATES.precompile(['tweet'])
    $('form').on('submit', this.showTweetsForMeme)
  },

function ObjY(a,b,c) {
  ObjX.call(this, a, b * 12);
  this.$c = c;
}
blah.call(this, 1, 2, 3)

  showTweetsForMeme: function(e) {
    debugger
    e.preventDefault()
    $(".container .tweets").html('')
    var $form = $(event.target)
    $.post($form.attr('action'), $form.serialize(), Controller.renderTweets.bind(Controller))
  },

  renderTweets: function(tweets) {
    for (var i in tweets) {
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
