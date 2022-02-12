class Note {
    constructor(isTreble, midi) {
        this.isTreble = isTreble;
        this.midi = midi;

        this.note = this.constructor.midiToPitch(this.midi);
        this.hasAccidental = this.note.includes("#");
        
        this.noteNoAccidental = this.note.replace("#", "");

        let grid = this.isTreble ? TrebleGrid : BassGrid;
        this.noteCoord = grid[this.noteNoAccidental];
    }

    get clef() {
        return this.isTreble ? "Treble" : "Bass";
    }

    get location() {
        let x = 0;
        let y = 0;
        
        try {
            if (this.noteCoord % 2 != 0) x = 130;
            y = this.noteCoord * 50;
        } catch (error) {
            console.error("Out of Range.\n", error);
        }
        

        console.log(x,y);
        return [x,y];
    }

    // Credit to Tone.js for this function
    static midiToPitch(midi) {
        const scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
	    const note = midi % 12;
	    return scaleIndexToNote[note] + (Math.floor(midi/12) - 1).toString();
    }
}

class Staff {
    constructor(clef) {
        this.clef = clef;
    }

    drawNote(midi, isSharp) {
        // Pull values from input boxes
        let isTreble = this.clef == "treble";
        let midiNumber = midi;

        // Create Note object and calculate location
        let currentNote = new Note(isTreble, midiNumber);
        let [x,y] = currentNote.location;

        // Place clef on staff
        let clef = document.getElementById("clef");
        if (isTreble) {
            clef.setAttributeNS(null, "href", "#treble");
            clef.setAttributeNS(null, "y", 22);
            clef.setAttributeNS(null, "transform", "scale(15)");
        }
        else {
            clef.setAttributeNS(null, "href", "#bass");
            clef.setAttributeNS(null, "y", 19);
            clef.setAttributeNS(null, "transform", "scale(20)");
        }
        
        
        // Place sharp and show/hide based on midi value
        if (!currentNote.hasAccidental) { 
            let accidental = document.getElementById("accidental");
            accidental.setAttributeNS(null, "href", "#sharp");
            accidental.setAttributeNS(null, "x", x);
            accidental.setAttributeNS(null, "y", y);
            if (currentNote.hasAccidental)
                accidental.setAttributeNS(null, "style", "display: initial");
            else
                accidental.setAttributeNS(null, "style", "display: none");
        }
        
        // Place note head
        let noteHead = document.getElementById("noteArea");
        noteHead.setAttributeNS(null, "href", "#note");
        noteHead.setAttributeNS(null, "x", x);
        noteHead.setAttributeNS(null, "y", y);

        // Clear all ledger lines
        let ledgers = document.querySelectorAll("use[href='#upperLedger'], use[href='#lowerLedger']");
        ledgers.forEach((i) => {
            i.remove();
        })

        // Place upper ledger line(s) as needed
        if (currentNote.noteCoord < -1) {
            let elem;
            for (let i = 0; i < Math.abs(Math.ceil(currentNote.noteCoord / 2)); i++) {
                elem = document.createElementNS("http://www.w3.org/2000/svg", "use");
                elem.setAttributeNS(null, "href", "#upperLedger");
                elem.setAttributeNS(null, "x", 130 * Math.abs(currentNote.noteCoord % 2));
                elem.setAttributeNS(null, "y", -100 * i);
                document.getElementById("upperLedgers").append(elem);
            }
        }

        // Place lower ledger line(s) as needed
        if (currentNote.noteCoord > 9) {
            let elem;
            for (let i = 0; i < Math.abs(Math.floor(currentNote.noteCoord / 2)) - 3; i++) {
                elem = document.createElementNS("http://www.w3.org/2000/svg", "use");
                elem.setAttributeNS(null, "href", "#lowerLedger");
                elem.setAttributeNS(null, "x", 130 * Math.abs(currentNote.noteCoord % 2));
                elem.setAttributeNS(null, "y", 100 * i);
                document.getElementById("lowerLedgers").append(elem);
            }
        }

    }
}

// Enharmonic pairs object for adding additional accidental support
const enharmonicPairs = {
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
    "A#": "Bb",
    "B#": "C",
    "E#": "F"
}

/* 
The following two objects, `TrebleGrid` and `BassGrid` create a
pseudo-coordinate system to easily quantify note placement on the staff.
The origin is defined as the top line of the staff. In `TrebleGrid`, this is F5.
In `BassGrid`, this is A3. In both grids, descending down in pitch will result
in a *higher* coordinate number. Notes that go above the origin (in the ledger
lines above the staff) will have a negative coordinate value. See
`dev-ref/coordinates_example.md` for a visual explanation.
*/
const TrebleGrid = {
    "C6": -4,
    "B5": -3,
    "A5": -2,
    "G5": -1,
    "F5": 0,
    "E5": 1,
    "D5": 2,
    "C5": 3,
    "B4": 4,
    "A4": 5,
    "G4": 6,
    "F4": 7,
    "E4": 8,
    "D4": 9,
    "C4": 10,
    "B3": 11,
    "A3": 12,
    "G3": 13,
    "F3": 14,
    "E3": 15,
    "D3": 16,
    "C3": 17
}

const BassGrid = {
    "G4": -6,
    "F4": -5,
    "E4": -4,
    "D4": -3,
    "C4": -2,
    "B3": -1,
    "A3": 0,
    "G3": 1,
    "F3": 2,
    "E3": 3,
    "D3": 4,
    "C3": 5,
    "B2": 6,
    "A2": 7,
    "G2": 8,
    "F2": 9,
    "E2": 10,
    "D2": 11,
    "C2": 12,
    "B1": 13,
    "A1": 14,
    "G1": 15,
    "F1": 16,
    "E1": 17,
}
