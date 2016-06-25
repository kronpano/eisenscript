
var gui;
var params;
var editor;
var renderer;
var parser;
var stats;

/*  extends dat.gui
 ====================*/
dat.GUI.prototype.get = function(property_name) {
    var c;
    this.__controllers.forEach(function(d) {
        if (d.property == property_name) {
            c = d;
            return;
        }
    });
    for (key in this.__folders) {
        this.__folders[key].__controllers.forEach(function(d) {
            if (d.property == property_name) {
                c = d;
                return;
            }
        });
    }
    return c;
};

/*  extends console
 ===================*/
console.put = function(message) {
    try {
        editor.console.put(message)
    } catch (e) {
        
    }
}


/*  utils
 ===========*/
function updateCanvasSize() {
    $('#canvas').css('width', width());
    $('#canvas').css('height', height());
    $('#size-info').text(width() + ' x ' + height());
};

function width() {
    return $(window).width();
}

function height() {
    return $(window).height() - $('header').height() - $('footer').height();
}

function source() {
    var source;
    try {
        source = editor.source();
    } catch (e) {
        source = params.source;
    }
    return source;
}

function render() {
    
    function parse() {
        // return 0 when we success to parse structure synth code.
        // return 1 when we fail.
        try {
            parser = new ssjs.Parser();
            parser.parse(source());
            console.put('compile success...');
            return 0;
        } catch ( e ) {
            console.put(e.message);
            if (editor) editor.highlightError(e.message);
            return 1;
        }
    }

    function compile() {
        // return 0 when we success to parse structure synth code.
        // return 1 when we fail.
        try {
            renderer.addPrimitives( parser.primitives );
            renderer.setBackgroundColor( parser.backgroundColor );
            console.put('compile sccess...');
            return 0;
        } catch ( e ) {
            console.put(e.message);
            if (editor) editor.highlightError( e.message );
            return 1;
        }
    }
    
    // parse source and then render scene
    
    renderer.clear();
    
    if (parse() == 0) {
        if (compile() == 0) {
            console.put('rendering...');
            renderer.render();
            console.put('finish (' + renderer.renderTime + 'ms)');
        }
    }
}

function animate() {
    
    window.setTimeout( animate, 1000 / 30 );
    
    stats.update();
    
    if (gui.get('speed').getValue() > 0) {
        renderer.render();
    }
}

/*  initialize
 ================*/
function setup() {
    
    function Params() {
        
        var that = this;
        
        function showCode() {
            editor = window.open('editor.html', 'EDITOR', 'width=500,height=428');
        }

        function resetCamera() {
            renderer.resetCamera();
            renderer.group.position = new THREE.Vector3();
            renderer.render();
        }

        function saveImage() {
            renderer.render();
            renderer.saveImage();
        }
        
        function about() {
            
            // $('#about').fadeIn(0.6);
            // $('#about-inner').css('left', (width() - $('#about-inner').width()) / 2).fadeIn(0.6);
        }

        var headCode;
        for (c in code) {
            headCode = c;
            break;
        }
        
        // default set
        this.code = headCode;
        this.source = code[headCode];
        this.speed = 0.5;
        this.shadow = false;
        this.materialType = 'lambert';
        this.light1 = '#ff170f';
        this.light2 = '#ffcf0f';
        this.showCode = showCode;
        this.resetCamera = resetCamera;
        this.saveImage = saveImage;
        this.about = about;
    }
    
    /*  event
     ===========*/
    var isMouseDown;
    var prevPosition;
    var onPointerDownPointerX;
    var onPointerDownPointerY;
    var onPointerDownLon;
    var onPointerDownLat;

    function onCodeChange(code) {
        if (editor) {
            editor.source(code);
        }
        params.source = code;
        render();
    }

    function onSpeedChange(lonstep) {
        renderer.lonstep = lonstep;
    }

    function onshadowChange(shadow) {
        // Because this parameter affect to visual performance of meshes,
        // we should call 'render()', not 'renderer.render()' for recreating meshes.
        renderer.shadow = shadow;
        render();
    }

    function onMaterialTypeChange(materialType) {
        // Because this parameter affect to visual performance of meshes,
        // we should call 'render()', not 'renderer.render()' for recreating meshes.
        renderer.materialType = materialType;
        render();
    }

    function onLight1Change(color) {
        var hex = '0x' + color.slice(1);
        renderer.light1.color = new THREE.Color( hex );
        renderer.render();
    }

    function onLight2Change(color) {
        var hex = '0x' + color.slice(1);
        renderer.light2.color = new THREE.Color(hex);
        renderer.render();
    }

    function onWindowResize(e) {
        if(renderer.renderer) {
            updateCanvasSize();
            renderer.updateRenderSize(width(), height());
            renderer.render();
        }
    }

    function onCanvasMouseDown(e) {
        e.preventDefault();
        isMouseDown = true;
        renderer.isAnimate = false;
        prevPosition = {x: e.pageX, y: e.pageY};
        onPointerDownPointerX = e.clientX;
        onPointerDownPointerY = e.clientY;
        onPointerDownLon = renderer.lon;
        onPointerDownLat = renderer.lat;
    }

    function onCanvasMouseMove(e) {
        if ( isMouseDown ) {
            if (e.shiftKey){
                var v1 = new THREE.Vector3(0, 1, 0);
                var v2 = renderer.camera.position;
                var xv = v1.crossSelf(v2).normalize();
                var v3 = xv.clone();
                var yv = v3.crossSelf(v2).normalize();

                renderer.group.position.addSelf(xv.multiplyScalar( - ( prevPosition.x - e.clientX ) * 0.05 ) );
                renderer.group.position.addSelf(yv.multiplyScalar( - ( prevPosition.y - e.clientY ) * 0.05 ) );
            } else {
                renderer.lon = ( e.clientX - onPointerDownPointerX ) * 0.5 + onPointerDownLon;
                renderer.lat = ( e.clientY - onPointerDownPointerY ) * 0.5 + onPointerDownLat;
            }

            prevPosition = { x: event.pageX, y: event.pageY };
            renderer.render();
        }
    }

    function onCanvasMouseUp( event ) {
        isMouseDown = false;
    }

    function onCanvasMouseWheel(event, mov) {
        renderer.d -= .1 * mov * 24;
        renderer.render();
    }
    
    
    stats = new Stats();
    params = new Params();
    gui = new dat.GUI();
    parser = new ssjs.Parser();
    renderer = new ssjs.Renderer(width(), height());
    
    /*  set default data to Renderer
     =================================*/
    renderer.shadow = params.shadow;
    renderer.materialType = params.materialType;
    renderer.lonstep = params.speed;
    
    /*  setup gui
     ==============*/
    gui.add(params, 'code', code).name('sample code').onChange(onCodeChange);
    gui.add(params, 'showCode').name('code');
    gui.add(params, 'materialType', ['basic', 'normal', /*'phong',*/ 'lambert']).name('material').onChange(onMaterialTypeChange);
    gui.add(params, 'shadow').name('shadow').onChange(onshadowChange);
    gui.addColor(params, 'light1').name('light').onChange(onLight1Change);
    gui.addColor(params, 'light2').name('light').onChange(onLight2Change);
    gui.add(params, 'speed', 0, 36).onChange(onSpeedChange);
    gui.add(params, 'resetCamera').name('reset camera');
    gui.add(params, 'saveImage').name('save image');
    // gui.add(params, 'about').name('about');
    
    /*  add objects to body
     =======================*/
    document.getElementById("canvas").appendChild(renderer.renderer.domElement);
    document.getElementById("controller").appendChild(gui.domElement);
    document.getElementById("stats").appendChild(stats.domElement);
    
    // add listener
    $(window).resize(onWindowResize);
    $('#canvas').mousedown(onCanvasMouseDown);
    $('#canvas').mousemove(onCanvasMouseMove);
    $('#canvas').mouseup(onCanvasMouseUp);
    $('#canvas').mousewheel(onCanvasMouseWheel);
    
    // $('#about').click(function() {
    //     $('#about').fadeOut(0.6);
    //     $('#about-inner').fadeOut(0.6);
    // });
    
    // I can not understand why I call 'updateCanvasSize()'.
    updateCanvasSize();
    
    animate();
    render();
}