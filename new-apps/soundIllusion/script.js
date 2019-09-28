let playButton;
let panner,synth;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(255);
    noFill();

    playButton = createButton("play");
    styleElement(playButton, ["padding", "0", "padding-top", "45px", "text-shadow", "black 0px 0px 5px", "padding-right", "30px", "background-color", "transparent", "color", "white", "width", "100px", "height", "100px", "border", "none", "opacity", "0", "transition", "opacity 2.5s"]);
    playButton.position(0, 0);
    playButton.mousePressed(playSound);
}


function draw() {
    background(100);
}



function touchMoved() {
    if(!panner) panner = new Tone.Panner(-1).toMaster();
    if(!synth) synth = new Tone.Synth().toMaster().connect(panner);
    console.log("I was clicked!");
    synth.triggerAttackRelease('C4', '4n');
    showButtons();
    return false;
}

function playSound() {
    if(!panner) panner = new Tone.Panner(-1).toMaster();
    if(!synth) synth = new Tone.Synth().toMaster().connect(panner);
    console.log("I was clicked!");
    synth.triggerAttackRelease('C4', '4n');
    showButtons();
}


function doubleClicked() { return false; } //disable double-click zoom



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
    styleElement(playButton, ["opacity", "1"]);
    setTimeout(function() {
        styleElement(playButton, ["opacity", "0"]);
    }, 3000);
}

function mouseMoved() {
    showButtons();
}

function windowResized() {
    var width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
        height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    resizeCanvas(width, height);
    

    
    // ADD STYLE ELEMENT FOR RESET BUTTON!!!
    showButtons();
}

// var ampEnv = new Tone.AmplitudeEnvelope({
// 	"attack": 0.1,
// 	"decay": 0.2,
// 	"sustain": 1.0,
// 	"release": 0.8
// }).toMaster();
// //create an oscillator and connect it
// var osc = new Tone.Oscillator().connect(ampEnv).start();
// //trigger the envelopes attack and release "8t" apart
// ampEnv.triggerAttackRelease("8t");


// { filter??
//     type : sine ,
//     min : 0 ,
//     max : 1 ,
//     phase : 0 ,
//     frequency : 4n ,
//     amplitude : 1 ,
//     units : Tone.Type.Default
//     }
    

// var filter = new Tone.Filter(200, "highpass");
// var lfo = new Tone.LFO("4n", 400, 4000);
// lfo.connect(filter.frequency);








//create an autopanner and start it's LFO
// var autoPanner = new Tone.AutoPanner("4n").toMaster().start();
//route an oscillator through the panner and start it
// var oscillator = new Tone.Oscillator().connect(autoPanner).start();