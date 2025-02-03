import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import ResultsSection from './components/ResultsSection';

const App = () => {
    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [question, setQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleStartQuiz = (name, selectedCategory, selectedDifficulty) => {
        setUserName(name);
        setCategory(selectedCategory);
        setDifficulty(selectedDifficulty);
        fetchQuestion(selectedCategory, selectedDifficulty);
    };

    const fetchQuestion = async (selectedCategory, selectedDifficulty) => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`);
            const data = await response.json();
            setQuestion(data.results[0]);
            setIsSubmitted(false);
            setUserAnswer('');
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleAnswerSubmit = (answer) => {
        setUserAnswer(answer);
        setIsSubmitted(true);
        setIsCorrect(answer === question.correct_answer);
        setCorrectAnswer(question.correct_answer);
    };

    const handleRestart = () => {
        setUserName('');
        setCategory('');
        setDifficulty('');
        setQuestion(null);
        setUserAnswer('');
        setIsSubmitted(false);
        setIsCorrect(null);
        setCorrectAnswer('');
    };

    return (
        <div className="App">
            {!userName ? (
                <HomePage onStartQuiz={handleStartQuiz} />
            ) : isSubmitted === false && question ? (
                <QuestionForm question={question} onAnswerSubmit={handleAnswerSubmit} />
            ) : isSubmitted ? (
                <ResultsSection 
                    userName={userName} 
                    isCorrect={isCorrect} 
                    correctAnswer={correctAnswer} 
                    onRestart={handleRestart} 
                />
            ) : null}
        </div>
    );
};

export default App;