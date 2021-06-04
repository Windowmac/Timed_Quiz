//array of questions for user to answer
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
  {
    textOfQuestion: 'DOM stands for: ',
    options: [
      'Document Of More(info)',
      'Document Object Model',
      'Document Or Model',
      'Dominant Office Model',
    ],
    correctAnswer: 'Document Object Model',
  },
  {
    textOfQuestion: 'True/False: JQuery is an extension to JavaScript',
    options: ['True', 'False'],
    correctAnswer: 'True',
  },
  {
    textOfQuestion:
      'True/False: valid variable initialization needs to contain "let", "const", or "var" at the beginning of the statement',
    options: ['True', 'False'],
    correctAnswer: 'True',
  },
  {
    textOfQuestion: 'To create an array of numbers: ',
    options: [
      'const numArray = [1, 2, 3];',
      'let numArray = [1, 2, 3];',
      'const numArray = [1, 2, "33", "4"];',
      'const number array = 1, 2, 3;',
      'var . = {...one, two, three}',
    ],
    correctAnswer: 'const numArray = [1, 2, 3];',
  },
];

//set timer to 80 seconds.
//user clicks on start button, 1st question shows up in questions container, countdown begins
//user clicks on question answer - message displays confirming correct or incorrect over question content
//if correct, display 'correct! next question' in #question, check if there are any more questions to display, then display next question.
//if there are no more questions to display - end quiz and calculate score
//if incorrect, display 'incorrect! repeat question' in #question, subtract time, redisplay question.
//when quiz is ended, wipe question container element and replace with a form element to enter name and save high score
//'congratulations! score is: ' displayed.
//display user's local storage top 3 scores.

let timeLeft = 80;
const countdownEl = document.getElementById('countdown');
countdownEl.textContent = `${timeLeft} seconds left`;

let questionCount = 0;
const startButtonEl = document.getElementById('start-button');
const questionEl = document.getElementById('question');

const colorTextEl = document.getElementById('color-text');
const announcementEl = document.getElementById('announcement');
const containerEl = document.getElementById('question-container');
const listItems = document.getElementsByTagName('li');

//remove start button, replace text content, start countdown, start questions
function handleStartButton(event) {
  startCountdown();
  startButtonEl.remove();
  document.getElementById('title').remove();
  announcementEl.textContent = 'Go!';

  //start countdown using handleInterval, if not already endGame when timer ends, start endGame
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

  //check if question count is valid
  //if not, endGame
  //if so, display question at question count
  //create li of answers for question
  //append li to question element, add click event
  function startQuestions() {
    if (questionArray[questionCount]) {
      questionEl.textContent = questionArray[questionCount].textOfQuestion;
      for (let i = 0; i < questionArray[questionCount].options.length; i++) {
        let option = document.createElement('li');
        option.classList.add('good-btn');
        option.textContent = questionArray[questionCount].options[i];
        questionEl.appendChild(option);
        option.addEventListener('click', handleQuestionClick);

        //check question count, if greater than question array, endGame
        //create a variabe of the user's choice they clicked
        //create a variable of the correct answer
        //compare the choice against the correct answer
        //if correct - write 'correct' with blue text, increase question count, change text content to 'next question: '
        //restart questions
        //if incorrect - write 'incorrect' in red text, change text content to 'repeat question: ', decrease time left by 5
        //restart questions
        function handleQuestionClick(event) {
          if (questionCount > questionArray.length - 1) {
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
            timeLeft -= 5;
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

  //check timer, multiply by 100 to find score. if timer is negative, set score to 0.
  //remove countdown element
  //write 'congratulations!' in green text, 'your score is' and the user's score
  //remove question element
  //replace with form element
  function endGame(timeLeft) {
    let score = timeLeft * 100;
    if (score < 0) {
      score = 0;
    }

    countdownEl.remove();

    colorTextEl.textContent = 'Congratulations! ';
    colorTextEl.style.color = 'green';
    announcementEl.textContent = 'your score is: ' + score;

    questionEl.remove();

    handleForm();

    //create a form input element with a name of initials and placeholder text of 'enter initials here'
    //place a submit button just to the right of the form input
    function handleForm() {
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
      //if scores are present, pull the high-scores string to an array, separated at comma (,)
      //for each item in the highScores array check if new score is larger -
      //if so, splice at location and pop off the score at the end of the array if the array length is greater than 3
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
        scoresList.textContent = 'Top Scores: ';
        scoresList.style.fontSize = '35px';

        handleHighScorePlacement();

        //create a placeholder for the purpose of checking score placement - so the loop won't recheck the same score again if unshifted
        //loop through each item of the scores array and compare the user's score with each top score.
        //if the user's score is greater than any of the top scores && the user's score does not match the placeholder - splice at location
        //create a variable to hold the length of the highscores array at the start of the loop - as the array may grow in length during looping
        //pop off scores at the end of the array
        //be sure to update name array every time you change scores array
        //write list to dom as an ordered list displaying user's name and score
        //save new highscore and name arrays to user storage
        function handleHighScorePlacement() {
          const scoresCount = highScores.length;
          let placeholder = 0;
          for (i = 0; i < scoresCount; i++) {
            if (
              parseInt(score) > parseInt(highScores[i]) &&
              highScores[i] !== placeholder
            ) {
              placeholder = highScores[i];
              console.log(placeholder);
              highScores.splice(i, 0, score);
              names.splice(i, 0, playerName);
            }
            if (highScores.length < 3 && score !== highScores[i]) {
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
        }

        makeEndgameButtons();

        //create a clear storage button which will clear user local storage
        //create a retry button which refreshes the page with a location reload
        function makeEndgameButtons() {
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
}

startButtonEl.addEventListener('click', handleStartButton);
