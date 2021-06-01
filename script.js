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

//set timer to 60 seconds.
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

const colorTextEl = document.getElementById('color-text');
const announcementEl = document.getElementById('announcement');
const containerEl = document.getElementById('question-container');
const listItems = document.getElementsByTagName('li');

function handleStartButton(event) {
  startCountdown();
  startButtonEl.remove();
  document.getElementById('title').remove();
  announcementEl.textContent = 'Go!';

  function startCountdown() {
    const timeInterval = setInterval(handleInterval, 1000);
    function handleInterval() {
      timeLeft--;
      countdownEl.textContent = `${timeLeft} seconds left`;
      if (timeLeft <= 0) {
        clearInterval(timeInterval);
        if (questionCount < questionArray.length) {
          endGame(timeLeft);
        }
      }
    }
  }
  startQuestions();

  function startQuestions() {
    if (questionArray[questionCount]) {
      questionEl.textContent = questionArray[questionCount].textOfQuestion;
      for (let i = 0; i < questionArray[questionCount].options.length; i++) {
        let option = document.createElement('li');
        option.textContent = questionArray[questionCount].options[i];
        questionEl.appendChild(option);
        option.addEventListener('click', handleQuestionClick);

        function handleQuestionClick(event) {
          if (questionCount > questionArray.length - 1 || timeLeft <= 0) {
            endGame(timeLeft);
          }

          const userChoice = event.target.textContent;
          const correctChoice = questionArray[questionCount].correctAnswer;

          if (userChoice === correctChoice) {
            questionCount++;
            colorTextEl.textContent = 'Correct! ';
            colorTextEl.style.color = 'blue';
            announcementEl.textContent = 'Next question: ';
            startQuestions();
          } else {
            timeLeft = timeLeft - 5;
            colorTextEl.textContent = 'Incorrect! ';
            colorTextEl.style.color = 'red';
            announcementEl.textContent = '-5 seconds, repeat question: ';
            startQuestions();
          }
        }
      }
    } else {
      endGame(timeLeft);
    }
  }
  function endGame(timeLeft) {
    let score = timeLeft * 100;
    if (score < 0) {
      score = 0;
    }

    countdownEl.remove();

    colorTextEl.textContent = 'Congratulations!';
    colorTextEl.style.color = 'green';
    announcementEl.textContent = 'your score is: ' + score;

    questionEl.remove();
    //add in form element for initials
    handleForm();
    function handleForm() {
      //create a form input element with a name of initials and placeholder text of 'enter initials here'
      //place a submit button just to the right of the form input
      const inputEl = document.createElement('input');
      inputEl.placeholder = 'Enter your initials here';
      inputEl.name = 'initials';
      inputEl.id = 'initials-input';
      const submitEl = document.createElement('btn');
      submitEl.id = 'submit';
      submitEl.textContent = 'Submit';
      containerEl.appendChild(inputEl);
      containerEl.appendChild(submitEl);

      submitEl.addEventListener('click', handleSubmit);

      function handleSubmit(event) {
        event.preventDefault();
        const playerName = inputEl.value;
        console.log(playerName);
        score = score.toString();
        if (!localStorage.getItem('high-score')) {
          localStorage.setItem('high-score', score);
        }
        if (!localStorage.getItem('name')) {
          localStorage.setItem('name', playerName);
        }
        let highScore = localStorage.getItem('high-score');

        if (parseInt(score) > parseInt(highScore)) {
          highScore = score;
          highScore = highScore.toString();
          localStorage.setItem('name', playerName);
          localStorage.setItem('high-score', highScore);
        }
        const scoreListName = document.createElement('h2');
        const scoreListScore = document.createElement('h2');
        scoreListName.textContent = `Top attempt: ${localStorage.getItem(
          'name'
        )}`;
        scoreListScore.textContent = `High score: ${localStorage.getItem(
          'high-score'
        )}`;

        document.body.appendChild(scoreListName);
        document.body.appendChild(scoreListScore);
        document.querySelector('#initials-input').remove();
        event.target.remove();
      }
    }
  }
}

startButtonEl.addEventListener('click', handleStartButton);
