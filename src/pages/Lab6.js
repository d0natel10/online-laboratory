import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/lab6.css';

const Lab6 = () => {
  const navigate = useNavigate();
  const [measurements, setMeasurements] = useState([
    { m1: '', m2: '', time: '', distance: '' }
  ]);
  const [results, setResults] = useState({
    acceleration: '',
    tension: ''
  });
  const [animationState, setAnimationState] = useState({
    isPlaying: false,
    isPaused: false,
    progress: 0
  });
  
  const cartRef = useRef(null);
  const weightRef = useRef(null);
  const ropeRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(null);
  const totalDurationRef = useRef(0);
  const newCartPosRef = useRef(0);
  const newWeightPosRef = useRef(0);
  const newRopeWidthRef = useRef(0);

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / totalDurationRef.current, 1);
    
    cartRef.current.style.left = `${200 + (newCartPosRef.current - 200) * progress}px`;
    weightRef.current.style.top = `${50 + (newWeightPosRef.current - 50) * progress}px`;
    ropeRef.current.style.width = `${340 - (340 - newRopeWidthRef.current) * progress}px`;
    ropeRef.current.style.transform = `rotate(${-10 * progress}deg)`;
    
    setAnimationState(prev => ({
      ...prev,
      progress: progress * 100
    }));
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setAnimationState({
        isPlaying: false,
        isPaused: false,
        progress: 100
      });
    }
  };

  const handleInputChange = (index, field, value) => {
    const newMeasurements = [...measurements];
    newMeasurements[index][field] = value;
    setMeasurements(newMeasurements);
  };

  const calculateResults = () => {
    const m1 = parseFloat(measurements[0].m1);
    const m2 = parseFloat(measurements[0].m2);
    const t = parseFloat(measurements[0].time);
    const s = parseFloat(measurements[0].distance);
    
    if (isNaN(m1) || isNaN(m2) || isNaN(t) || isNaN(s)) {
      alert("Пожалуйста, заполните все поля корректными числовыми значениями");
      return;
    }
    
    const a = (2 * s) / (t * t);
    const T = m1 * a;

    setResults({
      acceleration: a.toFixed(4),
      tension: T.toFixed(4)
    });

    totalDurationRef.current = t * 1000;
  };

  const startAnimation = () => {
    if (animationState.isPlaying) return;
    
    const t = parseFloat(measurements[0].time);
    const s = parseFloat(measurements[0].distance);
    
    if (isNaN(t) || isNaN(s) || t <= 0 || s <= 0) {
      alert("Установите время и расстояние для анимации");
      return;
    }

    resetAnimation();
    
    const cart = cartRef.current;
    const weight = weightRef.current;
    const rope = ropeRef.current;
    
    cart.style.left = '200px';
    weight.style.top = '50px';
    rope.style.width = '340px';
    rope.style.transform = 'rotate(0deg)';
    
    void cart.offsetWidth;
    void weight.offsetWidth;
    void rope.offsetWidth;
    
    newCartPosRef.current = 200 + (s * 100);
    newWeightPosRef.current = 50 + (s * 100);
    newRopeWidthRef.current = 340 - (s * 100);
    
    cart.style.transition = 'none';
    weight.style.transition = 'none';
    rope.style.transition = 'none';
    
    setAnimationState({
      isPlaying: true,
      isPaused: false,
      progress: 0
    });
    
    startTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  };

  const pauseAnimation = () => {
    if (!animationState.isPlaying || animationState.isPaused) return;
    
    cancelAnimationFrame(animationRef.current);
    pauseTimeRef.current = performance.now();
    
    setAnimationState(prev => ({
      ...prev,
      isPaused: true
    }));
  };

  const resumeAnimation = () => {
    if (!animationState.isPaused) return;
    
    startTimeRef.current += performance.now() - pauseTimeRef.current;
    animationRef.current = requestAnimationFrame(animate);
    
    setAnimationState(prev => ({
      ...prev,
      isPaused: false
    }));
  };

  const resetAnimation = () => {
    cancelAnimationFrame(animationRef.current);
    
    const cart = cartRef.current;
    const weight = weightRef.current;
    const rope = ropeRef.current;
    
    cart.style.transition = 'left 0.5s ease-out';
    weight.style.transition = 'top 0.5s ease-out';
    rope.style.transition = 'width 0.5s ease-out, transform 0.5s ease-out';
    
    cart.style.left = '200px';
    weight.style.top = '50px';
    rope.style.width = '340px';
    rope.style.transform = 'rotate(0deg)';
    
    setTimeout(() => {
      cart.style.transition = 'none';
      weight.style.transition = 'none';
      rope.style.transition = 'none';
    }, 500);
    
    setAnimationState({
      isPlaying: false,
      isPaused: false,
      progress: 0
    });
  };

  const handleNext = () => {
    if (window.confirm("Вы уверены, что хотите перейти к следующему этапу?")) {
      navigate(`/lab/${6}`);
    }
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="lab-container">
      <div className="left_column">
        <div className="instructions">
          <h3>Методика проведения эксперимента</h3>
          
          <div className="instruction-step">
            <div className="step-number">1</div>
            <div className="step-content">
              Измерьте массу тележки (m₁) и массу груза (m₂) с точностью до 0.01 кг.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              Установите тележку на горизонтальную поверхность и прикрепите груз через блок.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              Отпустите груз и измерьте время движения (t) и пройденное расстояние (s).
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">4</div>
            <div className="step-content">
              Рассчитайте ускорение системы по формуле:
              <div className="formula">a = 2s/t²</div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">5</div>
            <div className="step-content">
              Рассчитайте силу натяжения нити:
              <div className="formula">T = m₁·a</div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">6</div>
            <div className="step-content">
              Проверьте выполнение второго закона Ньютона для груза:
              <div className="formula">m₂·g - T = m₂·a</div>
            </div>
          </div>

          <div className="instruction-step conclusion-step">
            <div className="step-number">7</div>
            <div className="step-content">
              Сравните теоретические и экспериментальные значения, сделайте вывод.
            </div>
          </div>
        </div>
      </div>
      
      <div className="central_column">
        <div className="lab6">
          <header className="lab6__header">
            <h1 className="lab6__header-title">
              Лабораторная работа №6
            </h1>
            <h2 className="lab6__header-description">
              Исследование движения системы "тележка-груз"
            </h2>
            <section className="lab6__container">
              <div className="lab6__experiment">
                <div className="lab6__table"></div>
                <div className="lab6__cart" ref={cartRef}></div>
                <div className="lab6__pulley"></div>
                <div className="lab6__weight" ref={weightRef}></div>
                <div className="lab6__rope" ref={ropeRef}></div>
              </div>
              <div className="animation-controls">
                <button 
                  onClick={startAnimation}
                  disabled={animationState.isPlaying && !animationState.isPaused}
                >
                  ▶️ Запуск
                </button>
                {animationState.isPlaying && !animationState.isPaused ? (
                  <button onClick={pauseAnimation}>⏸ Пауза</button>
                ) : (
                  animationState.isPaused && <button onClick={resumeAnimation}>▶️ Продолжить</button>
                )}
                <button onClick={resetAnimation}>⏹ Сброс</button>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${animationState.progress}%` }}
                  ></div>
                </div>
              </div>
            </section>
          </header>
        </div>
        
        <div className="results-table">
          <h3>Таблица измерений:</h3>
          <table>
            <thead>
              <tr>
                <th>№ опыта</th>
                <th>m₁ (кг)</th>
                <th>m₂ (кг)</th>
                <th>Время t (с)</th>
                <th>Расстояние s (м)</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><input type="number" value={row.m1} onChange={(e) => handleInputChange(index, 'm1', e.target.value)} /></td>
                  <td><input type="number" value={row.m2} onChange={(e) => handleInputChange(index, 'm2', e.target.value)} /></td>
                  <td><input type="number" value={row.time} onChange={(e) => handleInputChange(index, 'time', e.target.value)} /></td>
                  <td><input type="number" value={row.distance} onChange={(e) => handleInputChange(index, 'distance', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="calculations">
          <h3>Расчеты:</h3>
          <p>Ускорение системы: a = <input type="number" value={results.acceleration} readOnly /> м/с²</p>
          <p>Сила натяжения: T = <input type="number" value={results.tension} readOnly /> Н</p>
        </div>
        
        <div className="conclusion">
          <h3>Вывод:</h3>
          <textarea placeholder="Проанализируйте полученные результаты, сравните с теоретическими расчетами и укажите возможные источники погрешностей"></textarea>
        </div>
        
        <div className="action-buttons">
          <button 
            className="save-button" 
            onClick={calculateResults}
          >
            Рассчитать
          </button>
          <button className="submit-button" onClick={handleNext}>Далее</button>
        </div>
      </div>
      
      <div className="results">
        <h3>Теоретические значения:</h3>
        <p>Ускорение свободного падения: g = 9.81 м/с²</p>
        <p>Ожидаемое ускорение: a = m₂g/(m₁+m₂) = {
          measurements[0].m1 && measurements[0].m2 
            ? ((parseFloat(measurements[0].m2) * 9.81) / 
               (parseFloat(measurements[0].m1) + parseFloat(measurements[0].m2))).toFixed(4)
            : '-'
        } м/с²</p>
        <p>Ожидаемая сила натяжения: T = m₁m₂g/(m₁+m₂) = {
          measurements[0].m1 && measurements[0].m2 
            ? ((parseFloat(measurements[0].m1) * parseFloat(measurements[0].m2) * 9.81) / 
               (parseFloat(measurements[0].m1) + parseFloat(measurements[0].m2))).toFixed(4)
            : '-'
        } Н</p>
      </div>
    </div>
  );
};

export default Lab6;