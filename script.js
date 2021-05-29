//create start button to intiate the timer
//create an array of questions
//each question is an object with the text of the question, co

const questionArray = [
  {
    textOfQuestion: 'what is a boolean?',
    options: ['a data type', 'a Google', 'a dom object', 'a string'],
    correctAnswer: 'a data type',
  },
  {
    textOfQuestion: 'what goes between the parentheses of a while loop?',
    options: [
      'integers',
      'strings',
      'a conditional statement',
      'a mental condition',
    ],
    correctAnswer: 'a conditional statement',
  },
  {
    textOfQuestion: 'proper for loop syntax is: ',
    options: [
      'for (let i = 0; i < 10; i++)',
      'for (i = 0, i < 10, i++)',
      'for (const i = 0; i < 10; i++)',
      'for (true, false, maybe)',
    ],
    correctAnswer: 'for (let i = 0; i < 10; i++)',
  },
  {
    textOfQuestion: 'an array may contain: ',
    options: ['data types', 'objects', 'strings', 'all of the above'],
    correctAnswer: 'all of the above',
  },
];

//set timer to 2 minutes.
//user clicks on start button, 1st question shows up in questions container, countdown begins
//user clicks on question - message displays confirming correct or incorrect over question content
//if correct, display 'correct! (please click)' in #question, check if there are any more questions to display, then display next question.
//if there are no more questions to display - end quiz and calculate score
//if incorrect, display 'incorrect! (please click)' in #question, subtract time, redisplay question.
//when quiz is ended, wipe question container element and replace with a form element to enter name and save high score
//score displayed next to form element.

let timeLeft = 60;
const countdownEl = document.getElementById('countdown');
countdownEl.textContent = `${timeLeft} seconds left`;

let questionCount = 0;
const startButtonEl = document.getElementById('start-button');
const questionEl = document.getElementById('question');

function startCountdown() {
  const timeInterval = setInterval(handleInterval, 1000);
  function handleInterval() {
    timeLeft--;
    countdownEl.textContent = `${timeLeft} seconds left`;
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }
}

function handleQuestionClick(event) {
  const userChoice = event.target.textContent;
  const correctChoice = questionArray[questionCount].correctAnswer;
  if (userChoice === correctChoice) {
    questionCount++;
    if (questionCount > questionArray.length) {
      endGame();
    }
    startQuestions();
  } else {
    timeLeft = timeLeft - 5;
    startQuestions();
  }
}

function startQuestions() {
  questionEl.textContent = questionArray[questionCount].textOfQuestion;
  for (let i = 0; i < questionArray[questionCount].options.length; i++) {
    let option = document.createElement('li');
    option.textContent = questionArray[questionCount].options[i];
    questionEl.appendChild(option);
    option.addEventListener('click', handleQuestionClick);
  }
}

function handleStartButton(event) {
  startCountdown();
  startButtonEl.remove();
  startQuestions();
}

startButtonEl.addEventListener('click', handleStartButton);
