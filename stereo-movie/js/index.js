var playing = false;
var video;
var button;
var switched = false;

var stereoImage;
var leftImage, rightImage;
var slider, switchButton, resetButton;
var pLineLength = 0;
var imageMoveX = -50,
  imageMoveY = 0;
var imageXSlider;
var mousePressed = false;

function preload() {
  video = createVideo([
  "https://upload.wikimedia.org/wikipedia/commons/2/22/Volcano_Lava_Sample.webm"
  ]);
  video.hide();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  leftImage = createImage(int(video.width / 2), int(video.height));
  leftImage.loadPixels();
  leftImage.copy(video, 0, 0, video.width / 2, video.height, 0, 0, video.width / 2, video.height);

  rightImage = createImage(int(video.width / 2), int(video.height));
  rightImage.loadPixels();
  rightImage.copy(video, video.width / 2, 0, video.width / 2, video.height, 0, 0, video.width / 2, video.height );

  button = createButton("");
  button.style("padding", "0");
  button.style("background-color", "transparent");
  button.style("background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.com/master/stereogram/js/play.png')");
  button.style("background-size", "cover");
  button.style("width", "100px");
  button.style("height", "100px");
  button.style("border", "none");
  button.position(0, 0);
button.mousePressed(toggleVid);
  slider = createSlider(0.1, 5, calculateOptimum(0.1, 5, .15), 0.005);
  slider.position(-100, -100);
  slider.style("width", "10px");
  switchButton = createButton("");
  switchButton.style("padding", "0");
  switchButton.style("background-color", "transparent");
  switchButton.style("background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.com/master/stereogram/js/switch.png')");
  switchButton.style("background-size", "cover");
  switchButton.style("width", "100px");
  switchButton.style("height", "100px");
  switchButton.style("border", "none");
  switchButton.position(5, window.innerHeight - 100);
  switchButton.mousePressed(switchImages);

  resetButton = createButton("");
  resetButton.style("padding", "0");
  resetButton.style("background-color", "transparent");
  resetButton.style("background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.com/master/stereogram/js/reset.png')");
  resetButton.style("background-size", "cover");
  resetButton.style("width", "100px");
  resetButton.style("height", "100px");
  resetButton.style("border", "none");
  resetButton.position(window.innerWidth - 100, window.innerHeight - 100);
  resetButton.mousePressed(resetImages);
}

function draw() {
  leftImage = createImage(int(video.width / 2), int(video.height));
  leftImage.loadPixels();
  leftImage.copy(
    video,
    0,
    0,
    video.width / 2,
    video.height,
    0,
    0,
    video.width / 2,
    video.height
  );
  rightImage = createImage(int(video.width / 2), int(video.height));
  rightImage.loadPixels();
  rightImage.copy(
    video,
    video.width / 2,
    0,
    video.width / 2,
    video.height,
    0,
    0,
    video.width / 2,
    video.height
  );
  background(150);

  if (keyIsDown(LEFT_ARROW)) {
    imageMoveX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    imageMoveX += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    imageMoveY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    imageMoveY += 5;
  }

  fill(255, 255, 255);
  imageMode(CENTER);
  drawImages();
  
  cursor(MOVE);
  if (
    mouseY >= window.innerHeight - 100 &&
    (mouseX <= 100 || mouseX >= window.innerWidth - 100)
  )
    cursor(HAND);
}

// plays or pauses the video depending on current state
function toggleVid() {
  if (playing) {
    video.pause();
    button.style("background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.com/master/stereogram/js/play.png')");
  } else {
    video.loop();
    button.style("background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.com/master/stereogram/js/pause.png')");
  }
  playing = !playing;
}

function calculateOptimum(min, max, scale) {
  var optimum = 0.05;
  
  while (
    (rightImage.width * optimum * 2) < (window.innerWidth * scale) &&
    (rightImage.height * optimum) < (window.innerHeight * scale)
  ) {
    optimum += 0.05;
  }
  optimum -= 0.05;
  return constrain(optimum, min, max);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  slider.elt.value = calculateOptimum(0.1, 5, .8);
  switchButton.style("top", window.height - 100 + "px");
  switchButton.style("left", "0px");
  resetButton.style("top", window.height - 100 + "px");
  resetButton.style("left", window.width - 100 + "px");
}

function drawImages() {
  var imageWidth = leftImage.width * slider.value();
  if (!switched) {
    image(
      leftImage,
      0.5 * window.innerWidth + imageMoveX - imageWidth / 2,
      0.5 * window.innerHeight + imageMoveY,
      rightImage.width * slider.value(),
      rightImage.height * slider.value()
    );
    image(
      rightImage,
      0.5 * window.innerWidth - imageMoveX + imageWidth / 2,
      0.5 * window.innerHeight + imageMoveY,
      rightImage.width * slider.value(),
      rightImage.height * slider.value()
    );
  } else {
    image(
      rightImage,
      0.5 * window.innerWidth + imageMoveX - imageWidth / 2,
      0.5 * window.innerHeight + imageMoveY,
      rightImage.width * slider.value(),
      rightImage.height * slider.value()
    );
    image(
      leftImage,
      0.5 * window.innerWidth - imageMoveX + imageWidth / 2,
      0.5 * window.innerHeight + imageMoveY,
      rightImage.width * slider.value(),
      rightImage.height * slider.value()
    );
  }
}

function switchImages() {
  switched = !switched;
}

function resetImages() {
  imageMoveX = -50;
  imageMoveY = 0;
}

function mouseDragged() {
  imageMoveX += mouseX - pmouseX;
  imageMoveY += mouseY - pmouseY;
}

function touchMoved() {
  if (touches.length == 1) {
    if (abs(mouseX - pmouseX) < 20) imageMoveX += mouseX - pmouseX;
    if (abs(mouseY - pmouseY) < 20) imageMoveY += mouseY - pmouseY;
  } else if (touches.length == 2) {
    var currentLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
    var lineDiff = currentLineLength - pLineLength;
    var sensitivity = 0.01;
    if (abs(lineDiff > 30)) lineDiff = 0; // preventing superzoom glitches
    if (lineDiff > 0) {
      slider.elt.value = (slider.value() + sensitivity).toString();
    } else if (lineDiff < 0) {
      slider.elt.value = (slider.value() - sensitivity).toString();
    }
    if (pLineLength == 0) {
      pLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
    } else {
      pLineLength = 0; // don't double count a zoom event
    }
  }
  return false;
}

function mouseWheel(e) {
  var deltaY = e.deltaY;
  if (deltaY > 0) {
    slider.elt.value = (slider.value() + 0.005).toString();
  } else if (deltaY < 0) {
    slider.elt.value = (slider.value() - 0.005).toString();
  }
  deltaY = constrain(deltaY, -20, 20);
  //console.log(deltaY);
  deltaY = map(deltaY, -20, 20, -5, 5);

  //console.log(lerp(deltaY, 5, .1));
}

function doubleClicked() {
  return false;
}

window.addEventListener("orientationchange", function() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  slider.elt.value = calculateOptimum(0.1, 5);
  switchButton.style("top", window.height - 100 + "px");
  switchButton.style("left", "0px");
  resetButton.style("top", window.height - 100 + "px");
  resetButton.style("left", window.width - 100 + "px");
});