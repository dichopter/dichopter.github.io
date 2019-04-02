var img, c;
// var msg = 'Drag an image file of a SBS \n stereo pair onto the canvas.';
var stereoImage;
var switchButton, resetButton; 
var imgScale = 0.01;
var pLineLength = 0;
var imageMoveX = -50, imageMoveY = 0;
var input;
var inputLabel;
var imageWidth, imageHeight;

var info;

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  c.drop(gotFile);
  input = createFileInput(handleFile); 
  input.position(0, -50);
  input.attribute("name", "file");
  input.attribute("id", "file");
  inputLabel = createElement('label', 'Choose an image...');
  inputLabel.attribute("for", "file");
  inputLabel.position(windowWidth/2-105, windowHeight/2);
  styleElement(inputLabel, ['color', 'white', 'padding', '10px', 'border', '3px dashed white', 'border-radius', '21px', 'font-size', '1.5em', 'font-family', 'Arial', 'cursor', 'pointer', 'transition', 'opacity 1.5s']);
  
  
  switchButton = createButton("switch");
  styleElement(switchButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-right", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  switchButton.position(0, window.innerHeight-100);
  switchButton.mousePressed(switchImages);
  
  resetButton = createButton("reset"); 
  styleElement(resetButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-left", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s"]);
  resetButton.position(window.innerWidth-100, window.innerHeight-100);
  resetButton.mousePressed(resetImages);
  console.log("...");
  document.body.style.overflow = "scroll";
  info = createElement("div", '<div id="modal1" class="modal"> <div class="modal-content"> <h2>Welcome</h2> <div class="row"> <img class="col s4" src="https://dichopter.github.io/stereogram/images/image1.jpg" alt="A generic stereographic pair"> <img class="col s4" src="https://dichopter.github.io/stereogram/images/image2.jpg" alt="A generic stereographic pair"> <img class="col s4" src="https://dichopter.github.io/stereogram/images/image3.jpg" alt="A generic stereographic pair"> </div> <p> The photo should be saved to your gallery in order for this to work. The photo is not uploaded to our servers in any form, the applet only creates a temporary copy on your device.</p> <h3>iPhone Instructions</h3> <ol> <li>Save a stereographic pair to your device. You can learn how to make your own stereographic pairs, here. You can find all kinds of stereographic pairs on the internet.</li> <img class="col s4" src="https://dichopter.github.io/stereogram/images/image2.jpg" alt="A generic stereographic pair"> <li>Go to this page, click on “Choose an image...”</li> <img src="https://dichopter.github.io/screenshot1" alt="Screenshot of the app"> <li>Click on “Photo Library”</li> <img src="https://dichopter.github.io/screenshot2" alt="Screenshot of the app"> <li>Select the image from the gallery you want</li> <img src="https://dichopter.github.io/screenshot3" alt="Screenshot of the app"> <li>Enjoy viewing your pair!</li> </ol> <h3>Android Instructions</h3> <ol> <li></li> <li></li> <li></li> </ol> </div> <div class="modal-footer"> <a href="#!" class="modal-close waves-effect waves-green btn-flat">Okay</a> </div> </div>');
  var elem = document.querySelector('.modal');
  var instance = M.Modal.init(elem, {});
  
  instance.open();
}

function draw() {
  if(img==null) {  
    background(40);
    noStroke();
    fill(255);
    // textAlign(CENTER);
    noFill();
    stroke(255);
    strokeWeight(5);
    rect(windowWidth*0.015, windowWidth*0.015, windowWidth*.97, windowHeight*0.955);  
  } else {
    if (keyIsDown(LEFT_ARROW))  {  imageMoveX -= 5;  }
    if (keyIsDown(RIGHT_ARROW)) {  imageMoveX += 5;  }
    if (keyIsDown(UP_ARROW))    {  imageMoveY -= 5;  }
    if (keyIsDown(DOWN_ARROW))  {  imageMoveY += 5;  }
    background(0);
    fill(255,255,255);
    stroke(200);
    strokeWeight(1);
    line(windowWidth/2, windowHeight/2-50, windowWidth/2, windowHeight/2+50);
    imageWidth = img.width*imgScale;
    imageHeight = img.height*imgScale; 
    image(img,(windowWidth/2-imageWidth/2+imageMoveX),windowHeight/2-imageHeight/2+imageMoveY, imageWidth/2, imageHeight, 0, 0, img.width/2, img.height);
    image(img,(windowWidth/2-imageMoveX),windowHeight/2-imageHeight/2+imageMoveY, imageWidth/2, imageHeight, img.width/2, 0, img.width/2, img.height);
    if(img.width!=0&&imgScale==0.01) imgScale = calculateOptimum(0.01, 5);
    cursor(MOVE);
    if(mouseY>=window.innerHeight-100&&(mouseX<=100||mouseX>=window.innerWidth-100)) cursor(HAND);   
  } 
  
}


function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // assign the stereoImage variable
    img = createImg(file.data).hide();   
    stereoImage = img;
    imgScale = calculateOptimum(0.01,5);
    styleElement(inputLabel, ["top", "10px", "left", "10px"]);
  } else {
    msg = 'Not an image file! Try again :/.';
    img = null;
  }
}
function handleFile(file) { 
  print(file); 
  if (file.type === 'image') { 
    img = createImg(file.data); img.hide();
    stereoImage = img;
    imgScale = calculateOptimum(0.01,5);
    styleElement(inputLabel, ["top", "10px", "left", "10px"]);
  } else {
    msg = 'Not an image file! Try again :/.';
    img = null;
  }
  
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
  if(img!=null) {
    styleElement(switchButton, ["opacity", "1"]);
    styleElement(resetButton, ["opacity", "1"]);
    styleElement(inputLabel, ["opacity", "1"]);
    setTimeout(function(){ 
      styleElement(switchButton, ["opacity", "0"]);
      styleElement(resetButton, ["opacity", "0"]);
      styleElement(inputLabel, ["opacity", "0"]);
     }, 3000);
  }
}


function calculateOptimum(min, max) {
  if (stereoImage==null||stereoImage.width==0) return 0.01;
  var optimum = .01;
  var scale = .85;
  while((stereoImage.width*optimum<window.innerWidth*scale)&&(stereoImage.height*optimum<window.innerHeight*scale))
    {optimum+=.05;}
  optimum-=.05;
  return constrain(optimum, min, max);
}

function switchImages() {
  if(imageMoveX>0) {
   imageMoveX = -imageMoveX+imgScale*img.width/2; 
  } else {
    imageMoveX = -imageMoveX+imgScale*img.width/2;
  }
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
    imgScale+=0.005;
  } else if(deltaY<0) {
    imgScale-=0.005;
  }
  deltaY=constrain(deltaY,-20,20);
  deltaY=map(deltaY,-20,20,-5,5); 
}

function doubleClicked() {return false;} //disable double-click zoom

function windowResized() {
  
  windowWidth = document.body.clientWidth;
  windowHeight = document.documentElement.clientHeight;
  c = resizeCanvas(windowWidth, windowHeight);
  var currentCanvas = document.querySelector("canvas");
  // currentCanvas.style.width = windowWidth+"px";
  // currentCanvas.style.height = windowHeight+"px";

  imgScale = calculateOptimum(0.01, 5); // reset image sizes and size appropriately
  resetImages(); // reset image positions
  styleElement(switchButton, ["top", (windowHeight-100)+"px"]);
  styleElement(resetButton, ["top", (windowHeight-100)+"px", "left", (windowWidth-100)+"px"]);
  showButtons();
}

window.addEventListener("orientationchange", function(){
  //since resizeCanvas is broken on Chrome for iOS, we must reload the window
    if(window.navigator.userAgent.match("CriOS")){ 
        // location.reload();  no longer needed because we resize correctly now
    } 
});
