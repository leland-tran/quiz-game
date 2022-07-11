import React, { useState } from 'react';
import Quiz from './components/Quiz';
import StartQuiz from './components/StartQuiz';
import './styles/style.css';

function App() {
  const [start, setStart] = useState(true);
  return <>{start ? <StartQuiz start={setStart} /> : <Quiz />}</>;
}

export default App;
