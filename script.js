// Create a new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();

// Create an empty array to store available voices
let voices = [];

// Select the <select> element and the <textarea> from the HTML document
let voiceSelect = document.querySelector("select");
let textArea = document.querySelector("textarea");

// Variables to keep track of speech state
let isSpeaking = false;
let pausedPosition = 0;

// When the list of voices changes, this event handler is called
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0]; // Set to the first voice in the list by default
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

let playButton = document.querySelectorAll("button")[0];
playButton.addEventListener("click", () => {
  if (!isSpeaking || speech.text !== textArea.value) {
    // Set the text to be spoken from the content of the <textarea> element
    speech.text = textArea.value;
    // Start speaking from the saved paused position
    speech.text = speech.text.substring(pausedPosition);
    window.speechSynthesis.speak(speech);
    isSpeaking = true;
  }
});

document.getElementById('stopButton').addEventListener('click', () => {
  if (isSpeaking) {
    // Pause the speech synthesis
    window.speechSynthesis.pause();
    pausedPosition += speech.text.length - textArea.value.length;
    isSpeaking = false;
    document.getElementById('stopButton').textContent = 'Resume';
  } else {
    // Resume the speech synthesis
    window.speechSynthesis.resume();
    isSpeaking = true;
    document.getElementById('stopButton').textContent = 'Stop';
  }
});
