import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/lab5.css";

const Lab5 = () => {
  const navigate = useNavigate();
  const [measurements, setMeasurements] = useState([
    { radius: '', time: '', turns: '', height: '', force: '' }
  ]);
  const [results, setResults] = useState({
    acceleration1: '',
    acceleration2: '',
    acceleration3: ''
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const angleRef = useRef(0);
  const speedRef = useRef(0.05);

  const handleInputChange = (index, field, value) => {
    const newMeasurements = [...measurements];
    newMeasurements[index][field] = value;
    setMeasurements(newMeasurements);
  };

  const animate = () => {
    angleRef.current += speedRef.current;
    const nitka = document.querySelector('.lab5__nitka');
    if (nitka) {
      nitka.style.transform = `rotate(${angleRef.current}deg)`;
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleStartAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      animationRef.current = requestAnimationFrame(animate);
    }
  };
  
  const handleStopAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
  

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const calculateResults = () => {
    // Пример расчетов (реальные формулы должны быть реализованы)
    const R = parseFloat(measurements[0].radius);
    const T = parseFloat(measurements[0].time) / parseFloat(measurements[0].turns);
    const h = parseFloat(measurements[0].height);
    const F = parseFloat(measurements[0].force);
    const m = 0.1; // пример массы шарика

    const acceleration1 = (4 * Math.PI ** 2 * R) / T ** 2;
    const acceleration2 = (9.8 * R) / h;
    const acceleration3 = F / m;

    setResults({
      acceleration1: acceleration1.toFixed(4),
      acceleration2: acceleration2.toFixed(4),
      acceleration3: acceleration3.toFixed(4)
    });
  };

  const handleNext = () => {
    if (window.confirm("Вы уверены, что хотите перейти к следующему этапу?")) {
      navigate(`/lab/${5}`);
    }
  };

  return (
    <div className="lab-container">
      <div className="left_column">
        <div className="instructions">
          <h3>Методика проведения эксперимента</h3>
          
          <div className="instruction-step">
            <div className="step-number">1</div>
            <div className="step-content">
              Определите массу шарика на весах с точностью до 1 г.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              Проденьте нить через отверстие в пробке и зажмите пробку в лапке штатива.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              Начертите на листе бумаги окружность радиусом около 20 см и измерьте радиус.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">4</div>
            <div className="step-content">
              Расположите штатив так, чтобы продолжение нити проходило через центр окружности.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">5</div>
            <div className="step-content">
              Вращайте маятник так, чтобы шарик описывал начерченную окружность.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">6</div>
            <div className="step-content">
              Измерьте время заданного числа оборотов (30-60).
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">7</div>
            <div className="step-content">
              Измерьте высоту маятника (расстояние от центра шарика до точки подвеса).
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">8</div>
            <div className="step-content">
              Рассчитайте центростремительное ускорение тремя способами:
              <div className="formula">a₁ = 4π²R/T²</div>
              <div className="formula">a₂ = gR/h</div>
              <div className="formula">a₃ = F/m</div>
            </div>
          </div>

          <div className="instruction-step conclusion-step">
            <div className="step-number">9</div>
            <div className="step-content">
              Сравните полученные значения ускорения и сделайте вывод.
            </div>
          </div>
        </div>
      </div>
      
      <div className="central_column">
        <h1 className="central-title1">Лабораторная работа</h1>
        <h1 className="central-title2">Изучение движения по окружности (конический маятник)</h1>

        <div className="lab5__experiment">
            <div className="lab5__topFloor"></div>
            <div className="lab5__circle"></div>
            <div className="lab5__circle-paper"></div>
            <div className="rotting"
            style={{
              animation: isAnimating ? `swong 2s infinite ease-in-out` : 'none',
            }}
            >
            <div className="string"></div>
            <div className="ball"></div>
        </div>

            <div className="lab5__table"></div>
        </div>
        <div className="animation-controls">
          <button className="start-animation-button" onClick={handleStartAnimation}>
            Запустить маятник
          </button>
          <button className="stop-animation-button" onClick={handleStopAnimation}>
            Остановить маятник
          </button>
        </div>
        
        <div className="results-table">
          <h3>Таблица измерений:</h3>
          <table>
            <thead>
              <tr>
                <th>№ опыта</th>
                <th>Радиус R, м</th>
                <th>Время t, с</th>
                <th>Число оборотов N</th>
                <th>Высота h, м</th>
                <th>Сила F, Н</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><input type="number" value={row.radius} onChange={(e) => handleInputChange(index, 'radius', e.target.value)} /></td>
                  <td><input type="number" value={row.time} onChange={(e) => handleInputChange(index, 'time', e.target.value)} /></td>
                  <td><input type="number" value={row.turns} onChange={(e) => handleInputChange(index, 'turns', e.target.value)} /></td>
                  <td><input type="number" value={row.height} onChange={(e) => handleInputChange(index, 'height', e.target.value)} /></td>
                  <td><input type="number" value={row.force} onChange={(e) => handleInputChange(index, 'force', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="calculations">
          <h3>Расчеты:</h3>
          <p>Период обращения: T = t/N = <input type="number" /> с</p>
          <p>Центростремительное ускорение (по периоду): a₁ = <input type="number" value={results.acceleration1} readOnly /> м/с²</p>
          <p>Центростремительное ускорение (по высоте): a₂ = <input type="number" value={results.acceleration2} readOnly /> м/с²</p>
          <p>Центростремительное ускорение (по силе): a₃ = <input type="number" value={results.acceleration3} readOnly /> м/с²</p>
        </div>
        
        <div className="conclusion">
          <h3>Вывод:</h3>
          <textarea placeholder="Сравните три полученных значения центростремительного ускорения и сделайте вывод о точности измерений"></textarea>
        </div>
        
        <div className="action-buttons">
          <button className="save-button">Сохранить</button>
        </div>
      </div>
      
      <div className="results">
        <h3>Результаты:</h3>
        <p>Масса шарика: m = <input type="number" defaultValue="0.1" /> кг</p>
        <p>Ускорение свободного падения: g = 9.8 м/с²</p>
        <p>Сравнение ускорений:</p>
        <ul>
          <li>a₁ = {results.acceleration1 || '-'} м/с²</li>
          <li>a₂ = {results.acceleration2 || '-'} м/с²</li>
          <li>a₃ = {results.acceleration3 || '-'} м/с²</li>
        </ul>
      </div>
    </div>
  );
};

export default Lab5;