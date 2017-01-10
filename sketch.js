var circles = [];
var spots = [];
var img;

function preload() {
  img = loadImage("image-lee.png"); //Lee
  // img = loadImage("image-em.png"); //Emily
}

function setup() {
  createCanvas(800, 600);
  pixelDensity(1);

  img.loadPixels();

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width)*4;
      var r = img.pixels[index];
      var g = img.pixels[index+1];
      var b = img.pixels[index+2];
      var a = img.pixels[index+3];

      if (r > 0) {
        var v = createVector(x, y);
        spots.push(v);
      }

    }
  }
}

function draw() {
  background(0);

  var total = 20;
  var count = 0;

  while (count < total) {
    createCircle();
    count++;
  }

  for (var i = 0; i < circles.length; i++) {
    if(circles[i].edges()) {
      circles[i].growing = false;
    }
    for (var j = 0; j < circles.length; j++) {
      if(circles[i] != circles[j]) {
        var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
        var sums = circles[i].r + circles[j].r;

        if (d < sums) {
          circles[i].growing = false;
          break;
        }
      }
    }
    circles[i].show();
    circles[i].grow();
  }
}

function createCircle() {
  var rndCircle = spots[floor(random(0, spots.length))];
  var x = rndCircle.x;
  var y = rndCircle.y;

  var valid = true;

  for (var i = 0; i < circles.length; i++) {
    var d = dist(x, y, circles[i].x, circles[i].y);

    if(d < circles[i].r) {
      valid = false;
      break;
    }
  }

  if (valid) {
      circles.push(new Circle(x, y));
  }

}

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.growing = true;

  this.show = function() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  this.grow = function() {
    if (this.growing)
      this.r += 1;
  }

  this.edges = function() {
    return (this.x + this.r > width || this.x - this.r < 0 ||
            this.y + this.r > height || this.y - this.r < 0);
  }
}
