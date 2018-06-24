const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const results = document.querySelector(".results");

var timer = [0,0,0,0];

var interval;
var timerRunning = false;

var errorCount = 0;

// variables for WPM
var textEnteredLength = 0;
var timeTook = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if(time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

  // automatically stop the timer to 60 seconds
  if(timer[0] == 1 && timer[1] == 0) {
    clearInterval(interval)
  }
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if(textEntered == originText) { // if everything is correct
    testWrapper.style.borderColor = "green";
    clearInterval(interval); // stop the clock
    textEnteredLength = textEntered.length
    showResults();
  } else {
    if(textEntered == originTextMatch) { // if partially correct
      testWrapper.style.borderColor = "blue";
    } else { // if wrong
      testWrapper.style.borderColor = "orange";
      errorCount++;
      console.log(errorCount)
    }
  }
}

function showResults() {
  timeTook = (timer[0] * 60) + timer[1]

  var wpm = (textEnteredLength) / 5;

  wpm = (wpm * 60) / timeTook;

  wpm = Number((wpm).toFixed(2))

  results.innerHTML = "WPM: " + wpm;
  results.style.visibility = "visible";
}

// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if(textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timerRunning = false;
  timer = [0,0,0,0];

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";

  results.style.visibility = "hidden";
  errorCount = 0;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);

/* TODO
1) Add a WPM
2) Only type for a certain time, not necessarily
   type until everything is typed
3) Add error count
4) Add high score
*/

/*
Word Per Minute Calculation
1) val = (# of characters typed) / 5
2) (val * 60) / time it took
*/
