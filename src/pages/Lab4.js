import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/lab4.css";

const Lab4 = () => {
  const navigate = useNavigate();
  const [angle, setAngle] = useState(45);
  const [isFiring, setIsFiring] = useState(false);
  const [timeOfFlight, setTimeOfFlight] = useState(0);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const cannonRef = useRef(null);

  // Фиксированные параметры
  const velocity = 20; // постоянная начальная скорость (м/с)
  const gravity = 9.8; // постоянное ускорение свободного падения (м/с²)

  // Константы для позиционирования пушки
  const CANNON_X = 200;
  const CANNON_Y = 360;
  const BARREL_LENGTH = 80;

  const calculateTrajectory = () => {
    const radians = angle * Math.PI / 180;
    const vx = velocity * Math.cos(radians);
    const vy = velocity * Math.sin(radians);
    
    const time = (2 * vy) / gravity;
    const maxHeight = (vy * vy) / (2 * gravity);
    const range = vx * time;
    
    return { time, maxHeight, range };
  };

  const fireCannon = () => {
    if (isFiring) return;
  
    setIsFiring(true);
    setTimeOfFlight(0);
  
    const radians = angle * Math.PI / 180;
    const vx = velocity * Math.cos(radians);
    const vy = velocity * Math.sin(radians);
  
    const points = [];
    let t = 0;
    const dt = 0.05;
  
    // Позиции и параметры
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const TABLE_Y = 470; // Уровень стола на canvas
  
    // Вычисляем точки траектории, пока снаряд не достигнет стола
    while (true) {
      const x = vx * t;
      const y = vy * t - 0.5 * gravity * t * t;
      const canvasY = CANNON_Y - BARREL_LENGTH * Math.sin(radians) - y * 5;
    
      if (canvasY >= TABLE_Y) {
        const prev = points[points.length - 1];
    
        if (prev) {
          // Интерполяция между prev и current
          const y1 = prev.y;
          const y2 = y;
          const t1 = prev.t;
          const t2 = t;
          const ratio = ((TABLE_Y - (CANNON_Y - BARREL_LENGTH * Math.sin(radians) - y1 * 5)) /
                         ((y2 - y1) * 5));
    
          const finalT = t1 + ratio * (t2 - t1);
          const finalX = vx * finalT;
          const finalY = vy * finalT - 0.5 * gravity * finalT * finalT;
    
          points.push({ x: finalX, y: finalY, t: finalT });
        } else {
          points.push({ x, y, t });
        }
    
        break;
      }
    
      points.push({ x, y, t });
      t += dt;
    }
    
  
    const totalFlightTime = points[points.length - 1].t;
    setTimeOfFlight(totalFlightTime);
  
    const startTime = Date.now();
    const totalTime = totalFlightTime * 1000;
  
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / totalTime, 1);
      const currentIndex = Math.min(Math.floor(points.length * progress), points.length - 1);
  
      if (progress < 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
  
      // Draw trajectory
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i <= currentIndex; i++) {
        const point = points[i];
        const canvasX = CANNON_X + BARREL_LENGTH * Math.cos(radians) + point.x * 5;
        const canvasY = CANNON_Y - BARREL_LENGTH * Math.sin(radians) - point.y * 5;
      
        if (i === 0) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
  
      // Draw projectile
      const point = points[currentIndex] || points[points.length - 1];
      const projectileX = CANNON_X + BARREL_LENGTH * Math.cos(radians) + point.x * 5;
      const projectileY = CANNON_Y - BARREL_LENGTH * Math.sin(radians) - point.y * 5;
  
      const gradient = ctx.createRadialGradient(
        projectileX, projectileY, 0,
        projectileX, projectileY, 8
      );
      gradient.addColorStop(0, '#f5f5f5');
      gradient.addColorStop(0.5, '#a0a0a0');
      gradient.addColorStop(1, '#4a4a4a');
  
      ctx.beginPath();
      ctx.arc(projectileX, projectileY, 8, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(projectileX - 3, projectileY - 3, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
  
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();
  
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsFiring(false);
      }
    };
  
    animate();
  };
  
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fireCannon();
  };

  const resetExperiment = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsFiring(false);
    setTimeOfFlight(0);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
              Установите угол наклона пушки с помощью ползунка (от 0° до 90°).
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              Нажмите кнопку "Запустить" для выстрела снаряда.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              Зафиксируйте время полёта снаряда, которое отображается в результатах.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">4</div>
            <div className="step-content">
              Измерьте максимальную высоту и дальность полёта по траектории на экране.
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
              Рассчитайте теоретические значения по формулам:
              <div className="formula">H = (v₀·sinα)²/(2g)</div>
              <div className="formula">L = v₀²·sin(2α)/g</div>
              <div className="formula">T = 2v₀·sinα/g</div>
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">7</div>
            <div className="step-content">
              Рассчитайте:
              <ul className="calculations-list">
                <li>Абсолютную погрешность измерений</li>
                <li>Относительную погрешность измерений</li>
              </ul>
            </div>
          </div>

          <div className="instruction-step conclusion-step">
            <div className="step-number">8</div>
            <div className="step-content">
              Сделайте вывод о зависимости дальности и высоты полёта от угла бросания.
            </div>
          </div>
        </div>
      </div>
      
      <div className="central_column">
        <h1 className="central-title1">Лабораторная работа</h1>
        <h1 className="central-title2">Изучение движения тела, брошенного под углом к горизонту</h1>

        <div className="lab4__experiment">
          <div className="lab4__cannon-container" ref={cannonRef}>
            <div className="lab4__cannon">
              <div style={{ transform: `rotate(${-angle}deg)` }} className="lab4__cannon-barrel"></div>
              <div className="lab4__cannon-base"></div>
              <div className="lab4__cannon-wheel"></div>
              <div className="lab4__table">
                <div className="lab4__brick-floor"></div>
                <div className="lab4__ruler">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="ruler-mark">
                      {i % 2 === 0 && (
                        <span className="ruler-number">{i * 10}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <canvas 
            ref={canvasRef} 
            width="800" 
            height="500" 
            className="trajectory-canvas"
          ></canvas>
        </div>

        <div className="controls">
          <form onSubmit={handleSubmit}>
            <div className="control-group">
              <label>
                Угол выстрела:
                <input 
                  type="range" 
                  min="0" 
                  max="90" 
                  value={angle} 
                  onChange={(e) => setAngle(e.target.value)}
                  disabled={isFiring}
                />
                <span>{angle}°</span>
              </label>
            </div>
            
            <div className="lab4__buttons">
              <button type="submit" disabled={isFiring}>
                Запустить
              </button>
              <button type="button" onClick={resetExperiment}>
                Сбросить
              </button>
            </div>
          </form>
        </div>
        
        <div className="results-table">
          <h3>Таблица измерений:</h3>
          <table>
            <thead>
              <tr>
                <th>№ опыта</th>
                <th>Угол α, °</th>
                <th>Макс. высота H, м</th>
                <th>Дальность L, м</th>
                <th>Время полёта T, с</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row}>
                  <td>{row}</td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                  <td><input type="number" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="calculations">
          <h3>Расчеты:</h3>
          <p>Максимальная высота: H = <input type="number" /> м</p>
          <p>Дальность полёта: L = <input type="number" /> м</p>
          <p>Время полёта: T = <input type="number" value={timeOfFlight.toFixed(2)} readOnly /> с</p>
        </div>
        
        <div className="conclusion">
          <h3>Вывод:</h3>
          <textarea placeholder="Запишите вывод о зависимости дальности и высоты полёта от угла бросания"></textarea>
        </div>
        
        <div className="action-buttons">
          <button className="save-button">Сохранить</button>
        </div>
      </div>
      
      <div className="results">
        <h3>Результаты:</h3>
        <p>Время полёта: {timeOfFlight.toFixed(2)} с</p>
        <p>Параметры: v₀ = {velocity} м/с, g = {gravity} м/с²</p>
      </div>
    </div>
  );
};

export default Lab4;