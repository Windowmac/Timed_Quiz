//create start button to intiate the timer
//create an array of questions
//each question is an object with the text of the question, co

const questionArray = [
  {
    textOfQuestion: 'what is a boolean?',
    options: ['a data type', 'a Google', 'a dom object', 'a string'],
    correctAnswer: 0,
  },
  {
    textOfQuestion: 'what goes between the parentheses of a while loop?',
    options: [
      'integers',
      'strings',
      'a conditional statement',
      'a mental condition',
    ],
    correctAnswer: 2,
  },
  {
    textOfQuestion: 'proper for loop syntax is: ',
    options: [
      'for (let i = 0; i < 10; i++)',
      'for (i = 0, i < 10, i++)',
      'for (const i = 0; i < 10; i++)',
      'for (true, false, maybe)',
    ],
    correctAnswer: 0,
  },
  {
    textOfQuestion: 'an array may contain: ',
    options: ['data types', 'objects', 'strings', 'all of the above'],
    correctAnswer: 3,
  },
];

console.log(questionArray);
