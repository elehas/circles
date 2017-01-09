var circles = [];

function setup() {
  createCanvas(800, 600);
  circles.push(new Circle(random(width), random(height)));
}

function draw() {
  background(51);

  createCircle();

  for (var i = 0; i < circles.length; i++) {
    if(circles[i].edges()) {
      circles[i].growing = false;
    }
    for (var j = 0; j < circles.length; j++) {

    }
    circles[i].show();
    circles[i].grow();
  }
}

function createCircle() {
  var x = random(width);
  var y = random(height);

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
