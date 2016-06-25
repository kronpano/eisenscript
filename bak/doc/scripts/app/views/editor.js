var Editor = Backbone.View.extend({
  
  el: $('#editor'),
  
  initialize: function(option) {
    this.option = option || {};
    this.queue;
    this.lock = false;
    this.setEditor();
    this.setCanvas();
    this.resize();
  },
  
  resize: function() {
    var minH = this.maxHeight();
    var h = minH > 300 ? minH : 300;
    this.$el.css({ height: minH });
    this.editor.setSize('auto', h);
    this.renderer.resize(this.$el.width(), h);
  },
  
  maxHeight: function() {
    return 568;
  },
  
  change: function(codeMirror) {
    this.render(codeMirror.getValue());
  },
  
  setEditor: function() {
    this.editor = CodeMirror(this.$el[0], {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'solarized light',
      tabSize: 2,
      value: this.option.code || '{ a .5 color #333 } box\n{ x 2 } box',
      readOnly: false
    });
    this.editor.setSize('auto', this.maxHeight());
    this.editor.on("change", $.proxy(this.change, this));
    return this;
  },
  
  setCanvas: function() {
    this.renderer = new es.TestRenderer([], {
      width: this.$el.width(),
      height: this.$el.height()
    });
    this.renderer.d = 15;
    this.renderer.updateCamera();
    this.$el.prepend(this.renderer.domElement);
    return this;
  },
  
  render: function(code) {
    if (this.lock) {
      this.queue = code;
      return;
    }
    // compile and render
    this.lock = true;
    try {
      var eisen = es.compile(code || this.editor.getValue());
      this.renderer.build(eisen.objects).render();
    } catch (e) {
      
    }
    this.lock = false;
    // render if queue exists
    if (this.queue) {
      var code = this.queue;
      this.queue = undefined;
      this.render(code);
    }
    return this;
  }
});