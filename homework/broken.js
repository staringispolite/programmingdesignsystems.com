function setup() {
  createCanvas(600, 450);
  background(255, 255, 220);
  noStroke();

  // Big main object.
  var xBig = 0;
  var yBig = height / 8;
  var wBig = width / 2;
  var hBig = height * 7/8;

  translate(xBig, yBig);
  fill(40);
  rect(0, 0, wBig, hBig);
  // Reset translation, so next drawing makes more sense.
  resetMatrix();

  // Overwrite with background color to "break" it.
  var breakRotationDegrees = 14;
  translate(xBig + wBig, yBig + (hBig / 3));
  rotate(radians(breakRotationDegrees+2));
  fill(255, 255, 220);
  rect(0, 0, wBig, hBig);
  // Reset translation, so next drawing makes more sense.
  resetMatrix();

  // Broken-off chunk.
  var xSmall = wBig / 2;
  var ySmall = height;
  translate(xSmall + 150, ySmall - 60); 
  rotate(radians(breakRotationDegrees));
  fill(40);
  rect(0, 0, wBig, hBig);

  // Reset translation, so next drawing makes more sense.
  resetMatrix();

  noLoop();
}
