var Editor = Backbone.View.extend({
  
  initialize: function(option) {
    this.text = option.text;
  },
  
  render: function() {
    var editor = CodeMirror(this.$el.find('.code:first')[0], {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'solarized dark',
      tabSize: 2,
      value: this.text,
      // onChange: this.recompile
    });
    editor.setSize('auto', '160px');
    
    this.recompile();
    return this;
  },
  
  recompile: function() {
    // compiling...
    var eisen = es.compile(this.text);
    
    // rendering...
    var demo = this.$el.find('.demo:first');
    var renderer = new es.TestRenderer(eisen.objects, {
      width: demo.width(),
      height: demo.height()
    });
    demo.append(renderer.render().domElement);
  }
});