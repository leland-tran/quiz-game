import React from 'react';
import yellowBlob from './../images/blob-yellow.png';
import blueBlob from './../images/blob-blue.png';

export default function StartQuiz(props) {
  return (
    <main className="start-screen background">
      <img src={yellowBlob} />
      <section className="intro-container">
        <h1>Quizzical</h1>
        <p>Answer questions to test your knowledge!</p>
        <button onClick={() => props.start(false)} className="start-quiz btn">
          Start Quiz
        </button>
      </section>
      <img src={blueBlob} />
    </main>
  );
}
