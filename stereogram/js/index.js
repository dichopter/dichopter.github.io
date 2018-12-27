
// <Register service worker>
if('serviceWorker' in navigator) { // Check if supported...
  window.addEventListener('load', function() {
    navigator.serviceWorker
    .register("../sworkerFull.js")
    .then(function(reg) {console.log("Service worker registered in page...");})
    .catch(function(err){console.log(err);});
  }); 
}
// </Register service worker>

var stereoImage;
var leftImage, rightImage;
var imgScale = 0.005;
var switchButton, resetButton; 
var pLineLength = 0;
var imageMoveX = -50, imageMoveY = 0;

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
  // console.log(document.cookie);
  stereoImage = loadImage('https://raw.githubusercontent.com/dichopter/dichopter.github.io/master/stereogram/images/image'+imageNum+'.jpg', function(){
    leftImage = createImage(Math.floor(stereoImage.width/2), Math.floor(stereoImage.height));
    leftImage.loadPixels();
    leftImage.copy(stereoImage, 0, 0, stereoImage.width/2, stereoImage.height, 0, 0, stereoImage.width/2, stereoImage.height); 
    
    rightImage = createImage(Math.floor(stereoImage.width/2), Math.floor(stereoImage.height));
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
  imgScale = calculateOptimum(0.001,5);
  

  switchButton = createButton("switch");
  styleElement(switchButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-right", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  switchButton.position(0, window.innerHeight-100);
  switchButton.mousePressed(switchImages);
  
  resetButton = createButton("reset"); 
  styleElement(resetButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-left", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  resetButton.position(window.innerWidth-100, window.innerHeight-100);
  resetButton.mousePressed(resetImages);
  showButtons();

}  

function draw() {
  background(0);
  fill(255,255,255);
  if (keyIsDown(LEFT_ARROW))  {  imageMoveX -= 5;  }
  if (keyIsDown(RIGHT_ARROW)) {  imageMoveX += 5;  }
  if (keyIsDown(UP_ARROW))    {  imageMoveY -= 5;  }
  if (keyIsDown(DOWN_ARROW))  {  imageMoveY += 5;  }
    imageMode(CENTER);
  var imageWidth = leftImage.width*imgScale;
  image(leftImage,(0.5*window.innerWidth+imageMoveX-imageWidth/2),0.5*window.innerHeight+imageMoveY, rightImage.width*imgScale, rightImage.height*imgScale);
  image(rightImage,(0.5*window.innerWidth-imageMoveX+imageWidth/2),0.5*window.innerHeight+imageMoveY, rightImage.width*imgScale, rightImage.height*imgScale); 

  cursor(MOVE);
  if(mouseY>=window.innerHeight-100&&(mouseX<=100||mouseX>=window.innerWidth-100)) cursor(HAND);
}

function styleElement(element, styles) {
  if(styles.length==0||styles.length%2!==0) {
    throw "Styles array is not evenly sized or is empty!";
  }
  for(var i=0; i<styles.length; i+=2) {
    element.style(styles[i], styles[i+1]);
  }
}


function showButtons() {
  styleElement(switchButton, ["opacity", "1"]);
  styleElement(resetButton, ["opacity", "1"]);
  setTimeout(function(){ 
    styleElement(switchButton, ["opacity", "0"]);
    styleElement(resetButton, ["opacity", "0"]);
   }, 3000);
}


function calculateOptimum(min, max) {
  var optimum = 0.05;
  var scale = 0.85;
  var fullImageWidth = rightImage.width*optimum*2;
  var fullImageHeight = rightImage.height*optimum;
  var scaledWidth = window.innerWidth*scale;
  var scaledHeight = window.innerHeight*scale*scale;
  
  // shrink the images to the optimum scale
  while(((rightImage.width*optimum*2>scaledWidth)||(rightImage.height*optimum>scaledHeight))&&optimum>0)
  {optimum-=0.001;}
  // "grow" the image to fill up to the scale
  while((rightImage.width*optimum*2<scaledWidth)||(rightImage.height*optimum<scaledHeight))
    {optimum+=0.001;}

  if(optimum>=0.001) optimum-=0.001;
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

function mouseMoved() {
  showButtons();
}

function touchMoved() {
  showButtons();
  if(touches.length==1){
    if(abs(mouseX-pmouseX)<20) imageMoveX+=mouseX-pmouseX;
    if(abs(mouseY-pmouseY)<20) imageMoveY+=mouseY-pmouseY;
  } else if(touches.length==2) {
    var currentLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
    var lineDiff = currentLineLength-pLineLength;
    var sensitivity = 0.01;
    if(abs(lineDiff>30)) lineDiff=0; // preventing superzoom glitches
    if(lineDiff>0) {
      imgScale+=sensitivity;
    } else if(lineDiff<0) {
      imgScale-=sensitivity;
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
    imgScale+=0.005;
  } else if(deltaY<0) {
    imgScale-=0.005;
  }
  deltaY=constrain(deltaY,-20,20);
  deltaY=map(deltaY,-20,20,-5,5); 
}

function doubleClicked() {return false;} //disable double-click zoom

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  imgScale = calculateOptimum(0.001, 5); // reset image sizes and size appropriately
  resetImages(); // reset image positions
  switchButton.style("top", (windowHeight-100)+"px");
  switchButton.style("left", "0px");
  resetButton.style("top", (windowHeight-100)+"px");
  resetButton.style("left", (windowWidth-100)+"px");
  showButtons();
}

window.addEventListener("orientationchange", function(){
  //since resizeCanvas is broken on Chrome for iOS, we must reload the window
    if(window.navigator.userAgent.match("CriOS")){ 
        location.reload();  
    } 
});
