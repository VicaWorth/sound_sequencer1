// represents 'c','d','e','f','g','a','b'
const KEY_ORDER = [0,2,4,5,7,9,11];

// represents a4 
const BASE_FREQ = 440;

let keys = document.querySelectorAll('.key');
let blackKeys = document.querySelectorAll('.key.black');
let whiteKeys = document.querySelectorAll('.key.white');

// eventlistener for mouse click
keys.forEach(key => {
    key.addEventListener('click',()=>playMusic(key));
    console.log(key);
});

//eventlistener for key press using keydown
document.addEventListener('keydown', e => {
    let key = e.key;
    let whiteKeyIndex = WHITE.indexOf(key);
    let blackKeyIndex = BLACK.indexOf(key);

    if (whiteKeyIndex >- 1) playMusic(whiteKeys[whiteKeyIndex]);
    if (blackKeyIndex >- 1) playMusic(blackKeys[blackKeyIndex]);
});


// this function will play audio
async function playMusic(key){
    const audioContext = new AudioContext();
    const osc = audioContext.createOscillator();
    osc.type = 'sine'
    // const audioElement = document.getElementById(key.dataset.note);
    // console.log(Object.getOwnPropertyNames(audioElement));
    // Equation avalible here: https://pages.mtu.edu/~suits/NoteFreqCalcs.html
    // fn = f0 * (a)n
    console.log(BASE_FREQ * Math.pow(1.0594, (key.dataset.note-9)));
    osc.frequency.value = BASE_FREQ * Math.pow(1.0594, (key.dataset.note-9)) ;
    osc.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + .5);
}