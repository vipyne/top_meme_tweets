
function renderTemplate(name, context, callback) {
  function compileAndLoadTemplate(source) {
    var template = Handlebars.compile(source)
    var html = template(context)
    callback(html)
  }

  $.get("/templates/"+name+".hbs", compileAndLoadTemplate)
}

$(function() {
  renderTemplate("home", undefined, function(html) {
    $(".container").html(html)  
  })
})
