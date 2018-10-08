var stereoImage;
var leftImage, rightImage;
var slider, switchButton, resetButton; 
var pLineLength = 0;
var imageMoveX = 0, imageMoveY = 0;
var imageXSlider;
var mousePressed = false;
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


function preload(){
  var imageNum = getCookie("imageNum");
  console.log(document.cookie);
  stereoImage = loadImage('https://raw.githubusercontent.com/dichopter/dichopter.github.io/master/stereogram/images/image'+imageNum+'.jpg', function(){
    leftImage = createImage(int(stereoImage.width/2), int(stereoImage.height));
    leftImage.loadPixels();
    leftImage.copy(stereoImage, 0, 0, stereoImage.width/2, stereoImage.height, 0, 0, stereoImage.width/2, stereoImage.height); 
    
    rightImage = createImage(int(stereoImage.width/2), int(stereoImage.height));
    rightImage.loadPixels();
    rightImage.copy(stereoImage, stereoImage.width/2, 0, stereoImage.width/2, stereoImage.height, 0, 0, stereoImage.width/2, stereoImage.height);
  });
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255,255,255);
  
  noFill();
  stroke(155);
  strokeWeight(10);
  slider = createSlider(.1, 5, calculateOptimum(.1,5), .005);
  slider.position(-100, -100);
  slider.style('width', '10px');
  switchButton = createButton('');
  switchButton.style("padding", "0");
  switchButton.style("background-color", "transparent");
  switchButton.style("background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.github.io/master/stereogram/js/switch.png')");
  switchButton.style("background-size", "cover");
  switchButton.style("width", "100px");
  switchButton.style("height", "100px");  
  switchButton.style("border", "none");
  switchButton.position(5, window.innerHeight-100);
  switchButton.mousePressed(switchImages);
  
  resetButton = createButton('');
  resetButton.style("padding", "0");
  resetButton.style("background-color", "transparent");
  resetButton.style("background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.github.io/master/stereogram/js/reset.png')");
  resetButton.style("background-size", "cover");
  resetButton.style("width", "100px");
  resetButton.style("height", "100px");  
  resetButton.style("border", "none");
  resetButton.position(window.innerWidth-105, window.innerHeight-100);
  resetButton.mousePressed(resetImages);
  
}  

function draw() {
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
  fill(255,255,255);
  imageMode(CENTER);
  
  image(leftImage,.25*window.innerWidth+imageMoveX,.5*window.innerHeight+imageMoveY, rightImage.width*slider.value(), rightImage.height*slider.value());
  image(rightImage,.25*window.innerWidth+(leftImage.width*slider.value())-imageMoveX,.5*window.innerHeight+imageMoveY, rightImage.width*slider.value(), rightImage.height*slider.value()); 
  
  //right.width = slider.value();
  //console.log(right);
  //line(mouseX, mouseY, pmouseX, pmouseY);
  
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  slider.elt.value = calculateOptimum(.1, 5);
  switchButton.style("top", (window.height-100)+"px");
  resetButton.style("top", (window.height-100)+"px");
  resetButton.style("left", (window.width-105)+"px");
}

function calculateOptimum(min, max) {
  var optimum = .05;
  while((rightImage.width*optimum*2<window.innerWidth)&&(rightImage.height*optimum<window.innerHeight))
    {optimum+=.05;}
  optimum-=.05;
  return constrain(optimum, min, max);
}

function switchImages() {
  var tempImage = leftImage;
  leftImage = rightImage;
  rightImage = tempImage;
}

function resetImages(){
  imageMoveX = 0;
  imageMoveY = 0;
}

function mouseDragged() {
  imageMoveX+=mouseX-pmouseX;
  imageMoveY+=mouseY-pmouseY;  
}

function touchMoved() {
  if(touches.length==1){
    if(abs(mouseX-pmouseX)<20) imageMoveX+=mouseX-pmouseX;
    if(abs(mouseY-pmouseY)<20) imageMoveY+=mouseY-pmouseY;
     
  } else if(touches.length==2) {
    var currentLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
    var lineDiff = currentLineLength-pLineLength;
    
    if(abs(lineDiff>30)) lineDiff=0;
    if(lineDiff>0) {
      slider.elt.value=(slider.value()+.005).toString();
    } else if(lineDiff<0) {
      slider.elt.value=(slider.value()-.005).toString();
    }
    if(pLineLength==0) {
      pLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);  
    } else {
      pLineLength = 0;
    }
  }
	return false;
}

function mouseWheel(e) {
  var deltaY = e.deltaY;
  if(deltaY>0) {
    slider.elt.value=(slider.value()+.005).toString();
  } else if(deltaY<0) {
    slider.elt.value=(slider.value()-.005).toString();
  }
  deltaY=constrain(deltaY,-20,20);
  //console.log(deltaY);
  deltaY=map(deltaY,-20,20,-5,5);
  
  //console.log(lerp(deltaY, 5, .1));
}

function doubleClicked() {
  return false;
}


