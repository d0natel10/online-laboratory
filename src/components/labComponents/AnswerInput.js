import React from 'react';

const AnswerInput = ({ value, onChange }) => {
    return (
        <div className="answer-input">
            <label htmlFor="answer">Введите ответ:</label>
            <input
                type="text"
                id="answer"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Введите ваш ответ"
            />
        </div>
    );
};

export default AnswerInput;