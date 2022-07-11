import React, { useEffect, useState } from 'react';

export default function Questions(props) {
  const renderChoices = props.choices.map(choice => (
    <button
      onClick={() => props.select(choice.choiceID, props.questionID)}
      key={choice.choiceID}
      className={choice.selected ? 'choice choice-selected' : 'choice'}
    >
      {choice.answer}
    </button>
  ));

  let finalStyles = {};
  const finalResult = props.choices.map(choice => {
    if (props.answer === choice.answer) {
      finalStyles = {
        backgroundColor: '#94D7A2',
        border: '0.794239px solid #94D7A2 ',
        cursor: 'default',
      };
    } else if (choice.selected) {
      finalStyles = {
        backgroundColor: '#F8BCBC',
        opacity: 0.5,
        border: '0.794239px solid #F8BCBC ',
        cursor: 'default',
      };
    } else {
      finalStyles = {
        backgroundColor: '#fff',
        opacity: 0.5,
        cursor: 'default',
      };
    }
    return (
      <button key={choice.choiceID} className="choice" style={finalStyles}>
        {choice.answer}
      </button>
    );
  });

  return (
    <div className="question-container">
      <h2 className="question">{props.question}</h2>
      <div className="choice-container">
        {props.submitted ? finalResult : renderChoices}
      </div>
    </div>
  );
}
