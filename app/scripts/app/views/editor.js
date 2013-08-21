var Editor = Backbone.View.extend({
  
  el: $('#editor'),
  
  initialize: function(option) {
    this.option = option || {};
    this.queue;
    this.lock = false;
    this.resize();
    this.setEditor();
    this.setCanvas();
  },
  
  resize: function() {
    var height = (+$('#sidebar').css('padding-top').replace('px', '')) + (+$('#sidebar').css('padding-bottom').replace('px', '')) + $('#logo').outerHeight(true) + $('#nav').outerHeight(true) + $('#copyright').outerHeight(true)
    this.$el.css({
      height: height
    });
    $('#content').css('padding', 0);
  },
  
  change: function(cm) {
    this.render(cm.getValue());
  },
  
  setEditor: function() {
    this.editor = CodeMirror(this.$el[0], {
      lineNumbers: true,
      lineWrapping: true,
      theme: 'solarized light',
      tabSize: 2,
      value: this.option.code || '{ a .5 color #333 } box\n{ x 2 } box',
      readOnly: false
    })
    // this.editor.setSize('auto', this.$el.height());
    this.editor.setSize('auto', 'auto');
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