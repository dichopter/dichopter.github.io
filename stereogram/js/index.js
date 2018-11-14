// <Register service worker>
if('serviceWorker' in navigator) { // Check if supported...
  window.addEventListener('load', ()=> {
    navigator.serviceWorker
    .register("../sworkerFull.js")
    .then(reg=>console.log("Service worker registered in page..."))
    .catch(err=>console.log(err));
  }); 
}
// </Register service worker>

var stereoImage;
var leftImage, rightImage;
var slider, switchButton, resetButton; 
var pLineLength = 0;
var imageMoveX = -50, imageMoveY = 0;
var imageXSlider;
var mousePressed = false;

var getCookie = function(cname) {var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";};


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
  background(0);
  
  noFill();
  stroke(155);
  strokeWeight(10);
  slider = createSlider(.1, 5, calculateOptimum(.1,5), .005);
  slider.position(-100, -100);
  slider.style('width', '10px');

  switchButton = createButton('');
  styleElement(switchButton, ["padding", "0", "background-color", "transparent", "background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.github.io/master/stereogram/js/switch.png')", "background-size", "cover", "width", "100px", "height", "100px", "border", "none"]);
  switchButton.position(0, window.innerHeight-100);
  switchButton.mousePressed(switchImages);
  
  resetButton = createButton(''); 
  styleElement(resetButton, ["padding", "0", "background-color", "transparent", "background-image", "url('https://raw.githubusercontent.com/dichopter/dichopter.github.io/master/stereogram/js/reset.png')", "background-size", "cover", "width", "100px", "height", "100px", "border", "none"]);
  resetButton.position(window.innerWidth-100, window.innerHeight-100);
  resetButton.mousePressed(resetImages);
}  

function draw() {
  if (keyIsDown(LEFT_ARROW))  {  imageMoveX -= 5;  }
  if (keyIsDown(RIGHT_ARROW)) {  imageMoveX += 5;  }
  if (keyIsDown(UP_ARROW))    {  imageMoveY -= 5;  }
  if (keyIsDown(DOWN_ARROW))  {  imageMoveY += 5;  }
  background(0);
  fill(255,255,255);
  imageMode(CENTER);
  var imageWidth = leftImage.width*slider.value();
  image(leftImage,(.5*window.innerWidth+imageMoveX-imageWidth/2),.5*window.innerHeight+imageMoveY, rightImage.width*slider.value(), rightImage.height*slider.value());
  image(rightImage,(.5*window.innerWidth-imageMoveX+imageWidth/2),.5*window.innerHeight+imageMoveY, rightImage.width*slider.value(), rightImage.height*slider.value()); 

  cursor(MOVE);
  if(mouseY>=window.innerHeight-100&&(mouseX<=100||mouseX>=window.innerWidth-100)) cursor(HAND);
  //alert("Testing alerts...");
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  slider.elt.value = calculateOptimum(.1, 5);
  switchButton.style("top", (window.height-100)+"px");
  switchButton.style("left", "0px");
  resetButton.style("top", (window.height-100)+"px");
  resetButton.style("left", (window.width-100)+"px");
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function styleElement(element, styles) {
  if(styles.length==0||styles.length%2!==0) {
    throw "Styles array is not evenly sized or is empty!";
  }
  for(var i=0; i<styles.length; i+=2) {
    element.style(styles[i], styles[i+1]);
  }
}

function calculateOptimum(min, max) {
  var optimum = .05;
  var scale = .85;
  while((rightImage.width*optimum*2<window.innerWidth*scale)&&(rightImage.height*optimum<window.innerHeight*scale))
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
  imageMoveX = -50;
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
    var sensitivity = 0.01;
    if(abs(lineDiff>30)) lineDiff=0; // preventing superzoom glitches
    if(lineDiff>0) {
      slider.elt.value=(slider.value()+sensitivity).toString();
    } else if(lineDiff<0) {
      slider.elt.value=(slider.value()-sensitivity).toString();
    }
    if(pLineLength==0) {
      pLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
    } else {
      pLineLength = 0; // don't double count a zoom event
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

window.addEventListener("orientationchange", function() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  slider.elt.value = calculateOptimum(.1, 5);
  switchButton.style("top", (window.height-100)+"px");
  switchButton.style("left", "0px");
  resetButton.style("top", (window.height-100)+"px");
  resetButton.style("left", (window.width-100)+"px");
});