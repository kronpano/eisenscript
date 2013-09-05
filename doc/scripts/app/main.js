$(function() {
  $('#content').css('padding', 0);
  
  var id = "#" + window.location.href.split('#')[1] + '-template';
  if ($(id).length) console.warn('editor: specified template is not exist.');
  
  var editor = new Editor({
    code: $(id).text().replace(/^\s/, '').replace(/\s$/, '')
  });
  editor.render();
  
  $(window).resize($.proxy(editor.resize, editor));
});