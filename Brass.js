console.log("Imported 'Brass.js'");

// TODO: Refactor all JS code to separate file

var inst, instValue;

function instSelection() {
    instValue = document.getElementById("instSelect").value;
    inst = BRASS[instValue];
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

var currentNote;

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

function showBinary() {
    document.getElementById("test").innerHTML = toBinary(fingers);
}


function newNote() {
    reset();
    let max = 12;
    let rand = Math.floor(Math.random() * max);
    let brassFingers = inst.fingerSet;
    let note = Object.keys(brassFingers)[rand];
    currentNote = [note, brassFingers[note]];

    console.log(currentNote);

    document.getElementById("noteName").innerHTML = currentNote[0].replace("S", "#");
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
    let note = currentNote[1].toString(2).padStart(4, "0");
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
other brass instruments. Above each object are comments containing labels for
matching the binary number to fingerings.
*/
const BRASS_FINGERINGS = {
    TRUMPET: {//  123
        C4:     [0b000],
        CS4:    [0b111],
        D4:     [0b101],
        DS4:    [0b011],
        E4:     [0b110],
        F4:     [0b100],
        FS4:    [0b010],
        G4:     [0b000],
        GS4:    [0b011],
        A4:     [0b110],
        AS4:    [0b100],
        B4:     [0b010],
        C5:     [0b000]
    },
    HORN: { //    T123
        C4:     [0b0000],
        CS4:    [0b0110],
        D4:     [0b0100],
        DS4:    [0b0010],
        E4:     [0b0000],
        F4:     [0b0100],
        FS4:    [0b0010],
        G4:     [0b0000],
        GS4:    [0b1011],
        A4:     [0b1110],
        AS4:    [0b1100],
        B4:     [0b1010],
        C5:     [0b1000]
    },
    TROMBONE: {
        C3:     [0o6],
        CS3:    [0o5],
        D3:     [0o4],
        DS3:    [0o3],
        E3:     [0o2],
        F3:     [0o1],
        FS3:    [0o5],
        G3:     [0o4],
        GS3:    [0o3],
        A3:     [0o2],
        AS3:    [0o1],
        B3:     [0o4],
        C4:     [0o3]
    },
    BARITONE: {// 123
        C3:     [0b101],
        CS3:    [0b011],
        D3:     [0b110],
        DS3:    [0b100],
        E3:     [0b010],
        F3:     [0b000],
        FS3:    [0b011],
        G3:     [0b110],
        GS3:    [0b100],
        A3:     [0b010],
        AS3:    [0b000],
        B3:     [0b110],
        C4:     [0b100]
    },
    TUBA: { //    123
        C2:     [0b101],
        CS2:    [0b011],
        D2:     [0b110],
        DS2:    [0b100],
        E2:     [0b010],
        F2:     [0b000],
        FS2:    [0b011],
        G2:     [0b110],
        GS2:    [0b100],
        A2:     [0b010],
        AS2:    [0b000],
        B2:     [0b110],
        C3:     [0b100]
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
