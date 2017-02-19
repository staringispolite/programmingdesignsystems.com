/**
 * IDEAS:
 * Rings change colors
 * Cluster all the circles' colors around a certain hue
 * Slowly shrink, when one's too small another large one is added
 * Connect to cochlea and pulse to the beat
 * Variables connected to live data (like weather, time of day).
 **/
var ellipses = [];
var numCircles = 30;
var canvasSizeX = 1300;
var canvasSizeY = 750;
if (document && document.documentElement) {
  canvasSizeX = document.documentElement.clientWidth;
  canvasSizeY = document.documentElement.clientHeight;
}
var gravityWell = {
  x: canvasSizeX / 3,
  y: canvasSizeY / 3
}
var hueBase = 0;
var originalOpacity = 40;

function circleFactory() {
  // Basic variables.
  var diameterBase = (canvasSizeX + canvasSizeY) / 2;
  var diameterJitter = diameterBase;
  var locationJitter = diameterBase * 3 / 12;
  var bwColorBase = 100;
  var bwColorJitter = 50;
  var colorBase = 70;
  var hueJitter = 25;
  var strokeBase = 50;
  var strokeJitter = strokeBase - 1;
  var chanceOfMaskCircle = 20;

  // Black and white random color.
  //var color = bwColorBase + random(bwColorJitter);

  // Slowly rotate hues.
  hueBase += 2;
  if (hueBase > 100) {
    hueBase = hueBase % 100;
  }
  if (hueBase > 15 && hueBase < 55) {
    hueBase = 35; // Skip this muddy range.
  }

  // HSB random color.
  var thisStrokeWeight = strokeBase + random(strokeJitter) - (strokeBase / 2);
  var thisH = hueBase + random(hueJitter);
  var thisS = 100;
  var thisB = 80;
  var thisA = 70;

  // Some will randomly be the background color.
  if (random(100) < chanceOfMaskCircle) {
    thisS = 0;
    thisB = 100;
    thisA = 100;
    thisStrokeWeight = thisStrokeWeight * 2;
  }

  // Random rotation direction and speed.
  var rotationSpeed = 300.0 * (random(2) > 1 ? 1 : -1);

  // random size and location.
  var thisDiameter = diameterBase + random(diameterJitter);
  var thisX = (width / 2) + (random(locationJitter) - (locationJitter / 2));
  var thisY = (height / 2) + (random(locationJitter) - (locationJitter / 2));

  return {
    x: thisX,
    y: thisY,
    sizeX: thisDiameter,
    sizeY: thisDiameter,
    strokeWeight: thisStrokeWeight,
    h: thisH,
    s: thisS,
    b: thisB,
    a: thisA,
    rotationSpeed: rotationSpeed,
    born: frameCount
  };
}

function setup() {
  createCanvas(canvasSizeX, canvasSizeY);

  colorMode(HSB, 100);
  background(0, 0, 100);
  hueBase = random(100);
  noFill();

  // Start with something on screen.
  for (var i = 0; i < 7; i++) {
    ellipses.push(circleFactory());
  }
}

function draw() {
  var chanceOfCircleSpawn = 1;

  // Clear the frame.
  background(0, 0, 100);

  // Draw circles we have so far.
  ellipses.forEach(function(el) {
    push();
    translate(gravityWell.x, gravityWell.y);
    rotate(frameCount / el.rotationSpeed);

    // Draw circle
    strokeWeight(el.strokeWeight);
    stroke(el.h, el.s, el.b, el.a);
    ellipse(gravityWell.x - el.x, gravityWell.y - el.y, el.sizeX, el.sizeY);
    pop();

    // "Age" the circle.
    age = frameCount - el.born;
    distanceFade = Math.sqrt(age*2) / 20.0;
    el.sizeX = el.sizeX - distanceFade;
    el.sizeY = el.sizeY - distanceFade;
    if (el.sizeX > 0) {
      el.a = originalOpacity * (el.sizeX / canvasSizeX);
    }
    var percentOfLife = el.a / 100;
    var distX = el.x - gravityWell.x;
    var distY = el.y - gravityWell.y;
    el.x = el.x - (distX * percentOfLife) / 1000;
    el.y = el.y - (distY * percentOfLife) / 1000;
  });

  // If we have room for more circles, randomly create them.
  if (ellipses.length < numCircles) {
    if (random(100) < chanceOfCircleSpawn) {
      ellipses.push(circleFactory());
    }
  }

  // If any circle is too faded, restart it bigger
  for (var i = 0; i < ellipses.length; i++) {
    var el = ellipses[i];
    if ((el.a <= 0) || (el.sizeX < el.strokeWeight)) {
      ellipses[i] = circleFactory();
    }
  } 

}
