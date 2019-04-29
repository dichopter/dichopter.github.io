
// <Register service worker>
// if('serviceWorker' in navigator) { // Check if supported...
//   window.addEventListener('load', function() {
//     navigator.serviceWorker
//     .register("https://dichopter.com/sworkerFull.js")
//     .then(function(reg) {console.log("Service worker registered in page...");})
//     .catch(function(err){console.log(err);});
//   }); 
// }
// </Register service worker>
var c;
var stereoImage;
var imgScale = 0.001;
var switchButton, resetButton, exitButton; 
var pLineLength = 0;
var imageMoveX = 0, imageMoveY = 0;
var imageWidth, imageHeight;


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
  stereoImage = loadImage('https://raw.githubusercontent.com/dichopter/dichopter.github.io/master/stereogram/images/image'+getCookie('imageNum')+'.jpg');
}

function setup() {
  stereoImage.loadPixels(); // hopefully makes the preload function blocking
  c = createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  noFill();
  stroke(155);
  strokeWeight(10);
  calculateOptimum();

  switchButton = createButton("switch");
  styleElement(switchButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-right", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  switchButton.position(0, window.innerHeight-100);
  switchButton.mousePressed(switchImages);

  resetButton = createButton("reset"); 
  styleElement(resetButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-left", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  resetButton.position(window.innerWidth-100, window.innerHeight-100);
  resetButton.mousePressed(resetImages);
  

  exitButton = createButton("X");
  styleElement(exitButton, ["padding", "0", "padding-bottom", "45px", "text-shadow", "black 0px 0px 5px", "padding-left", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  exitButton.position(window.innerWidth-100, 0);
  exitButton.mousePressed(goBack);

  showButtons();
}

function draw() {
  background(0);
  fill(255,255,255);
  stroke(200);
  strokeWeight(1);
  line(windowWidth/2, windowHeight/2-50, windowWidth/2, windowHeight/2+50);
  if (keyIsDown(LEFT_ARROW))  {  imageMoveX -= 5;  }
  if (keyIsDown(RIGHT_ARROW)) {  imageMoveX += 5;  }
  if (keyIsDown(UP_ARROW))    {  imageMoveY -= 5;  }
  if (keyIsDown(DOWN_ARROW))  {  imageMoveY += 5;  }

  imageWidth = stereoImage.width*imgScale;
  imageHeight = stereoImage.height*imgScale;
  image(stereoImage,(windowWidth/2-imageWidth/2+imageMoveX),windowHeight/2-imageHeight/2+imageMoveY, imageWidth/2, imageHeight, 0, 0, stereoImage.width/2, stereoImage.height);
  image(stereoImage,(windowWidth/2-imageMoveX),windowHeight/2-imageHeight/2+imageMoveY, imageWidth/2, imageHeight, stereoImage.width/2, 0, stereoImage.width/2, stereoImage.height);
  cursor(MOVE);
  //if(imgScale=0.001) calculateOptimum();
  if(mouseY>=window.innerHeight-100&&(mouseX<=100||mouseX>=window.innerWidth-100)) cursor(HAND);
}

function styleElement(element, styles) {
  if(styles.length==0||styles.length%2!==0) {
    throw "Styles array is not evenly sized or is empty!";
  }
  if(!element) {
    throw "Please pass in an element";
  }
  for(var i=0; i<styles.length; i+=2) {
    element.style(styles[i], styles[i+1]);
  }
}


function showButtons() {
  styleElement(switchButton, ["opacity", "1"]);
  styleElement(resetButton, ["opacity", "1"]);
  styleElement(exitButton, ["opacity", "1"]);
  setTimeout(function(){ 
    styleElement(switchButton, ["opacity", "0"]);
    styleElement(resetButton, ["opacity", "0"]);
    styleElement(exitButton, ["opacity", "0"]);
   }, 3000);
}



function calculateOptimum() {
    var scale = .80;
    var maxWidth = document.body.clientWidth/stereoImage.width;
    var maxHeight = document.body.clientHeight/stereoImage.height;
    var maximum = max(maxWidth, maxHeight);
    maximum*=scale;
    imgScale = maximum/2;
}

function switchImages() {
  if(imageMoveX>0) {
    imageMoveX = -imageMoveX+imgScale*stereoImage.width/2; 
  } else {
    imageMoveX = -imageMoveX+imgScale*stereoImage.width/2;
  }
}

function resetImages(){
  imageMoveX = 0;
  imageMoveY = 0;
}

function goBack() {
  window.history.back();
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
    if(mouseX>windowWidth/2) {
      imageMoveX-=constrain(mouseX-pmouseX,-20,20);
    } else {
      imageMoveX+=constrain(mouseX-pmouseX,-20,20);
    }
    if(abs(mouseY-pmouseY)<20) imageMoveY+=mouseY-pmouseY;
  } else if(touches.length==2) {
    var currentLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
    var lineDiff = currentLineLength-pLineLength;
    var sensitivity = 0.005;
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
    imgScale+=0.008;
  } else if(deltaY<0) {
    imgScale-=0.008;
  }
  deltaY=constrain(deltaY,-20,20);
  deltaY=map(deltaY,-20,20,-5,5); 
}

function doubleClicked() {return false;} //disable double-click zoom

function windowResized() {
  var b = document.querySelector('body');
  c = resizeCanvas(b.offsetWidth, b.offsetHeight);
  var currentCanvas = document.querySelector("canvas");
  currentCanvas.style.width = b.offsetWidth+"px";
  currentCanvas.style.height = b.offsetHeight+"px";
  windowWidth = b.offsetWidth;
  windowHeight = b.offsetHeight;

  calculateOptimum(); // reset image sizes and size appropriately
  resetImages(); // reset image positions
  styleElement(switchButton, ["top", (windowHeight-100)+"px"]);
  styleElement(resetButton, ["top", (windowHeight-100)+"px", "left", (windowWidth-100)+"px"]);
  styleElement(exitButton, ["top", 0+"px", "left", (windowWidth-100)+"px"]);
  showButtons();
}


window.addEventListener("orientationchange", function(){
  //since rotating does not make the canvas fullscreen on chrome for iOS, we must devise a different way to do so
    if(window.navigator.userAgent.match("CriOS")){ 
      
    }
});


//stereoImage = loadImage('https://rawgit.com/xavierrocks/xavierrocks.github.io/master/projectLITE/Page-5-Image-5.png',
