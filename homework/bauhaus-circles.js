function setup() {
  createCanvas(800, 600);
  background(255, 255, 255);

  // Basic variables.
  var numCircles = 6;
  var diameterBase = 200;
  var diameterJitter = diameterBase;
  var locationJitter = diameterBase / 3;
  var bwColorBase = 100;
  var bwColorJitter = 50;
  var colorBase = 70;
  var strokeBase = 30;
  var strokeJitter = strokeBase - 1;
  var opacity = 40;
  
  colorMode(HSB, 100);

  var ellipses = [];

  // Draw the circles.
  // TODO: Define their vars here, draw later.
  for(var i = 0; i < numCircles; i++) {
    // Black and white random color.
    //var color = bwColorBase + random(bwColorJitter);

    // HSB random color.
    strokeWeight(strokeBase + random(strokeJitter) - (strokeBase / 2));
    stroke(random(100), 100, 50, 60);
    noFill();

    // random size and location.
    var thisDiameter = diameterBase + random(diameterJitter);
    var thisX = (width / 2) + (random(locationJitter) - (locationJitter / 2));
    var thisY = (height / 2) + (random(locationJitter) - (locationJitter / 2));

    ellipses.push(ellipse(thisX, thisY, thisDiameter, thisDiameter));
  }
}

function draw() {
  //TODO: Move drawing logic in here.
  //TODO: Rotate slowly.
}
