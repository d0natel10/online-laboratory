import React from 'react';
import '../styles/LabPage.css';

const ResultModal = ({ isOpen, onClose, correctAnswers, userAnswers }) => {
    if (!isOpen) return null;

    const totalTasks = correctAnswers.length;
    const correctCount = correctAnswers.filter((correct, index) => {
        const userAnswer = userAnswers[index];
        return Array.isArray(correct)
            ? JSON.stringify(correct.sort()) === JSON.stringify(userAnswer?.sort())
            : correct.toString() === userAnswer?.toString();
    }).length;

    const resultText = correctCount === totalTasks
        ? "Отлично! Все задачи решены правильно!"
        : `Вы решили ${correctCount} из ${totalTasks} задач правильно.`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Результаты теста</h3>
                <p>{resultText}</p>

                <h4>Правильные ответы:</h4>
                <ul>
                    {correctAnswers.map((answer, index) => (
                        <li key={index}>
                            Задача {index + 1}: {Array.isArray(answer) ? answer.join(", ") : answer}
                        </li>
                    ))}
                </ul>

                <h4>Ваши ответы:</h4>
                <ul>
                    {userAnswers.map((answer, index) => (
                        <li key={index}>
                            Задача {index + 1}: {Array.isArray(answer) ? answer.join(", ") : answer || "Нет ответа"}
                        </li>
                    ))}
                </ul>

                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default ResultModal;