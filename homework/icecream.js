function setup() {
  createCanvas(800, 600);
  background(255, 255, 220);
  noStroke();

  // Ice cream scoop.
  var diameter = 100;
  var radius = diameter / 2;
  var maskHeightScoop = diameter / 4;
  var margin = 5;
  var xScoop = width/2;
  var yScoop = height/2 - 100;

  fill(255, 255, 220);
  stroke(100, 100, 100);
  strokeWeight(5);
  ellipse(xScoop, yScoop, diameter, diameter);

  // Overwrite with background color to mask the scoop.
  strokeWeight(0);
  resetMatrix();
  rect(xScoop - radius, yScoop + radius - maskHeightScoop,
      diameter, radius);

  // Ice cream cone.
  strokeWeight(5);
  var yTriangle = yScoop + radius - maskHeightScoop + (margin * 1.5);
  triangle(
      xScoop - radius, yTriangle,
      xScoop + radius, yTriangle,
      xScoop, yTriangle + (diameter * 1.3) + maskHeightScoop
  ); 

  noLoop();
}
