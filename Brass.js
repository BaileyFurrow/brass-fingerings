console.log("Imported 'Brass.js'");
const BRASS_FINGERINGS = {
    TRUMPET: {//  123
        C4:     0b000,
        CS4:    0b111,
        D4:     0b101,
        DS4:    0b011,
        E4:     0b110,
        F4:     0b100,
        FS4:    0b010,
        G4:     0b000,
        GS4:    0b011,
        A4:     0b110,
        AS4:    0b100,
        B4:     0b010,
        C5:     0b000
    },
    HORN: { //    T123
        C4:     0b0000,
        CS4:    0b0110,
        D4:     0b0100,
        DS4:    0b0010,
        E4:     0b0000,
        F4:     0b0100,
        FS4:    0b0010,
        G4:     0b0000,
        GS4:    0b1011,
        A4:     0b1110,
        AS4:    0b1100,
        B4:     0b1010,
        C5:     0b1000
    },
    TROMBONE: {
        C3:     0o6,
        CS3:    0o5,
        D3:     0o4,
        DS3:    0o3,
        E3:     0o2,
        F3:     0o1,
        FS3:    0o5,
        G3:     0o4,
        GS3:    0o3,
        A3:     0o2,
        AS3:    0o1,
        B3:     0o4,
        C4:     0o3
    },
    BARITONE: {
        C3:     0b101,
        CS3:    0b011,
        D3:     0b110,
        DS3:    0b100,
        E3:     0b010,
        F3:     0b000,
        FS3:    0b011,
        G3:     0b110,
        GS3:    0b100,
        A3:     0b010,
        AS3:    0b000,
        B3:     0b110,
        C4:     0b100
    },
    TUBA: {
        C2:     0b101,
        CS2:    0b011,
        D2:     0b110,
        DS2:    0b100,
        E2:     0b010,
        F2:     0b000,
        FS2:    0b011,
        G2:     0b110,
        GS2:    0b100,
        A2:     0b010,
        AS2:    0b000,
        B2:     0b110,
        C3:     0b100
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
