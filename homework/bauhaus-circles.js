/**
 * IDEAS:
 * Rings change colors
 * Cluster all the circles' colors around a certain hue
 * Slowly shrink, when one's too small another large one is added
 * Connect to cochlea and pulse to the beat
 * Variables connected to live data (like weather, time of day).
 **/
var ellipses = [];

function setup() {
  var canvasSizeX = 1300;
  var canvasSizeY = 750;
  if (document && document.documentElement) {
    canvasSizeX = document.documentElement.clientWidth;
    canvasSizeY = document.documentElement.clientHeight;
  }
  createCanvas(canvasSizeX, canvasSizeY);
  background(255, 255, 255);

  // Basic variables.
  var numCircles = 7;
  var diameterBase = 300;
  var diameterJitter = diameterBase;
  var locationJitter = diameterBase * 5 / 12;
  var bwColorBase = 100;
  var bwColorJitter = 50;
  var colorBase = 70;
  var strokeBase = 20;
  var strokeJitter = strokeBase - 1;
  var opacity = 40;
  var chanceOfMaskCircle = 20;
  
  colorMode(HSB, 100);

  // Define their vars here, draw later.
  for(var i = 0; i < numCircles; i++) {
    // Black and white random color.
    //var color = bwColorBase + random(bwColorJitter);

    // HSB random color.
    var thisStrokeWeight = strokeBase + random(strokeJitter) - (strokeBase / 2);
    var thisH = random(100);
    var thisS = 100;
    var thisB = 50;
    var thisA = 60;
    // Some will randomly be the background color.
    if (random(100) < chanceOfMaskCircle) {
      thisS = 0;
      thisB = 100;
      thisA = 100;
      thisStrokeWeight = thisStrokeWeight * 2;
    }
    noFill();

    // Random rotation direction and speed.
    var rotationSpeed = 200.0 * (random(2) > 1 ? 1 : -1);

    // random size and location.
    var thisDiameter = diameterBase + random(diameterJitter);
    var thisX = (width / 2) + (random(locationJitter) - (locationJitter / 2));
    var thisY = (height / 2) + (random(locationJitter) - (locationJitter / 2));

    ellipses.push({
      x: thisX,
      y: thisY,
      sizeX: thisDiameter,
      sizeY: thisDiameter,
      strokeWeight: thisStrokeWeight,
      h: thisH,
      s: thisS,
      b: thisB,
      a: thisA,
      rotationSpeed: rotationSpeed
    });
  }
}

function draw() {
  noFill();
  background(0, 0, 100);
  ellipses.forEach(function(el) {
    push();
    translate(width / 2, height / 2);
    rotate(frameCount / el.rotationSpeed);

    // Draw circle
    strokeWeight(el.strokeWeight);
    stroke(el.h, el.s, el.b, el.a);
    ellipse((width / 2) - el.x, (height / 2) - el.y, el.sizeX, el.sizeY);
    pop();
  });
}
