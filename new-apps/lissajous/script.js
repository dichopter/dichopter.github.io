// Stop after how many frames
var iterations = 4000;
// The higher the damping the less the pendulum will shift its position
// ie. damping of 1000 or more will just draw concentric spirals
let switchButton, resetButton, exitButton;
let l;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(255);
    noFill(); 

    l = new Lissajous(5.25, 400, 4000);


    resetButton = createButton("🔄");
    styleElement(resetButton, ["padding", "0", "text-shadow", "black 0px 0px 5px", "background-color", "white", "color", "black", "width", "100px", "height", "100px", "border", "none", "opacity", "0.8", "transition", "opacity 1.5s", "font-size", "80px", "right", "0", "bottom", "0", "position", "fixed"]);
    resetButton.mousePressed(resetImages);


    switchButton = createButton("↔️");
    styleElement(switchButton, ["padding", "0", "text-shadow", "black 0px 0px 5px", "background-color", "white", "color", "black", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s", "font-size", "80px", "left", "0", "bottom", "0", "position", "fixed"]);
    switchButton.mousePressed(switchImages);

    exitButton = createButton("✖️");
    styleElement(exitButton, ["padding", "0", "text-shadow", "black 0px 0px 5px", "background-color", "white", "color", "black", "opacity", "0.8", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 1.5s", "font-size", "80px", "position", "fixed", "top", "0", "right", "0"]);
    exitButton.mousePressed(goBack);
    showButtons();

}

function draw() {
    if (keyIsDown(LEFT_ARROW)) {
        l.offsetX -= 5;
        l.draw();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        l.offsetX += 5;
        l.draw();
    }
    if (keyIsDown(UP_ARROW)) {
        l.offsetY -= 5;
        l.draw();
    }
    if (keyIsDown(DOWN_ARROW)) {
        l.offsetY += 5;
        l.draw();
    }
}

function goBack() {
    window.history.back();
}

function touchMoved() {
    showButtons();
    if (touches.length == 1) {
        if (mouseX > windowWidth / 2) {
            l.offsetX -= constrain(mouseX - pmouseX, -20, 20);
        } else {
            l.offsetX += constrain(mouseX - pmouseX, -20, 20);
        }
        if (abs(mouseY - pmouseY) < 20) l.offsetY += mouseY - pmouseY;
    } else if (touches.length == 2) {
        // var currentLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
        // var lineDiff = currentLineLength-pLineLength;
        // var sensitivity = 0.005;
        // if(abs(lineDiff>30)) lineDiff=0; // preventing superzoom glitches
        // if(lineDiff>0) {
        //   imgScale+=sensitivity;
        // } else if(lineDiff<0) {
        //   imgScale-=sensitivity;
        // }
        // if(pLineLength==0) {
        //   pLineLength = dist(mouseX, mouseY, touches[1].x, touches[1].y);
        // } else {
        //   pLineLength = 0; // don't double count a zoom event
        // }
    }
    l.draw();
    return false;
}

function doubleClicked() { return false; } //disable double-click zoom

function mouseDragged() {
    l.offsetX += mouseX - pmouseX;
    l.offsetY += mouseY - pmouseY;
    l.draw();
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
    styleElement(switchButton, ["opacity", "0.8"]);
    styleElement(resetButton, ["opacity", "0.8"]);
    styleElement(exitButton, ["opacity", "0.8"]);

    setTimeout(function() {
        styleElement(switchButton, ["opacity", "0"]);
        styleElement(resetButton, ["opacity", "0"]);
        styleElement(exitButton, ["opacity", "0"]);
    }, 3000);
}

function mouseMoved() {
    showButtons();
}

function switchImages() {
    l.switched = !l.switched;
    l.draw();
}

function resetImages() {
    l.offsetX = 0;
    l.offsetY = 0;
    l.draw();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    l.draw();
    var width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
        height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    styleElement(switchButton, ["top", (height - 100) + "px"]);
    // ADD STYLE ELEMENT FOR RESET BUTTON!!!
    showButtons();
}



class Lissajous {
    constructor(ratio, damping, iterations) {
        this.ratio = ratio;
        // this.x = x;
        // this.y = y;
        this.xAmp = 1;
        this.yAmp = ratio;
        this.damping = damping;
        this.iterations = iterations;
        this.vxA = [];
        this.vyA = [];
        this.switched = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.draw();
    }

    draw() {
        background(0);
        stroke(255);
        noFill();
        line(windowWidth / 2, windowHeight * .4, windowWidth / 2, windowHeight * .6);
        let maxDimension = min(windowHeight, windowWidth);
        for (let i = 0; i < iterations; i++) {
            let x1 = this.xAmp * cos(i / 8) * exp(-i / 2500);
            let y1 = this.yAmp * sin(i / 8) * exp(-i / 2500);
            let d = this.damping;
            let vx = sin(i / this.damping) * x1 - cos(i / d) * y1;
            let vy = cos(i / this.damping) * x1 + sin(i / d) * y1;
            this.vxA.push(vx);
            this.vyA.push(vy);
        }
        let minVx = min(this.vxA);
        let maxVx = max(this.vxA);
        let minVy = min(this.vyA);
        let maxVy = max(this.vyA);

        let width = map(maxVy, minVy, maxVy, 0, maxDimension / 4);
        let height = map(maxVx, minVx, maxVx, 0, maxDimension / 2);

        beginShape();
        for (let i = 0; i < this.iterations; i++) {
            let px = map(this.vxA[i], minVx, maxVx, 0, maxDimension / 2);
            let py = map(this.vyA[i], minVy, maxVy, 0, maxDimension / 2);
            if (!this.switched) {
                vertex(px + (0.5 * windowWidth / 2 - width) + this.offsetX, py + (windowHeight / 2 - height / 2) + this.offsetY);
            } else {
                vertex(px + ((0.5 * windowWidth / 2 - width) + windowWidth / 2) - this.offsetX, py + (windowHeight / 2 - height / 2) + this.offsetY);
            }
        }
        endShape();

        this.vxA.length = 0;
        this.vyA.length = 0;
        let k = 8;
        for (var i = 0; i < iterations; i++) {
            let input = i;
            input += 60 * PI;
            let x1 = this.xAmp * cos(input / k) * exp(-input / 2500);
            let y1 = this.yAmp * sin(input / k) * exp(-input / 2500);
            let vx = sin(input / this.damping) * x1 - cos(input / this.damping) * y1;
            let vy = cos(input / this.damping) * x1 + sin(input / this.damping) * y1;
            this.vxA.push(vx);
            this.vyA.push(vy);
        }
        minVx = min(this.vxA);
        maxVx = max(this.vxA);
        minVy = min(this.vyA);
        maxVy = max(this.vyA);
        width = map(maxVy, minVy, maxVy, 0, maxDimension / 4);
        height = map(maxVx, minVx, maxVx, 0, maxDimension / 2);
        beginShape();
        for (let i = 0; i < this.iterations; i++) {
            var px = map(this.vxA[i], minVx, maxVx, 0, maxDimension / 2);
            var py = map(this.vyA[i], minVy, maxVy, 0, maxDimension / 2);
            // Define the vertex
            if (!this.switched) {
                vertex(px + ((0.5 * windowWidth / 2 - width) + windowWidth / 2) - this.offsetX, py + (windowHeight / 2 - height / 2) + this.offsetY);
            } else {
                vertex(px + (0.5 * windowWidth / 2 - width) + this.offsetX, py + (windowHeight / 2 - height / 2) + this.offsetY);
            }


        }
        endShape();

    }
}