var img, c;
// var msg = 'Drag an image file of a SBS \n stereo pair onto the canvas.';
var stereoImage;
var switchButton, resetButton, exitButton;
var imgScale = 0.001;
var pLineLength = 0;
var imageMoveX = 0,
  imageMoveY = 0;
var input;
var inputLabel;
var imageWidth, imageHeight;


function setup() {
  c = createCanvas(windowWidth, windowHeight);
  c.drop(gotFile);
  input = createFileInput(handleFile);
  input.position(0, -50);
  input.attribute("name", "file");
  input.attribute("id", "file");
  inputLabel = createElement('label', 'Choose an image...');
  inputLabel.attribute("for", "file");
  inputLabel.position(windowWidth / 2 - 105, windowHeight / 2);
  styleElement(inputLabel, ['color', 'white', 'padding', '10px', 'border', '3px dashed white', 'border-radius', '21px', 'font-size', '1.5em', 'font-family', 'Arial', 'cursor', 'pointer', 'transition', 'opacity 1.5s']);


  switchButton = createButton("switch");
  styleElement(switchButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-right", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  switchButton.position(0, window.innerHeight - 100);
  switchButton.mousePressed(switchImages);

  resetButton = createButton("reset");
  styleElement(resetButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-left", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  resetButton.position(window.innerWidth - 100, window.innerHeight - 100);
  resetButton.mousePressed(resetImages);

  exitButton = createButton("X");
  styleElement(exitButton, ["padding", "0", "padding-bottom", "45px", "text-shadow", "black 0px 0px 5px", "padding-left", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  exitButton.position(window.innerWidth - 100, 0);
  exitButton.mousePressed(goBack);

}

function draw() {
  if (img == null) {
    background(40);
    noStroke();
    fill(255);
    // textAlign(CENTER);
    noFill();
    stroke(255);
    strokeWeight(5);
    rect(windowWidth * 0.015, windowWidth * 0.015, windowWidth * .97, windowHeight * 0.955);

  } else {
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
    background(0);
    fill(255, 255, 255);
    stroke(200);
    strokeWeight(1);
    line(windowWidth / 2, windowHeight / 2 - 50, windowWidth / 2, windowHeight / 2 + 50);
    imageWidth = img.width * imgScale;
    imageHeight = img.height * imgScale;
    image(img, (windowWidth / 2 - imageWidth / 2 + imageMoveX), windowHeight / 2 - imageHeight / 2 + imageMoveY, imageWidth / 2, imageHeight, 0, 0, img.width / 2, img.height);
    image(img, (windowWidth / 2 - imageMoveX), windowHeight / 2 - imageHeight / 2 + imageMoveY, imageWidth / 2, imageHeight, img.width / 2, 0, img.width / 2, img.height);
    if (img.width != 0 && img.height != 0 && imgScale == 0.0001) calculateOptimum();
    cursor(MOVE);
    if (mouseY >= window.innerHeight - 100 && (mouseX <= 100 || mouseX >= window.innerWidth - 100)) cursor(HAND);
  }

}


function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // assign the stereoImage variable
    img = createImg(file.data).hide();
    stereoImage = img;
    calculateOptimum();
    styleElement(inputLabel, ["top", "10px", "left", "10px"]);
  } else {
    msg = 'Not an image file! Try again :/.';
    img = null;
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data);
    img.hide();
    stereoImage = img;

    calculateOptimum();
    styleElement(inputLabel, ["top", "10px", "left", "10px"]);
  } else {
    msg = 'Not an image file! Try again :/.';
    img = null;
  }

}



function styleElement(element, styles) {
  if (styles.length == 0 || styles.length % 2 !== 0) {
    throw "Styles array is not evenly sized or is empty!";
  }
  if (!element) {
    throw "Please pass in an element";
  }
  for (var i = 0; i < styles.length; i += 2) {
    element.style(styles[i], styles[i + 1]);
  }
}

function showButtons() {
  if (img != null) {
    styleElement(switchButton, ["opacity", "1"]);
    styleElement(resetButton, ["opacity", "1"]);
    styleElement(inputLabel, ["opacity", "1"]);
    styleElement(exitButton, ["opacity", "1"]);
    setTimeout(function () {
      styleElement(switchButton, ["opacity", "0"]);
      styleElement(resetButton, ["opacity", "0"]);
      styleElement(inputLabel, ["opacity", "0"]);
      styleElement(exitButton, ["opacity", "0"]);
    }, 3000);
  }
}

function __delay__(timer) {
  return new Promise(resolve => {
    timer = timer || 2000;
    setTimeout(function () {
      resolve();
    }, timer);
  });
};

function calculateOptimum() {

  // window.setTimeout(calculateOptimum, 100);
  // alert("OOOOOOF");
  // if (typeof stereoImage !== "undefined" && typeof stereoImage.width !== "undefined" && typeof stereoImage.height !== "undefined") {
  //   //variable exists, do what you want
  //   var scale = .80;
  //   var maxWidth = width / stereoImage.width;
  //   var maxHeight = height / stereoImage.height;
  //   var maximum = max(maxWidth, maxHeight);
  //   maximum *= scale;
  //   imgScale = maximum / 2;
  // } else {
  //   setTimeout(calculateOptimum, 250);
  // }
  setTimeout(async function () {
    //STOPT THE FUNCTION UNTIL CONDITION IS CORRECT
    while (typeof stereoImage == "undefined" || typeof stereoImage.width == "undefined" || typeof stereoImage.height == "undefined"){
      await __delay__(1500);

    }

    //WHEN CONDITION IS CORRECT THEN TRIGGER WILL CLICKED
    var scale = .80;
    var maxWidth = width / stereoImage.width;
    var maxHeight = height / stereoImage.height;
    var maximum = max(maxWidth, maxHeight);
    maximum *= scale;
    imgScale = maximum / 2;
  }, 1);
}

function switchImages() {
  if (imageMoveX > 0) {
    imageMoveX = -imageMoveX + imgScale * img.width / 2;
  } else {
    imageMoveX = -imageMoveX + imgScale * img.width / 2;
  }
}

function goBack() {
  window.history.back();
}

function resetImages() {
  imageMoveX = 0;
  imageMoveY = 0;
}

function mouseDragged() {
  imageMoveX += mouseX - pmouseX;
  imageMoveY += mouseY - pmouseY;
}

function mouseMoved() {
  showButtons();
}

function touchMoved() {
  showButtons();
  if (touches.length == 1) {
    if (mouseX > windowWidth / 2) {
      imageMoveX -= constrain(mouseX - pmouseX, -20, 20);
    } else {
      imageMoveX += constrain(mouseX - pmouseX, -20, 20);
    }
    if (abs(mouseY - pmouseY) < 20) imageMoveY += mouseY - pmouseY;
  } else if (touches.length == 2) {
    var currentLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
    var lineDiff = currentLineLength - pLineLength;
    var sensitivity = 0.005;
    if (abs(lineDiff > 30)) lineDiff = 0; // preventing superzoom glitches
    if (lineDiff > 0) {
      imgScale += sensitivity;
    } else if (lineDiff < 0) {
      imgScale -= sensitivity;
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
    imgScale += 0.005;
  } else if (deltaY < 0) {
    imgScale -= 0.005;
  }
  deltaY = constrain(deltaY, -20, 20);
  deltaY = map(deltaY, -20, 20, -5, 5);
}

function doubleClicked() {
  return false;
} //disable double-click zoom

function windowResized() {
  windowWidth = document.body.clientWidth;
  windowHeight = document.documentElement.clientHeight;
  width = windowWidth;
  height = windowHeight;
  c = resizeCanvas(windowWidth, windowHeight);
  // var currentCanvas = document.querySelector("canvas");
  // currentCanvas.style.width = windowWidth+"px";
  // currentCanvas.style.height = windowHeight+"px";

  calculateOptimum(); // reset image sizes and size appropriately
  resetImages(); // reset image positions
  styleElement(switchButton, ["top", (windowHeight - 100) + "px"]);
  styleElement(resetButton, ["top", (windowHeight - 100) + "px", "left", (windowWidth - 100) + "px"]);
  styleElement(exitButton, ["top", 0 + "px", "left", (windowWidth - 100) + "px"]);
  showButtons();
  calculateOptimum();
}




window.addEventListener("orientationchange", function () {
  //since resizeCanvas is broken on Chrome for iOS, we must reload the window
  if (window.navigator.userAgent.match("CriOS")) {
    // location.reload();  no longer needed because we resize correctly now
  }
});