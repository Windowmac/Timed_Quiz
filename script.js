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
        option.classList.add('good-btn');
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
      submitEl.classList.add('danger-btn');
      submitEl.textContent = 'Submit';
      containerEl.appendChild(inputEl);
      containerEl.appendChild(submitEl);

      submitEl.addEventListener('click', handleSubmit);

      //check if high-scores are present in local storage
      //if not, create a new local storage key named high-scores and save the new score
      //also save the new player name in a separate local storage key named 'name'
      //if so, save the high-scores string to an array, broken up at comma space (, )
      //for each item in the highScores array check if new score is larger -
      //if so, unshift at location and delete array at the end if greater than length of 3
      //save new scores to local storage as a string
      //display scores and names as an ordered list

      function handleSubmit(event) {
        event.preventDefault();
        const playerName = inputEl.value;
        const scoresList = document.createElement('ol');
        score = score.toString();

        if (!localStorage.getItem('high-scores')) {
          localStorage.setItem('high-scores', score);
          localStorage.setItem('name', playerName);
        }

        let highScores = localStorage.getItem('high-scores');
        highScores = highScores.split(',');
        let names = localStorage.getItem('name');
        names = names.split(',');
        containerEl.append(scoresList);
        scoresList.textContent = 'High Scores: ';
        scoresList.style.fontSize = '35px';

        scoresCount = highScores.length;
        let placeholder = 0;
        for (i = 0; i < scoresCount; i++) {
          if (
            parseInt(score) > parseInt(highScores[i]) &&
            highScores[i] !== placeholder
          ) {
            console.log(highScores[i]);
            console.log(score);
            console.log(placeholder);
            placeholder = highScores[i];
            console.log(placeholder);
            highScores.splice(i, 0, score);
            names.splice(i, 0, playerName);
          }
          if (highScores.length < 3 && score !== highScores[i]) {
            console.log('hello from here');
            highScores.push(score);
            names.push(playerName);
          }
        }

        while (highScores.length > 3) {
          highScores.pop();
          names.pop();
        }

        for (let i = 0; i < highScores.length; i++) {
          const listEl = document.createElement('li');
          listEl.textContent = `${names[i]}      ......................      Score: ${highScores[i]}`;
          listEl.classList.add('score-li');
          scoresList.appendChild(listEl);
        }

        highScores = highScores.toString();
        names = names.toString();
        localStorage.setItem('high-scores', highScores);
        localStorage.setItem('name', names);
        document.querySelector('#initials-input').remove();
        event.target.remove();

        const clearStorageBtn = document.createElement('btn');
        clearStorageBtn.id = 'clear-storage';
        clearStorageBtn.classList.add('danger-btn');
        clearStorageBtn.textContent = 'Clear Scores';
        clearStorageBtn.addEventListener('click', handleClearStorage);

        const retryBtn = document.createElement('btn');
        retryBtn.id = 'retry';
        retryBtn.classList.add('danger-btn');
        retryBtn.textContent = 'Retry';
        retryBtn.addEventListener('click', handleRetry);

        document.body.appendChild(retryBtn);
        document.body.appendChild(clearStorageBtn);

        function handleClearStorage(event) {
          localStorage.clear();
          scoresList.remove();
        }

        function handleRetry(event) {
          location.reload();
        }
      }
    }
  }
}

startButtonEl.addEventListener('click', handleStartButton);
