import React, { useState } from 'react';

const HomePage = ({ onStartQuiz }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        category: '',
        difficulty: ''
    });
    const [error, setError] = useState('');

    const categories = [
        { value: '9', label: 'General Knowledge' },
        { value: '18', label: 'Science: Computers' },
        { value: '21', label: 'Sports' },
        { value: '22', label: 'Geography' }
    ];

    const difficulties = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, category, difficulty } = formData;

        if (!firstName || !category || !difficulty) {
            setError('All fields are required.');
            return;
        }

        setError('');
        onStartQuiz(formData);
    };

    return (
        <div className="home-page">
            <h1>Welcome to the Quiz App!</h1>
            <h2>Quiz Time!</h2>
            <p>Please fill out the form below to start the quiz.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Question Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="difficulty">Question Difficulty:</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="">Select difficulty</option>
                        {difficulties.map((diff) => (
                            <option key={diff.value} value={diff.value}>
                                {diff.label}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
};

export default HomePage;