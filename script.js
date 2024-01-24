// Create a new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();

// Create an empty array to store available voices
let voices = [];

// Select the <select> element from the HTML document
let voiceSelect = document.querySelector("select");

// When the list of voices changes, this event handler is called
window.speechSynthesis.onvoiceschanged = () => {
  // Get the list of available voices from the Web Speech API
  voices = window.speechSynthesis.getVoices();
  
  // Set the voice of the SpeechSynthesisUtterance object to the first voice in the list
  speech.voice = voices[0];

  // Populate the <select> element with voice options
  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  );
};

// Add an event listener to the <select> element to change the voice when the user selects a different voice
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Add an event listener to the <button> element to start speaking the text
document.querySelector("button").addEventListener("click", () => {
  // Set the text to be spoken from the content of the <textarea> element
  speech.text = document.querySelector("textarea").value;
  
  // Use the Web Speech API to speak the text
  window.speechSynthesis.speak(speech);
});

document.getElementById('stopButton').addEventListener('click', function() {
  // This will cancel the speech synthesis
  window.speechSynthesis.cancel();