import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/lab1.css";
import axios from 'axios';

const Lab1 = ({ user }) => {
    const navigate = useNavigate();
    const API_URL = 'https://42c36e35c8f14881.mokky.dev';

    const [isFlipped, setIsFlipped] = useState(false);
    const [time, setTime] = useState(0);
    const [calculatedSpeed, setCalculatedSpeed] = useState(0);
    const [tubeDivisions, setTubeDivisions] = useState(4);
    const [ballPosition, setBallPosition] = useState('top');
    const [formData, setFormData] = useState({
        measurements: Array(4).fill().map(() => ({ path: '', time: '', speed: '' })),
        calculation: '',
        conclusion: ''
    });
    const [errors, setErrors] = useState([]);
    const tubeLength = 50;
    const animationDuration = 9;

    const ballRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (ballRef.current) {
            clearInterval(intervalRef.current);
            
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 0.1;
                    if (newTime >= animationDuration) {
                        clearInterval(intervalRef.current);
                        return animationDuration;
                    }

                    const distancePercentage = (newTime / animationDuration) * 100;
                    const actualDistance = (tubeLength / 100) * distancePercentage;
                    const speed = actualDistance / newTime;
                    setCalculatedSpeed(speed.toFixed(2));

                    return newTime;
                });
            }, 100);

            return () => {
                clearInterval(intervalRef.current);
            };
        }
    }, [isFlipped, ballPosition]);

    const handleFlipTube = () => {
        setIsFlipped((prevIsFlipped) => !prevIsFlipped);
        setTime(0);
        setCalculatedSpeed(0);
        setBallPosition(prev => prev === 'top' ? 'bottom' : 'top');
    };

    const handleInputChange = (e, index, field) => {
        const newMeasurements = [...formData.measurements];
        newMeasurements[index][field] = e.target.value;
        setFormData({
            ...formData,
            measurements: newMeasurements
        });
    };

    const handleCalculationChange = (e) => {
        setFormData({
            ...formData,
            calculation: e.target.value
        });
    };

    const handleConclusionChange = (e) => {
        setFormData({
            ...formData,
            conclusion: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = [];
        
        formData.measurements.forEach((row, index) => {
            if (!row.path || !row.time || !row.speed) {
                newErrors.push(`Заполните все поля в строке ${index + 1} таблицы измерений`);
            }
        });
        
        if (!formData.calculation) {
            newErrors.push('Заполните поле с расчетом скорости');
        }
        
        if (!formData.conclusion) {
            newErrors.push('Заполните поле с выводом');
        }
        
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const labData = {
                labId: 1,
                title: "Изучение зависимости пути от времени при прямолинейном равномерном движении",
                measurements: formData.measurements,
                calculation: formData.calculation,
                conclusion: formData.conclusion,
                completedAt: new Date().toISOString()
            };

            const response = await axios.get(`${API_URL}/users/${user.id}`);
            const currentUser = response.data;

            const existingLabIndex = currentUser.completedLabs?.findIndex(lab => lab.labId === 1) ?? -1;

            let updatedLabs = [];
            if (existingLabIndex >= 0) {
                updatedLabs = [...currentUser.completedLabs];
                updatedLabs[existingLabIndex] = labData;
            } else {
                updatedLabs = currentUser.completedLabs 
                    ? [...currentUser.completedLabs, labData] 
                    : [labData];
            }

            await axios.patch(`${API_URL}/users/${user.id}`, {
                completedLabs: updatedLabs
            });

            alert('Лабораторная работа успешно сохранена!');
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
            alert('Произошла ошибка при сохранении работы');
        }
    };

    const handleNext = () => {
        if (window.confirm("Вы уверены, что хотите перейти к следующему этапу? Несохраненные данные будут потеряны.")) {
            navigate(`/lab/${1}`);
        }
    };

    return (
        <div>
            <div className="lab-container">
                <div className="left_column">
                    <div className="instructions">
                        <h3>Методика проведения эксперимента</h3>
                        
                        <div className="instruction-step">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                Расположите стеклянную трубку с водой вертикально и держите её в таком положении до тех пор, 
                                пока стеариновый шарик не поднимется к верхнему концу трубки.
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                Поверните трубку на 180° и определите время, 
                                за которое шарик проходит всю длину трубки.
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                Отметьте маркером половину трубки и убедитесь, что за половину времени движения 
                                шарик проходит половину пути.
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                Разделите трубку на три, а затем на четыре равные части и, проведя опыты, 
                                убедитесь, что за треть и четверть времени шарик проходит соответствующую часть пути.
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                Результаты измерений внесите в таблицу.
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">6</div>
                            <div className="step-content">
                                Самостоятельно измерьте величину скорости движения в каждом случае по формуле:  
                                <div className="formula">v = s/t</div> 
                                Убедитесь, что движение шарика равномерное.
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">7</div>
                            <div className="step-content">
                                Рассчитайте:
                                <ul className="calculations-list">
                                    <li>Абсолютную погрешность измерения скорости</li>
                                    <li>Относительную погрешность измерения скорости</li>
                                </ul>
                            </div>
                        </div>

                        <div className="instruction-step conclusion-step">
                            <div className="step-number">8</div>
                            <div className="step-content">
                                Сделайте вывод о зависимости пути от времени при равномерном прямолинейном движении.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="central_column">
                    <h1 className="central-title1">Лабораторная работа</h1>
                    <h1 className="central-title2">Изучение зависимости пути от времени при прямолинейном равномерном движении</h1>
                    
                    <div className="tube-container">
                        <p>Уровень воды в трубке: {tubeLength} см</p>
                        <div className={`tube ${isFlipped ? 'flipped' : ''}`}>
                            <div className={`water ${isFlipped ? 'water-flipped' : 'water-flipped-top'}`}></div>
                            {[...Array(tubeDivisions)].map((_, i) => (
                                <div
                                    key={i}
                                    className="division"
                                    style={{
                                        top: `${(100 / tubeDivisions) * (tubeDivisions - i)}%`,
                                    }}
                                ></div>
                            ))}
                            <div
                                ref={ballRef}
                                className={`bubble ${ballPosition === 'bottom' ? 'bubble-bottom' : 'bubble-top'}`}
                            ></div>
                        </div>
                    </div>

                    <div className="controls">
                        <label>
                            <input
                                type="radio"
                                checked={tubeDivisions === 2}
                                onChange={() => setTubeDivisions(2)}
                            />
                            <p>Разделить на 2 части</p>
                        </label>
                        <label>
                            <input
                                type="radio"
                                checked={tubeDivisions === 3}
                                onChange={() => setTubeDivisions(3)}
                            />
                            <p>Разделить на 3 части</p>
                        </label>
                        <label>
                            <input
                                type="radio"
                                checked={tubeDivisions === 4}
                                onChange={() => setTubeDivisions(4)}
                            />
                            <p>Разделить на 4 части</p>
                        </label>
                    </div>

                    <div className="controls">
                        <button onClick={handleFlipTube}>Перевернуть трубку</button>
                    </div>

                    <div className="results-table">
                        <h3>Таблица измерений:</h3>
                        {errors.some(e => e.includes('таблицы измерений')) && (
                            <div className="error-message">Заполните все поля в таблице</div>
                        )}
                        <table>
                            <thead>
                                <tr>
                                    <th>№ опыта</th>
                                    <th>Путь в долях от длины</th>
                                    <th>Путь s, м</th>
                                    <th>Время движения t, с</th>
                                    <th>Скорость v, м/с</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.measurements.map((row, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{["1", "½", "⅓", "¼"][index]}</td>
                                        <td>
                                            <input 
                                                type="number" 
                                                value={row.path}
                                                onChange={(e) => handleInputChange(e, index, 'path')}
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                value={row.time}
                                                onChange={(e) => handleInputChange(e, index, 'time')}
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                type="number" 
                                                value={row.speed}
                                                onChange={(e) => handleInputChange(e, index, 'speed')}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="calculations">
                        <h3>Расчеты:</h3>
                        {errors.some(e => e.includes('расчетом скорости')) && (
                            <div className="error-message">Заполните поле с расчетом скорости</div>
                        )}
                        <p>v = s/t = 
                            <input 
                                type="number" 
                                value={formData.calculation}
                                onChange={handleCalculationChange}
                            /> м/с
                        </p>
                    </div>

                    <div className="conclusion">
                        <h3>Вывод:</h3>
                        {errors.some(e => e.includes('выводом')) && (
                            <div className="error-message">Заполните поле с выводом</div>
                        )}
                        <textarea 
                            placeholder="Запишите вывод о зависимости пути от времени при равномерном прямолинейном движении"
                            value={formData.conclusion}
                            onChange={handleConclusionChange}
                        ></textarea>
                    </div>

                    <div className="action-buttons">
                        <button className="save-button" onClick={handleSave}>Сохранить</button>
                    </div>
                </div>
                <div className="results">
                    <h3>Результаты:</h3>
                    <p>Общее время: {time.toFixed(2)} с</p>
                    <p>Пройденное расстояние: {((time / animationDuration) * 100).toFixed(2)}%</p>
                    <p>Скорость: {calculatedSpeed} м/с</p>
                </div>
            </div>
        </div>
    );
};

export default Lab1;