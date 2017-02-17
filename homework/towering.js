function setup() {
  createCanvas(600, 450);
  background(255, 255, 220);
  noStroke();
  fill(40);

  // Big (towering) object.
  var xBig = 0;
  var yBig = height / 8;
  var wBig = width / 4;
  var hBig = height * 7/8;

  translate(xBig, yBig);
  rect(0, 0, wBig, hBig);
  translate(-xBig, -yBig); // Reset translation, so next drawing makes more sense.

  // Small object for scale.
  var wSmall = 10;
  var hSmall = 20;
  var xSmall = xBig + wBig + 80; // Standing near big.
  var ySmall = height - (hSmall * .9);
  translate(xSmall, ySmall); 
  rotate(radians(27));          // Looking up at it.
  rect(0, 0, wSmall, hSmall);

  // Reset translation and rotation.
  translate(-xSmall, -ySmall);
  rotate(radians(-27));
  noLoop();
}
