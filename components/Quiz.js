import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import { nanoid } from 'nanoid';
import yellowBlob from './../images/blob-yellow-small.png';
import blueBlob from './../images/blob-blue-small.png';

export default function Quiz() {
  const [questionAnswers, setQuestionsAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [restartQuiz, setRestartQuiz] = useState(false);

  useEffect(
    () => async () => {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=5&category=18&type=multiple'
      );
      const data = await response.json();
      setQuestionsAnswers(
        data.results.map(quest => ({
          questionID: nanoid(),
          question: decodeHtml(quest.question),
          correctAnswer: decodeHtml(quest.correct_answer),
          choices: shuffleArray([
            quest.correct_answer,
            ...quest.incorrect_answers,
          ]).map(choice => ({
            answer: decodeHtml(choice),
            choiceID: nanoid(),
            selected: false,
          })),
        }))
      );
      setRestartQuiz(false);
    },
    [restartQuiz]
  );

  function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  function selectAnswer(choiceID, questionID) {
    setQuestionsAnswers(prevState =>
      prevState.map(quest => {
        if (quest.questionID === questionID) {
          return {
            ...quest,
            choices: quest.choices.map(choice =>
              choice.choiceID === choiceID
                ? {
                    ...choice,
                    selected: !choice.selected,
                  }
                : {
                    ...choice,
                    selected: choice.selected && false,
                  }
            ),
          };
        } else {
          return quest;
        }
      })
    );
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const randInt = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[randInt];
      arr[randInt] = temp;
    }
    return arr;
  }

  function checkAnswers() {
    const selectedAnswers = questionAnswers.map(quest =>
      quest.choices
        .map(choice => choice.selected && choice.answer)
        .filter(choice => choice)
    );

    const correctAnswers = questionAnswers.map(quest => quest.correctAnswer);

    if (selectedAnswers.flat().length !== 5) {
      console.log('You must answer all 5 questions!');
      return;
    }

    correctAnswers.forEach((answer, i) => {
      if (answer === String(selectedAnswers[i])) {
        setScore(prevScore => prevScore + 1);
      }
    });

    setSubmit(true);
  }

  function playAgain() {
    setRestartQuiz(true);
    setScore(0);
    setSubmit(false);
  }

  const questionList = questionAnswers.map(quest => (
    <Questions
      key={quest.questionID}
      questionID={quest.questionID}
      question={quest.question}
      answer={quest.correctAnswer}
      choices={quest.choices}
      select={selectAnswer}
      submitted={submit}
    />
  ));

  return (
    <main className="start-screen background">
      <img src={yellowBlob} alt="Yellow Triangle" />
      <section className="quiz-container">{questionList}</section>
      <div className="score-check-container">
        {submit && (
          <span className="score">You scored {score}/5 correct answers</span>
        )}
        <button
          onClick={!submit ? checkAnswers : playAgain}
          className="check-answers btn"
        >
          {!submit ? 'Check Answers' : 'Play Again'}
        </button>
      </div>
      <img src={blueBlob} alt="Blue round decoration" />
    </main>
  );
}
