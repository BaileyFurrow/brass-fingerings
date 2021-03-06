class Note {
    constructor(isTreble, midi) {
        this.isTreble = isTreble;
        this.midi = Number(midi);

        this.note = this.constructor.midiToPitch(this.midi);
        this.hasAccidental = this.note.includes("#");
        
        this.noteNoAccidental = this.note.replace("#", "");

        this.grid = this.isTreble ? TrebleGrid : BassGrid;
        this.noteCoord = this.grid[this.noteNoAccidental];
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
    constructor(note) {
        this.note = note;
        this.viewbox = [0,300,1000,700];
    }

    drawNote() {
        // Pull values from input boxes

        // Create Note object and calculate location
        let currentNote = this.note;
        let [x,y] = currentNote.location;


        // Place clef on staff
        this.constructor.drawClef(currentNote.isTreble);
        
        
        // Place sharp and show/hide based on midi value
        let accidental = document.getElementById("accidental");
        accidental.setAttributeNS(null, "href", "#sharp");
        accidental.setAttributeNS(null, "x", x);
        accidental.setAttributeNS(null, "y", y);
        if (currentNote.hasAccidental)
            accidental.setAttributeNS(null, "style", "display: initial");
        else
            accidental.setAttributeNS(null, "style", "display: none");
    
        // Place note head
        let noteHead = document.getElementById("noteArea");
        noteHead.setAttributeNS(null, "href", "#note");
        noteHead.setAttributeNS(null, "x", x);
        noteHead.setAttributeNS(null, "y", y);

        // Clear all ledger lines
        this.clearLedgerLines();

        // Place upper ledger line(s) as needed
        this.drawUpperLedger(currentNote);

        // Place lower ledger line(s) as needed
        this.drawLowerLedger(currentNote);

        // Set proper dimensions for SVG
        let svg = document.getElementById("staffArea");
        svg.setAttribute("viewBox", this.viewbox.join());

    }

    drawLowerLedger(currentNote) {
        if (currentNote.noteCoord > 9) {
            let elem;
            this.viewbox[3] = currentNote.noteCoord * 100 / 1.5;
            for (let i = 0; i < Math.abs(Math.floor(currentNote.noteCoord / 2)) - 3; i++) {
                elem = document.createElementNS("http://www.w3.org/2000/svg", "use");
                elem.setAttributeNS(null, "href", "#lowerLedger");
                elem.setAttributeNS(null, "x", 130 * Math.abs(currentNote.noteCoord % 2));
                elem.setAttributeNS(null, "y", 100 * i);
                document.getElementById("lowerLedgers").append(elem);
            }
        }
    }

    drawUpperLedger(currentNote) {
        if (currentNote.noteCoord < -1) {
            let elem;
            let adjustViewbox = currentNote.noteCoord * 100 / 2;
            this.viewbox[1] += adjustViewbox;
            this.viewbox[3] -= adjustViewbox;
            for (let i = 0; i < Math.abs(Math.ceil(currentNote.noteCoord / 2)); i++) {
                elem = document.createElementNS("http://www.w3.org/2000/svg", "use");
                elem.setAttributeNS(null, "href", "#upperLedger");
                elem.setAttributeNS(null, "x", 130 * Math.abs(currentNote.noteCoord % 2));
                elem.setAttributeNS(null, "y", -100 * i);
                document.getElementById("upperLedgers").append(elem);
            }
        }
    }

    clearLedgerLines() {
        let ledgers = document.querySelectorAll("use[href='#upperLedger'], use[href='#lowerLedger']");
        ledgers.forEach((i) => {
            i.remove();
        });
    }

    static drawClef(isTreble) {
        let clef = document.getElementById("clef");
        if (isTreble) {
            clef.setAttributeNS(null, "href", "#treble");
            clef.setAttributeNS(null, "y", 22);
            clef.setAttributeNS(null, "transform", "scale(15)");
        }
        else {
            clef.setAttributeNS(null, "href", "#bass");
            clef.setAttributeNS(null, "y", 20);
            clef.setAttributeNS(null, "transform", "scale(20)");
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
