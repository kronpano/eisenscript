function render(item, delay) {
  var editor = new Editor({
    el: item,
    text: $(item.attr('data-bind-id')).text().replace(/\s*[\r\n|\r|\n]+\s*/g, '\n').replace(/^\s+|\s+$/g, '')
  });
  // delay for smooth rendering
  setTimeout(function() {
    var s = +new Date();
    editor.render();
    // console.log('render time:', (+new Date() - s) + 'ms');
  }, delay);
}

$(function() {
  
  var items = $('.item');
  
  for (var i = 0; i < items.length; i++) {
    render(items.eq(i), 500 * i);
    // break;
  }
});
