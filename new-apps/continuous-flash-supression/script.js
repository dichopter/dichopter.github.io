var c;
var leftImage;
var squareArray;
var exitButton;
var resetButton;
var switchButton;
var offsetX;
var offsetY;
var imgScale;
var switchOffset = 0;
var pLineLength = 0;
var grayscale = false;

function preload() {
    leftImage = loadImage("einstein.png");
}


function setup() {
    c = createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 255);


    offsetY = 0;
    offsetX = 0;
    imgScale = 1;

    settingsButton = createButton("BW"); // the settings button is currently just a grayscale button
    styleElement(settingsButton, ["padding", "0", "text-shadow", "black 0px 0px 5px", "background-color", "white", "color", "black", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s", "font-size", "50px", "position", "fixed", "top", "0", "left", "0"]);
    settingsButton.mousePressed(showSettings);

    exitButton = createButton("✖️");
    styleElement(exitButton, ["padding", "0", "text-shadow", "black 0px 0px 5px", "background-color", "white", "color", "black", "opacity", "0.8", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s", "font-size", "80px", "position", "fixed", "top", "0", "right", "0"]);
    exitButton.mousePressed(goBack);

    switchButton = createButton("↔️");
    styleElement(switchButton, ["padding", "0", "text-shadow", "black 0px 0px 5px", "background-color", "white", "color", "black", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s", "font-size", "80px", "left", "0", "bottom", "0", "position", "absolute"]);
    switchButton.mousePressed(switchImages);

    resetButton = createButton("🔄");
    styleElement(resetButton, ["padding", "0", "text-shadow", "black 0px 0px 5px", "background-color", "white", "color", "black", "width", "100px", "height", "100px", "border", "none", "opacity", "0.8", "transition", "opacity 1.5s", "font-size", "80px", "right", "0", "bottom", "0", "position", "absolute"]);
    resetButton.mousePressed(resetImages);

    showButtons();



    squareArray = new MondrianArray(400, window.width / 2, window.width / 8, window.height / 8);

    t = setInterval(updateSquares, 100);
    // windowResized();
}


function draw() {
    background(200);
    image(leftImage, (windowWidth / 4 - windowWidth / 2 / 2) + offsetX + switchOffset, (windowHeight / 2 - windowWidth / 2.5 / 2) + offsetY, (windowWidth / 2) * imgScale, (windowWidth / 2.5) * imgScale);
    squareArray.drawAll();

}

function updateSquares() {
    squareArray.updateAll(switchOffset, grayscale);
    // squareArray.updateSquares(switchOffset, grayscale);
}

function mouseMoved() {
    showButtons();
}

function touchMoved() {
    showButtons();
    return false;
}

function resetImages() {
    offsetX = 0;
    offsetY = 0;
    imgScale = 1;
}

function switchImages() {
    if (switchOffset == 0) {
        var width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        switchOffset = width / 2;
        squareArray.switchOffset = switchOffset;
    } else {
        switchOffset = 0;
        squareArray.switchOffset = 0;
    }
}

function mouseWheel(e) {
    var deltaY = e.deltaY;
    if (deltaY > 0) {
        imgScale += 0.008;
    } else if (deltaY < 0) {
        imgScale -= 0.008;
    }
    deltaY = constrain(deltaY, -20, 20);
    deltaY = map(deltaY, -20, 20, -5, 5);
}

function touchMoved() {
    showButtons();
    if (touches.length == 1) {
        offsetX += constrain(mouseX - pmouseX, -20, 20);
        if (abs(mouseY - pmouseY) < 20) offsetY += mouseY - pmouseY;
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

function goBack() {
    window.history.back();
}

function showSettings() {
    grayscale = !grayscale;
    squareArray.updateAll(switchOffset, grayscale);
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
    styleElement(exitButton, ["opacity", "0.8"]);
    styleElement(resetButton, ["opacity", "0.8"]);
    styleElement(switchButton, ["opacity", "0.8"]);
    styleElement(settingsButton, ["opacity", "0.8"]);
    setTimeout(function () {
        styleElement(exitButton, ["opacity", "0"]);
        styleElement(resetButton, ["opacity", "0"]);
        styleElement(switchButton, ["opacity", "0"]);
        styleElement(settingsButton, ["opacity", "0"]);
    }, 3000);
}

// function windowResized() {
//     resizeEverything();
//     // resizeEverything();
// }

window.addEventListener("resize", function () {
    resizeEverything();
});

function resizeEverything() {
    // var width =
    // window.innerWidth ||
    // document.documentElement.clientWidth ||
    // document.body.clientWidth,
    // height =
    //     window.innerHeight ||
    //     document.documentElement.clientHeight ||
    //     document.body.clientHeight;

    // var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // //  alert("width:"+width+";window.innerWidth:"+window.innerWidth+";document.documentElement.clientWidth:"+document.documentElement.clientWidth+";document.body.clientWidth:"+document.body.clientWidth+";window.width:"+window.width+"height:"+height+";window.innerHeight:"+window.innerHeight+";document.documentElement.clientHeight:"+document.documentElement.clientHeight+";document.body.clientHeight:"+document.body.clientHeight+";window.height:"+window.height);
    // if(window.height!=height) window.height = height;
    // if(window.width!=width) window.width = width;
    // squareArray.resize(width, height);
    // var b = document.querySelector('body');
    // if(b.style.height!=height) b.style.height=height;
    // if(b.style.width!=width) b.style.width=width;
    var currentCanvas = document.querySelector("canvas");
    // if(currentCanvas.height != height) currentCanvas.height = height;
    // if(currentCanvas.width != width) currentCanvas.width = width;
    // c = resizeCanvas(width, height);
    // if (windowWidth != width) windowWidth = width;
    // if(windowHeight = height) windowHeight != height;
    var w = Math.min(document.documentElement.clientWidth, window.innerWidth);
    var h = Math.min(document.documentElement.clientHeight, window.innerHeight);

    currentCanvas.height = h;
    currentCanvas.style.height = h + "px";

    currentCanvas.width = w;
    currentCanvas.style.width = w + "px";
    resizeCanvas(w, h);

    if (switchOffset) {
        switchOffset = width / 2;
        squareArray.switchOffset = switchOffset;
    }

    showButtons();
}

function resizeEverything2(w, h) {
    var currentCanvas = document.querySelector("canvas");
    currentCanvas.height = h;
    currentCanvas.style.height = h + "px";
    currentCanvas.width = w;
    currentCanvas.style.width = w + "px";
    resizeCanvas(w, h);
    if (switchOffset) {
        switchOffset = width / 2;
        squareArray.switchOffset = switchOffset;
    }
    showButtons();
}




function mouseDragged() {
    showButtons();
    offsetX += mouseX - pmouseX;
    offsetY += mouseY - pmouseY;
}

class MondrianArray {
    constructor(squareCount, maxLeft, maxWidth, maxHeight) {
        this.squareCount = squareCount;
        this.maxLeft = maxLeft;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.squares = [];
        for (var i = 0; i < this.squareCount; i++) {
            this.squares.push(new MondrianSquare(random(this.maxLeft, window.width), random(0, window.height), random(20, this.maxWidth), random(20, this.maxHeight), this.maxLeft));
        }
        // this.switchOffset = 0;
        // this.grayscale = false;
    }

    updateAll(switchOffset, grayscale) {
        for (var i = 0; i < this.squareCount; i++) {
            this.squares[i].update(switchOffset, grayscale);
        }
    }

    drawAll() {
        for (var i = 0; i < this.squareCount; i++) {
            this.squares[i].draw();
        }
    }



    resize(width, height) {

        this.maxWidth = width / 8;
        this.maxHeight = height / 8;
        for (var i = 0; i < this.squareCount; i++) {
            this.squares[i].resize(random(20, this.maxWidth), random(20, this.maxHeight));
        }
    }




}

class MondrianSquare {
    constructor(x, y, width, height, maxLeft) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = random(0, 255);
        this.maxLeft = maxLeft;
        this.hv = random(-1, 1);
        this.grayscale = false;
        this.switchOffset = 0;
    }
    move() {
        this.x = random(window.width / 2, window.width);
        this.y = random(0, window.height);
    }


    draw() {
        if (this.grayscale) {
            fill(0, 0, this.color, 255);
        } else {
            fill(this.color, 255, 255, 255);
        }
        noStroke();
        this.color += this.hv;
        if (this.color > 255 || this.color < 0) this.hv *= -1;
        rect(this.x - this.switchOffset, this.y, this.width, this.height);

    }

    checkEdges() {
        if (this.x + this.width > window.width || (this.switchOffset && this.x + this.width > window.width / 2)) {
            this.x = this.x - this.width;
        }
        if (this.y + this.height > window.height) {
            this.y = window.height - this.height;
        }
    }

    resize(w, h) {
        this.width = w;
        this.height = h;
    }

    update(switchOffset, grayscale) {
        this.switchOffset = switchOffset;
        this.grayscale = grayscale;
        this.move();
        this.checkEdges();
    }

}