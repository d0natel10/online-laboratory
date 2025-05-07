import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Visualization from '../components/labComponents/Visualization';
import TaskDescription from '../components/labComponents/TaskDescription';
import AnswerInput from '../components/labComponents/AnswerInput';
import ResultModal from '../components/ResultModal';
import labsData from '../data/labsData';
import '../styles/LabPage.css';

const LabPage = () => {
    const { id } = useParams();
    const [currentTask, setCurrentTask] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showModal, setShowModal] = useState(false); // Состояние для модального окна
    const lab = labsData[id];

    useEffect(() => {
        const saved = localStorage.getItem(`lab${id}`);
        if (saved) {
            try {
                const state = JSON.parse(saved);
                setCurrentTask(state.currentTask || 0);
                setAnswers(state.answers || Array(lab.tasks.length).fill([]));
            } catch (error) {
                console.error("Ошибка при загрузке данных из localStorage:", error);
            }
        }
    }, [id, lab?.tasks?.length]);

    if (!lab) {
        return <div>Лабораторная работа не найдена</div>;
    }

    const handleAnswerChange = (value) => {
        const newAnswers = [...answers];
        newAnswers[currentTask] = value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentTask < lab.tasks.length - 1) {
            setCurrentTask(currentTask + 1);
            setShowAnswer(false);
        }
    };

    const handleSave = () => {
        const state = { currentTask, answers };
        localStorage.setItem(`lab${id}`, JSON.stringify(state));
        alert("Прогресс сохранен");
    };

    const handleFinish = () => {
        if (!window.confirm("Вы уверены? Незавершенная работа будет отправлена и к ней нельзя будет вернуться.")) return;

        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.href = '/'; 
    };

    const handleShowAnswer = () => {
        if (window.confirm("Если вы покажете ответ, это будет засчитано как ошибка. Продолжить?")) {
            setShowAnswer(true);
            setTimeout(() => {
                handleNext();
            }, 2000);
        }
    };

    const currentTaskData = lab.tasks[currentTask];

    return (
        <div>
            <main>
                <div className="lab-page">
                    <h2>{lab.title}</h2>
                    <div>Чтобы закрепить полученные знания, решите небольшой тест.</div>
                        <div className="lab-content">
                            <Visualization type={lab.visualization} />
                            <TaskDescription
                                taskNumber={currentTask + 1}
                                totalTasks={lab.tasks.length}
                                question={currentTaskData.question}
                            />

                            {currentTaskData.type === "checkbox" ? (
                                <div>
                                    {currentTaskData.options.map((option, index) => (
                                        <label key={index}>
                                            <input
                                                type="checkbox"
                                                value={option}
                                                checked={Array.isArray(answers[currentTask]) && answers[currentTask].includes(option)}
                                                onChange={() => {
                                                    const newAnswers = [...answers];
                                                    const selected = Array.isArray(newAnswers[currentTask]) ? newAnswers[currentTask] : [];

                                                    if (selected.includes(option)) {
                                                        newAnswers[currentTask] = selected.filter((item) => item !== option);
                                                    } else {
                                                        newAnswers[currentTask] = [...selected, option];
                                                    }

                                                    setAnswers(newAnswers);
                                                }}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <AnswerInput
                                    value={answers[currentTask] || ""}
                                    onChange={handleAnswerChange}
                                />
                            )}

                            {showAnswer && (
                                <div className="answer-reveal">
                                    <strong>Правильный ответ:</strong> {currentTaskData.answer}
                                </div>
                            )}

                            <div className="lab-controls">
                                <button onClick={handleNext} disabled={currentTask === lab.tasks.length - 1}>
                                    Далее
                                </button>
                                <button onClick={handleFinish}>Завершить</button>
                                <button onClick={handleShowAnswer}>Показать ответ</button>
                            </div>
                        </div>

                    {/* Модальное окно с результатами */}
                    <ResultModal
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        correctAnswers={lab.tasks.map(task => task.answer)} // Правильные ответы
                        userAnswers={answers} // Ответы пользователя
                    />
                </div>
            </main>
        </div>
    );
};

export default LabPage;