// represents 'c','d','e','f','g','a','b'
const KEY_ORDER = [0,2,4,5,7,9,11];

// represents a4 
const BASE_FREQ = 440;

// amount of columns
const BASE_COLUMNS = 9;

// creates the grid we can select from
const wholeTable = document.querySelector(".whole-table");

for (let c = 1; c < BASE_COLUMNS; c++) {
    const gridColumn = document.createElement("div");
    gridColumn.classList.add("grid-column");
    gridColumn.setAttribute("order", c.toString());
    if (c % 4 == 0) {
        gridColumn.classList.add("quarter");
    }
    
    // j represents octave
    let j = 23;
    for (let i = -12; i < 24; i++) {
        // Create elements
        const pianoKey = document.createElement("div");
        const letters = document.createElement("h3");
    
        // Give keys attributes
        pianoKey.setAttribute("data-note", j.toString());
        // 0 means off, 1 means play not connected, 2 means connected
        pianoKey.setAttribute("selected", "0"); 
        pianoKey.classList.add("key");
        if (i == -1 || i == 11) {
            pianoKey.classList.add("octave");
        }
    
        // remove this shit when I fix css ☻
        letters.innerText = "d";
    
        // Creating the white/gray keys
        if (i < 6 && i % 2 == 0) {
            pianoKey.classList.add("white");
        } else if (i < 6 && i % 2 != 0) {
            pianoKey.classList.add("gray")
        } else if (i > 6 && i % 2 == 0) {
            pianoKey.classList.add("gray");
        } else {
            pianoKey.classList.add("white");
        }
    
        // Adding the newly created keys to the HTML
        gridColumn.append(pianoKey);
        pianoKey.append(letters);
        j--;
    }
    wholeTable.appendChild(gridColumn);
}

let keys = document.querySelectorAll('.key');

// Grid + piano keys playing
keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
    key.addEventListener('click', () => updateSelected(key));
});

// number indicates if it will repeat or hold the note 
async function updateSelected(key) {
    let playLength = key.getAttribute("selected");
    
    if (playLength == 1) {
        key.setAttribute("selected", "2");
    } else if (playLength == 2) {
        key.setAttribute("selected", "0");
    } else {
        key.setAttribute("selected", "1");
    }
}

// Play button
let playButton = document.querySelector('.play-button');

playButton.addEventListener('click', () => playSong());

async function playSong() {
    keys.forEach(key => {
        for (let i = 1; i < BASE_COLUMNS; i++) {
            row = key.parentElement;
            if (row.getAttribute("order") == i) {
                if (key.getAttribute("selected") == 1) {
                    setTimeout(() => playNote(key), 1000)
                }
            }
        }
    });
}

// this function will play audio
async function playNote(key) {
    let playLength = key.getAttribute("selected");

    // This is where all audio will connect
    let audioContext = new AudioContext();

    // these are all the nodes
    let oscN = audioContext.createOscillator();
    let gainN = audioContext.createGain();

    // oscillator 
    oscN.type = 'sine'

    // const audioElement = document.getElementById(key.dataset.note);
    // console.log(Object.getOwnPropertyNames(audioElement));
    // Equation avalible here: https://pages.mtu.edu/~suits/NoteFreqCalcs.html
    // fn = f0 * (a)n
    console.log(BASE_FREQ * Math.pow(1.0594, (key.dataset.note-9)));
    oscN.frequency.value = BASE_FREQ * Math.pow(1.0594, (key.dataset.note-9)) ;

    // gain
    gainN.gain.value = 0.25;

    // conneciton and playing
    oscN.connect(gainN);
    gainN.connect(audioContext.destination);

    oscN.start();
    oscN.stop(audioContext.currentTime + (.25+playLength));
}