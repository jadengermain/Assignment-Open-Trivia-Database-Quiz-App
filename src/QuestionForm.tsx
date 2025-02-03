import React, { useState, useEffect } from 'react';

const QuestionForm = ({ category, difficulty, userName, onAnswerSubmit, onError }) => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`);
                const data = await response.json();
                if (data.results.length > 0) {
                    setQuestion(data.results[0].question);
                    const correctAnswer = data.results[0].correct_answer;
                    const incorrectAnswers = data.results[0].incorrect_answers;
                    setAnswers([correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5));
                } else {
                    onError('No questions available for the selected category and difficulty.');
                }
            } catch (err) {
                onError('Error fetching question. Please try again.');
            }
        };

        fetchQuestion();
    }, [category, difficulty, onError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedAnswer) {
            setError('Please select an answer.');
            return;
        }
        setError('');
        onAnswerSubmit(selectedAnswer);
    };

    return (
        <div>
            <h2>Question for {userName}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <p dangerouslySetInnerHTML={{ __html: question }} />
                {answers.map((answer, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="radio"
                                value={answer}
                                checked={selectedAnswer === answer}
                                onChange={() => setSelectedAnswer(answer)}
                            />
                            {answer}
                        </label>
                    </div>
                ))}
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    );
};

export default QuestionForm;