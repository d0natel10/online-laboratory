import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/lab3.css';
import axios from 'axios';

const Lab3 = ({ user }) => {
  const navigate = useNavigate();
  const API_URL = 'https://42c36e35c8f14881.mokky.dev';

  const [measurements, setMeasurements] = useState([
    { length: '', time: '', oscillations: '' }
  ]);
  const [results, setResults] = useState({
    period: '',
    acceleration: ''
  });
  const [conclusion, setConclusion] = useState('');
  const [errors, setErrors] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [angle, setAngle] = useState(10); // в градусах
  const [ropeLength, setRopeLength] = useState(150); // в пикселях

  const handleInputChange = (index, field, value) => {
    const newMeasurements = [...measurements];
    newMeasurements[index][field] = value;
    setMeasurements(newMeasurements);
  };

  const calculateResults = () => {
    const L = parseFloat(measurements[0].length);
    const T = parseFloat(measurements[0].time) / parseFloat(measurements[0].oscillations);
    
    const g = (4 * Math.PI ** 2 * L) / T ** 2;

    setResults({
      period: T.toFixed(4),
      acceleration: g.toFixed(4)
    });
  };

  const validateForm = () => {
    const newErrors = [];
    
    measurements.forEach((row, index) => {
      if (!row.length || !row.time || !row.oscillations) {
        newErrors.push(`Заполните все поля в строке ${index + 1} таблицы измерений`);
      }
    });
    
    if (!results.period || !results.acceleration) {
      newErrors.push('Выполните расчеты перед сохранением');
    }
    
    if (!conclusion) {
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
        labId: 3,
        title: "Исследование ускорения свободного падения",
        measurements: measurements,
        calculations: {
          period: results.period,
          acceleration: results.acceleration
        },
        conclusion: conclusion,
        completedAt: new Date().toISOString()
      };

      const response = await axios.get(`${API_URL}/users/${user.id}`);
      const currentUser = response.data;

      const existingLabIndex = currentUser.completedLabs?.findIndex(lab => lab.labId === 3) ?? -1;

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

  const handleStart = () => {
    setIsAnimating(true);
  }

  const handleStop = () => {
    setIsAnimating(false);
  }

  return (
    <div className="lab-container">
      <div className="left_column">
        <div className="instructions">
          <h3>Методика проведения эксперимента</h3>
          
          <div className="instruction-step">
            <div className="step-number">1</div>
            <div className="step-content">
              Измерьте длину нити маятника с помощью линейки.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              Отклоните маятник на небольшой угол (5-10°) и отпустите.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              Измерьте время 20-30 полных колебаний маятника.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">4</div>
            <div className="step-content">
              Рассчитайте период колебаний по формуле:
              <div className="formula">T = t/N</div>
              где t - время колебаний, N - число колебаний
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">5</div>
            <div className="step-content">
              Рассчитайте ускорение свободного падения по формуле:
              <div className="formula">g = 4π²L/T²</div>
              где L - длина нити, T - период колебаний
            </div>
          </div>

          <div className="instruction-step conclusion-step">
            <div className="step-number">6</div>
            <div className="step-content">
              Сравните полученное значение g с табличным (9.81 м/с²) и сделайте вывод.
            </div>
          </div>
        </div>
      </div>
      
      <div className="lab3__central_column">
        <div className="lab3">
          <header className="lab3__header">
            <h1 className="lab3__header-title">
              Лабораторная работа
            </h1>
            <h2 className="lab3__header-description">
              Исследование ускорения свободного падения
            </h2>
            <section className="lab3__container">
              <div className="lab3__experement">
                <div className="lab3__experement-gorizontalPlane"></div>
                <div className="lab3__experement-togForNitka"></div>
                <div className="lab3__experement-togForPlane"></div>
                <div className="lab3__experement-verticalPlane"></div>
                <div className="lab3__experement-base"></div>
                <div 
                        className="lab3__experement-pendulum"
                        style={{
                          animation: isAnimating ? `swing 2s infinite ease-in-out` : 'none',
                          '--angle': `${angle}deg`
                        }}
                      >
                    <div 
                      className="lab3__experement-nitka"
                    ></div>
                    <div 
                      className="lab3__experement-ball"
                    ></div>
                  </div>

              </div>
              <div className="lab3__table"></div>
            </section>
          </header>
        </div>
        <div className="lab3__controls">
        <label>
          Угол отклонения (°):
          <input 
            type="number" 
            value={angle} 
            onChange={(e) => setAngle(parseFloat(e.target.value) || 0)} 
            min="1" max="45"
          />
        </label>
        <button 
        className="lab3__button"
         onClick={() => setIsAnimating(prev => !prev)}
        >{isAnimating ? 'Остановить' : 'Начать'}
        </button>
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
                <th>Длина нити L, м</th>
                <th>Время t, с</th>
                <th>Число колебаний N</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><input type="number" value={row.length} onChange={(e) => handleInputChange(index, 'length', e.target.value)} /></td>
                  <td><input type="number" value={row.time} onChange={(e) => handleInputChange(index, 'time', e.target.value)} /></td>
                  <td><input type="number" value={row.oscillations} onChange={(e) => handleInputChange(index, 'oscillations', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="calculations">
          <h3>Расчеты:</h3>
          {errors.some(e => e.includes('расчеты')) && (
            <div className="error-message">Выполните расчеты перед сохранением</div>
          )}
          <p>Период колебаний: T = t/N = <input type="number" value={results.period} /> с</p>
          <p>Ускорение свободного падения: g = <input type="number" value={results.acceleration} /> м/с²</p>
        </div>
        
        <div className="conclusion">
          <h3>Вывод:</h3>
          {errors.some(e => e.includes('выводом')) && (
            <div className="error-message">Заполните поле с выводом</div>
          )}
          <textarea 
            placeholder="Сравните полученное значение ускорения свободного падения с табличным (9.81 м/с²) и проанализируйте возможные источники погрешностей"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
          ></textarea>
        </div>
        
        <div className="action-buttons">
          <button className="calculate-button" onClick={calculateResults}>Рассчитать</button>
          <button className="save-button" onClick={handleSave}>Сохранить</button>
        </div>
      </div>
      
      <div className="results">
        <h3>Результаты:</h3>
        <p>Табличное значение ускорения: g = 9.81 м/с²</p>
        <p>Экспериментальное значение: g = {results.acceleration || '-'} м/с²</p>
        <p>Погрешность: {results.acceleration ? Math.abs(((parseFloat(results.acceleration) - 9.81)/9.81 * 100).toFixed(2)) : '-'}%</p>
      </div>
    </div>
  );
};

export default Lab3; 