// script.js


let timeLeft = 180; // 3 minutes in seconds
let timerInterval;
let currentClue = 1;
const totalClues = 4;
let missionActive = false; // Track if the mission has started


const bgMusic = document.getElementById('bg-music');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');


function startMission() {
 if (!missionActive) {
 missionActive = true;
 document.getElementById('mission-briefing').style.display = 'none';
 bgMusic.play();
 startTimer();
 showClue(currentClue);


 // Show the countdown and progress tracker
 document.getElementById('countdown').style.display = 'block';
 document.getElementById('progress-tracker').style.display = 'block';
 }
}


function startTimer() {
 timerInterval = setInterval(function() {
 if (missionActive) { // Only decrement if the mission is active
 timeLeft--;
 let minutes = Math.floor(timeLeft / 60);
 let seconds = timeLeft % 60;


 minutes = minutes < 10 ? "0" + minutes : minutes;
 seconds = seconds < 10 ? "0" + seconds : seconds;


 document.getElementById('timer').innerText = minutes + ":" + seconds;


 if (timeLeft <= 0) {
 clearInterval(timerInterval);
 document.getElementById('timer').innerText = "00:00";
 missionFailed();
 }
 }
 }, 1000);
}


function checkPuzzleCode() {
 if (missionActive) {
 const code = document.getElementById('puzzle-code').value;
 if (code === 'SPY') {
 correctSound.play();
 alert('Correct! Moving to the next clue.');
 currentClue++;
 updateClue();
 } else {
 wrongSound.play();
 alert('Incorrect code. Try again.');
 }
 }
}


function checkPigpen() {
 if (missionActive) {
 const message = document.getElementById('pigpen-input').value;
 if (message.toLowerCase() === 'secret') {
 correctSound.play();
 alert('Correct! You decoded the message.');
 currentClue++;
 updateClue();
 } else {
 wrongSound.play();
 alert('Incorrect message. Try again.');
 }
 }
}


function checkAnagram() {
 if (missionActive) {
 const city = document.getElementById('anagram-input').value;
 if (city.toLowerCase() === 'london') {
 correctSound.play();
 alert('Correct! The city is London.');
 currentClue++;
 updateClue();
 } else {
 wrongSound.play();
 alert('Incorrect city. Try again.');
 }
 }
}


function checkFinalKey() {
 if (missionActive) {
 const key = document.getElementById('final-key').value;
 if (key.toLowerCase() === 'jamesbond') {
 correctSound.play();
 missionAccomplished();
 } else {
 wrongSound.play();
 alert('Incorrect key. Try again.');
 }
 }
}


function updateClue() {
 if (missionActive) {
 if (currentClue <= totalClues) {
 showClue(currentClue);
 document.getElementById('progress').innerText = `Clue ${currentClue} of ${totalClues}`;
 } else {
 missionAccomplished();
 }
 }
}


function showClue(clueNumber) {
 if (missionActive) {
 // Hide all clue containers
 for (let i = 1; i <= totalClues; i++) {
 const clueContainer = document.getElementById(`clue-container-${i}`);
 if (clueContainer) {
 clueContainer.style.display = 'none';
 } else {
 console.error(`Clue container with ID 'clue-container-${i}' not found.`);
 }
 }


 // Show the current clue container
 const currentClueContainer = document.getElementById(`clue-container-${clueNumber}`);
 if (currentClueContainer) {
 currentClueContainer.style.display = 'block';
 } else {
 console.error(`Clue container with ID 'clue-container-${clueNumber}' not found.`);
 }
 }
}


function hideAllClues() {
 for (let i = 1; i <= totalClues; i++) {
 const clueContainer = document.getElementById(`clue-container-${i}`);
 if (clueContainer) {
 clueContainer.style.display = 'none';
 } else {
 console.error(`Clue container with ID 'clue-container-${i}' not found.`);
 }
 }
 // Hide the countdown and progress tracker
 document.getElementById('countdown').style.display = 'none';
 document.getElementById('progress-tracker').style.display = 'none';
}


function missionAccomplished() {
 alert('Congratulations! You completed all the clues!');
 clearInterval(timerInterval);
 bgMusic.pause();
 missionActive = false; // Reset mission state
}


function missionFailed() {
 document.body.style.backgroundColor = 'black'; // Set background to black
 document.body.innerHTML = `<div id="game-over" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: black; color: #ff0000; font-size: 5em; text-align: center; justify-content: center; align-items: center; z-index: 1000; flex-direction: column;">
 <span style="font-family: 'Bangers', cursive; text-shadow: 2px 2px 4px #000;">Game Over</span>
 </div>`; // Replace content with Game Over message
 bgMusic.pause();
 missionActive = false; // Reset mission state
}


// Call hideAllClues when the page loads
window.onload = hideAllClues;
