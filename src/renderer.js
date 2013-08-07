exports.TestRenderer = function(objects, option) {
  this.objects = objects;
  this.width = option.width || window.innerWidth;
  this.height = option.height || window.innerHeight;
  this.scene = new THREE.Scene();
  this.group = new THREE.Object3D()
  
  // camera
  this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000);
  this.camera.target = new THREE.Vector3(0, 0, 0);
  this.resetCamera().updateCamera();
  
  // geometry
  this.geometry = {
    cube: new THREE.CubeGeometry(1, 1, 1),
    sphere: new THREE.SphereGeometry(.5, 40, 32)
  }
  
  // add to scene
  this.scene.add(this.camera);
  this.scene.add(this.group);
  
  // renderer
  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.domElement = this.renderer.domElement;
  
  this.initialize();
};

exports.TestRenderer.prototype.initialize = function() {
  // build intermediate code
  if (this.objects) {
    var v = this.objects;
    for (var i = 0; i < v.length; i++) {
      switch (v[i].type) {
        case Type.Background: this.clearColor(v[i].color); break;
        case Type.Primitive: this.add(v[i]); break;
      }
    }
  }
  return this;
};

// repaint background with specific color
exports.TestRenderer.prototype.clearColor = function(hex) {
  this.renderer.setClearColor(new THREE.Color(hex), 1);
  return this;
};

// add any primitive to stage
exports.TestRenderer.prototype.add = function(primitive) {
  var mesh, mat = new THREE.MeshBasicMaterial(primitive);
  switch (primitive.name) {
    case 'box': mesh = new THREE.Mesh(this.geometry.cube, mat); break;
    case 'sphere': mesh = new THREE.Mesh(this.geometry.sphere, mat); break;
    case 'grid':
      primitive.wireframe = true;
      mesh = new THREE.Mesh(this.geometry.cube, mat);
      break;
  }
  // define additional setting
  mesh.applyMatrix(primitive.matrix);
  this.group.add(mesh);
  return this;
};

// back to initial state
exports.TestRenderer.prototype.resetCamera = function() {
  this.lon = this.lon || 45;
  this.lonstep = this.lonstep || .5;
  this.lat = this.lat || 45;
  this.phi = this.phi || 0;
  this.theta = this.theta || 0;
  this.d = this.d || 30;
  return this;
};

// camera rotates around origin
exports.TestRenderer.prototype.updateCamera = function() {
  this.lat = clamp(this.lat, -85, 85);
  this.phi = degToRad(90 - this.lat);
  this.theta = degToRad(this.lon);
  // update camera position
  this.camera.position.x = this.d * Math.sin(this.phi) * Math.cos(this.theta);
  this.camera.position.y = this.d * Math.cos(this.phi);
  this.camera.position.z = this.d * Math.sin(this.phi) * Math.sin(this.theta);
  this.camera.lookAt(this.camera.target);
  return this;
}

// garbage collection
exports.TestRenderer.prototype.clear = function() {
  var cubes = this.group.children;
  for (var i = 0; i < cubes.length; i++) this.group.remove(cubes[i]);
  this.renderer.render(this.scene, this.camera);
  return this;
};

// if want to resize the stage size
exports.TestRenderer.prototype.resize = function(width, height) {
  this.width = width;
  this.height = height;
  return this;
};

exports.TestRenderer.prototype.update = function() {
  // if want to rotate camera around origin that is (0, 0, 0)
  this.lon += this.lonstep;
  this.updateCamera();
  return this;
}

exports.TestRenderer.prototype.render = function() {
  this.update();
  this.renderer.sortObjects = false;
  this.renderer.setSize(this.width, this.height);
  this.renderer.render(this.scene, this.camera);
  return this;
}

// save image rendered on stage
exports.TestRenderer.prototype.saveImage = function() {
  window.open(this.renderer.domElement.toDataURL("image/png"));
};