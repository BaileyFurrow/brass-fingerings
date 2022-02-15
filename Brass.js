console.log("Imported 'Brass.js'");

// TODO: Refactor all JS code to separate file

var inst, instValue;

function instSelection() {
    instValue = document.getElementById("instSelect").value;
    inst = BRASS[instValue];
    Staff.drawClef(inst.isTreble);
    document.getElementById("fingering-app").style.display = "block";
    document.getElementById("instName").innerHTML = inst.getName();
    hornHide(instValue != "horn");
    reset();
}

function hornHide(isHidden) {
    let circles = document.getElementById("circles").children;
    for (let i=0; i<circles.length; i++) {
        let circle = circles[i];
        circle.attributes.cx.value = 50 - (100*isHidden) + i*100;
        console.log(50-100*isHidden);
    }
}

let currentNote;

// Fingering Action
let circles = document.getElementById("circles").children;
for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let defaultColor = () => {
        if (fingers[i]) circle.style.fill = "#222222";
        if (!fingers[i]) circle.style.fill = "white";
    }

    circle.addEventListener("mouseover", () => {
        circle.style.fill = "#787878";
    });
    circle.addEventListener("mouseout", () => {
        defaultColor();
    })

    circle.addEventListener("click", c => {
        fingers[i] = !fingers[i];
        defaultColor();
        });
}

function toBinary(list) {
    let a = list.reduce((total, current, i) => total + current * Math.pow(2, i));
    return a.toString(2).split("").reverse().join("").padEnd(4, "0");
}


function newNote() {
    reset();
    let max = 12;
    let rand = Math.floor(Math.random() * max);
    let brassFingers = inst.fingerSet;
    let note = Object.keys(brassFingers)[rand];
    currentNote = [note, brassFingers[note]];

    const objNote = new Note(inst.isTreble, note);
    const staff = new Staff(objNote);
    staff.drawNote();

    console.log(currentNote);

    document.getElementById("noteName").innerHTML = Note.midiToPitch(note);
}

function reset() {
    document.getElementById("noteName").innerHTML = "";
    document.getElementById("isCorrect").innerHTML = "";
    fingers = [false,false,false]
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.fill = "white";
        circles[i].setAttribute("stroke", "black");
    }
    
}

function checkNote() {
    let note = currentNote[1];
    let ans = parseInt(toBinary(fingers), 2);
    let ansText = document.getElementById("isCorrect");
    if (note.includes(ans)) ansText.innerHTML = "YES!!!";
    else ansText.innerHTML = "no.";
}

function showCorrectNote() {
    let note = currentNote[1][0].toString(2).padStart(4, "0");
    console.log(note, note.length);
    for (let i = 0; i < note.length; i++) {
        console.log(circles[i]);
        if (parseInt(note[i], 2) == 1) circles[i].setAttribute("stroke", "red");
    }
}

/*
The `BRASS_FINGERINGS` constant provides *mostly* binary representations of
fingerings for all of the brass intruments. The `TROMBONE` object is the sole
exception. This is due to trombones using slide positions, 1 being all-the-way
in and 7 being fully extended, rather than fingerings that would be seen on
other brass instruments. The numbered keys are the notes' midi values. 
Above each object are comments containing labels for matching the binary number
to fingerings.
*/
const BRASS_FINGERINGS = {
    TRUMPET: {//  123
        60:    [0b000],     // C4
        61:    [0b111],
        62:    [0b101],
        63:    [0b011],
        64:    [0b110],
        65:    [0b100],
        66:    [0b010],
        67:    [0b000],
        68:    [0b011],
        69:    [0b110],
        70:    [0b100],
        71:    [0b010],
        72:    [0b000]
    },
    HORN: { //    T123
        60:    [0b0000],    // C4
        61:    [0b0110],
        62:    [0b0100],
        63:    [0b0010],
        64:    [0b0000],
        65:    [0b0100],
        66:    [0b0010],
        67:    [0b0000],
        68:    [0b1011],
        69:    [0b1110],
        70:    [0b1100],
        71:    [0b1010],
        72:    [0b1000]
    },
    TROMBONE: {
        48:    [0o6],       // C3
        49:    [0o5],
        50:    [0o4],
        51:    [0o3],
        52:    [0o2],
        53:    [0o1],
        54:    [0o5],
        55:    [0o4],
        56:    [0o3],
        57:    [0o2],
        58:    [0o1],
        59:    [0o4],
        60:    [0o3]
    },
    BARITONE: {// 123
        48:    [0b101],     // C3
        49:    [0b011],
        50:    [0b110],
        51:    [0b100],
        52:    [0b010],
        53:    [0b000],
        54:    [0b011],
        55:    [0b110],
        56:    [0b100],
        57:    [0b010],
        58:    [0b000],
        59:    [0b110],
        60:    [0b100]
    },
    TUBA: { //    123
        36:    [0b101],     // C2
        37:    [0b011],
        38:    [0b110],
        39:    [0b100],
        40:    [0b010],
        41:    [0b000],
        42:    [0b011],
        43:    [0b110],
        44:    [0b100],
        45:    [0b010],
        46:    [0b000],
        47:    [0b110],
        48:    [0b100]
    }
};

/*

0: Beginner, first five notes
1: Easy, first octave
2: Medium, 2 octaves
3: Hard, 2.5 octaves
4: Expert, all fingerings

*/
const DIFFICULTY = {
    "trumpet": [
        [60,62,64,65,67],
        [60,62,64,65,67,69,71,72],
        [55,57,59,60,62,64,65,67,69,71,72],
    ]
}

const fingerBin = [0b1000, 0b0100, 0b0010, 0b0001];

function drawFingers(inst) {
    let isHorn = inst == "horn";
    let numOfFingers = 3 + isHorn;
    let drawArea = document.getElementById("draw");
    for (let i = 0; i < numOfFingers; i++) {
        let circle = document.createElement("circle");
        circle = circle.setAttribute()
    }
}

/* function toBinary(list) {}
function showBinary() {}

// function newNote() {}
// function checkNote() {}
// function showCorrectNote() {}

function reset() {} */

console.log("Brass.js has been loaded.")

class Brass {
    constructor(inst, fingers) {
        this.value = inst;
        this.fingers = fingers;
        this.fingerSet = BRASS_FINGERINGS[inst.toUpperCase()];
        this.isTreble = inst == "trumpet" || inst == "horn";
    }
    getName() {
        let arrInst = this.value.split("");
        arrInst[0] = arrInst[0].toUpperCase();
        return arrInst.join("");
    }
}


const BRASS = {
    trumpet: new Brass("trumpet", 3),
    horn: new Brass("horn", 4),
    trombone: new Brass("trombone", 7),
    baritone: new Brass("baritone", 3),
    tuba: new Brass("tuba", 3)
}
