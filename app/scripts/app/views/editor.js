var Editor = Backbone.View.extend({
  
  initialize: function(option) {
    this.text = option.text;
    this.addEditor();
    this.addCanvas();
  },
  
  addEditor: function() {
    // append to
    var elem = this.$el.find('.code:first');
    this.editor = CodeMirror(elem[0], {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'solarized dark',
      tabSize: 2,
      value: this.text,
      readOnly: true
      // onChange: this.render
    }).setSize('auto', '160px');
  },
  
  addCanvas: function() {
    // append to
    var elem = this.$el.find('.demo:first');
    this.renderer = new es.TestRenderer([], {
      width: elem.width(),
      height: elem.height()
    });
    elem.append(this.renderer.domElement);
  },
  
  render: function() {
    // compiling...
    var eisen = es.compile(this.text);
    // rendering...
    this.renderer.build(eisen.objects).render();
    return this;
  }
});