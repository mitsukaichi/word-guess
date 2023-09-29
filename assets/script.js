// Start the game with the start button click
var startButton = document.getElementById("start");
var userInput = document.getElementById("word-blanks");
var winCount = document.getElementById("win-count");
var lossCount = document.getElementById("loss-count");
var lossMsg = document.getElementById("loss-msg");
var winMsg = document.getElementById("win-msg");

var word = "";
var inputField = [];
var wordArray = [];
var gameStatus = false;

if (localStorage.getItem("wincount") !== null){
    win = parseInt(localStorage.getItem("wincount"));
} else{
    win = 0;
};

if (localStorage.getItem("losscount") !== null){
    loss = parseInt(localStorage.getItem("losscount"));
} else{
    loss = 0;
};

winCount.textContent = win;
lossCount.textContent = loss;

startButton.addEventListener("click",function(){
    startTimer();
    startGame();
    gameStatus = true;
    winMsg.setAttribute("class","hidden");
    lossMsg.setAttribute("class","hidden");
});

// count down the remaining time 
var remainingTime = document.querySelector("#timer");
var timeCount = 60;

function startTimer() {
    timeCount = 60;
    var timerInterval = setInterval(function() {
    timeCount--;
    remainingTime.textContent = timeCount;
    if(timeCount === 0) {
      clearInterval(timerInterval);
      timeOut();
      gameStatus = false;
    };
    if(gameStatus === false) {
        clearInterval(timerInterval);
      };
 }, 1000);
};

// switch to the screen that shows the total win / loss after timeout
function timeOut() {
    lossMsg.setAttribute("class","displayed");
    loss++;
    lossCount.textContent = loss;
    localStorage.setItem("losscount",loss);
};

// start the game
function startGame() {
    inputField = [];
    wordArray = [];
    word = wordsList[Math.floor(Math.random() * wordsList.length)];
    for (i = 0; i < word.length; i ++){
        inputField.push("_");
    };
    for (i = 0; i < word.length; i ++){
        wordArray.push(word.charAt(i));
    };
    userInput.textContent = inputField.join(" ");
};

// list of words to guess
var wordsList = ["cat","dog","tea","lucky","yeast","key","want","main","primal","scream","get","most","game","word","normal"]

// Check if the pressed key matches is contained in the selected word or not 

document.addEventListener("keydown", function(event){
    var keyPress = event.key;
    if (wordArray.includes(keyPress)){
        var wordLocation = wordArray.indexOf(keyPress);
        inputField[wordLocation] = wordArray[wordLocation];
        userInput.textContent = inputField.join(" ");
        console.log(inputField);
        console.log(wordArray);
        console.log(inputField === wordArray);
    };
    if (!inputField.includes("_")){
        winMsg.setAttribute("class","displayed");
        win++;
        winCount.textContent = win;
        gameStatus = false;
        localStorage.setItem("wincount",win);
    };
});