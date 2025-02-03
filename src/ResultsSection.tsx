import React from 'react';

interface ResultsSectionProps {
    userName: string;
    isCorrect: boolean;
    correctAnswer: string;
    onRestart: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ userName, isCorrect, correctAnswer, onRestart }) => {
    return (
        <div className="results-section">
            <h2>Results</h2>
            <p>{`${userName}, you answered the question ${isCorrect ? 'correctly!' : 'incorrectly.'}`}</p>
            {!isCorrect && <p>{`The correct answer was: ${correctAnswer}`}</p>}
            <button onClick={onRestart}>Start Over</button>
        </div>
    );
};

export default ResultsSection;