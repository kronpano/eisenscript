$(function() {
  
  var s = +new Date();
  var items = $('.item');
  
  for (var i = 0; i < items.length; i++) {
    
    var text = $(items.eq(i).attr('data-bind-id')).text().replace(/^\s/, '');
    var editor = new Editor({
      el: items.eq(i),
      text: text
    });
    
    editor.render();
    // break;
  }
  
  console.log('render time:', (+new Date() - s) + 'ms');
});