var welcome = document.querySelector("#Welcome");
var start = document.querySelector("#start-button");
var timer = document.querySelector("#clock");
var answersList = document.querySelector("#answers");
var question = document.querySelector("#question");
var rightWrong = document.querySelector("#right-wrong");
var names = document.querySelector("#names");
var highscores = document.querySelector("#highscores");

rightWrong.style.borderTop = "thin dotted #E1F2FE";
rightWrong.style.color = "#CAFF8A";

var questions = [
  "Hot springs are located all over the world and most promise healing benefits. Which of these hot springs in Iceland actually have a Psoriasis Research Facility?",
  "Guinness brewery in Dublin Ireland is one of the most well known beer brands. But did you know they do not own the land the factory is built on? How long was the lease Arthur Guiness signed?",
  "Depending on where you are in the world, tap water is drinkable. Some countries in Europe have become ambitious and started offering sparkling water taps. Which of these countries have not been that ambitious?",
  "In 2016 Mexico City was inspired and held its first Día de los Muertos parade. Which James Bond movie inspired this change?",
  "Traveling is a favorite pastime of many. Occasionally there are some serious problems. In which of these countries should you be most worried about venomous animals?",
  "Speaking of poisons, which of the following countries do you actually need to worry about stepping on snakes?",
];

var answers = [
  ["Blue lagoon", "Sky lagoon", "Secret lagoon"],
  ["700 years", "6000 years", "9000 years"],
  ["France", "Germany", "Italy"],
  ["Spectre", "The World Is Not Enough", "No Time To Die"],
  ["Madagascar", "Australia", "Chile"],
  ["New Zealand", "Ireland", "United Kingdom"],
];

var correct = [
  "Blue lagoon",
  "9000 years",
  "Germany",
  "Spectre",
  "Australia",
  "United Kingdom",
];

var funFacts = [
  ". Check it out here: https://annaeverywhere.com/reykjavik-blue-lagoon/",
  ". Learn more here: https://www.thevintagenews.com/2017/01/07/arthur-guinness-signed-a-9000-year-lease-for-an-abandoned-brewery-in-dublin-guinness-is-still-brewed-at-st-james-gate/?chrome=1",
  ". More about where sparkling water is available on street taps here: https://slate.com/human-interest/2013/09/sparking-water-fountains-italian-and-french-cities-have-them-can-we.html",
  ". Learn more about the festival here: https://www.theguardian.com/world/2016/oct/29/day-of-the-dead-parade-james-bond-mexico-city",
  ". Learn more about Australia's dangerous animals here: https://theconversation.com/curious-kids-why-do-so-many-dangerous-animals-live-in-australia-139707#:~:text=Australia%20has%20the%20most%20animals,and%20all%20live%20in%20Australia.",
  ". Learn why there are no snakes in Ireland or New Zealand here: https://www.snakesforpets.com/where-are-there-no-snakes-in-the-world/#:~:text=Ireland%2C%20Iceland%2C%20and%20New%20Zealand,have%20a%20huge%20natural%20range."
]

var timeLeft = 160;
var clockInt;
function startClock() {
  timer.textContent = "Time left: " + timeLeft;
  //   document.body.appendChild(timer);

  clockInt = setInterval(function () {
    timeLeft--;
    timer.textContent = "Time left: " + timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 800);
}

function askingQuestions(questionIndex) {
  answersList.replaceChildren();
  question.textContent = questions[questionIndex];
  for (var i = 0; i < 3; i += 1) {
    var list = document.createElement("li");
    list.textContent = answers[questionIndex][i];
    list.addEventListener("click", function () {
      if (event.target.textContent === correct[questionIndex]) {
        rightWrong.textContent = "Correct" + funFacts[questionIndex];
      } else {
        rightWrong.textContent = "Wrong. The correct answer is "+ correct[questionIndex] + funFacts[questionIndex];
        timeLeft -= 5;
        timer.textContent = "Time left: " + timeLeft;
      }
      if (questionIndex === 5) {
        answersList.replaceChildren();
        question.textContent = "";
        endGame();
      } else {
        askingQuestions(questionIndex + 1);
      }
    });
    answersList.appendChild(list);
  }
}

function endGame() {
  names.textContent = " Please enter your name for a high score: ";
  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  names.appendChild(nameInput);
  var saveButton = document.createElement("input");
  saveButton.setAttribute("type", "button");
  saveButton.setAttribute("value", "Save");
  names.appendChild(saveButton);
  saveButton.addEventListener("click", function () {
    var highscore = document.createElement("li");
    highscore.textContent= "High Score: " +nameInput.value + " - " +timeLeft
    highscores.appendChild(highscore)
  });
  clearInterval(clockInt);
}
start.addEventListener("click", function () {
  welcome.style.display = "none";
  startClock();
  askingQuestions(0);
});
