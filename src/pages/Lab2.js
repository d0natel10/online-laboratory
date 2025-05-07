import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/lab2.css";

const Lab2 = () => {
  const navigate = useNavigate();

  const [angle, setAngle] = useState(30);
  const [ballPosition, setBallPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [distance, setDistance] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(0);

  // Фиксированные параметры установки
  const CHUTE_LENGTH = 300;
  const RIGHT_END_X = 500;
  const RIGHT_END_Y = 420;
  const TRIPOD_X = 250;

  const calculateLeftEnd = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: RIGHT_END_X - CHUTE_LENGTH * Math.cos(rad),
      y: RIGHT_END_Y - CHUTE_LENGTH * Math.sin(rad),
    };
  };

  const startExperiment = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setBallPosition(0);
    setDistance(0);
    setCurrentSpeed(0);
    startTimeRef.current = Date.now();

    const animate = () => {
      const time = (Date.now() - startTimeRef.current) / 1000;
      const acceleration = 9.8 * Math.sin((angle * Math.PI) / 180);
      const pos = acceleration * time * time * 50;
      const speed = acceleration * time * 100;

      setCurrentSpeed(parseFloat(speed.toFixed(1)));

      // Останавливаем шар у края цилиндра (CHUTE_LENGTH - 15)
      if (pos < CHUTE_LENGTH - 20) {
        setBallPosition(pos);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setBallPosition(CHUTE_LENGTH - 20); // Фиксируем у края цилиндра
        const calculatedDist = Math.round(speed * 0.5 + Math.random() * 3);
        setDistance(calculatedDist);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const { x: leftEndX, y: leftEndY } = calculateLeftEnd(angle);
  const ballX =
    RIGHT_END_X -
    (CHUTE_LENGTH - ballPosition) * Math.cos((angle * Math.PI) / 180);
  const ballY =
    RIGHT_END_Y -
    (CHUTE_LENGTH - ballPosition) * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="lab2-container">
      <div className="left-column">
        <div className="instructions">
          <h3>Методика проведения эксперимента</h3>

          <div className="instruction-step">
            <div className="step-number">1</div>
            <div className="step-content">
              Расположите стеклянную трубку с водой вертикально и держите её
              в таком положении до тех пор, пока стеариновый шарик не
              поднимется к верхнему концу трубки.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">2</div>
            <div className="step-content">
              Поверните трубку на 180° и определите время, за которое шарик
              проходит всю длину трубки.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">3</div>
            <div className="step-content">
              Отметьте маркером половину трубки и убедитесь, что за половину
              времени движения шарик проходит половину пути.
            </div>
          </div>

          <div className="instruction-step">
            <div className="step-number">4</div>
            <div className="step-content">
              Разделите трубку на три, а затем на четыре равные части и,
              проведя опыты, убедитесь, что за треть и четверть времени
              шарик проходит соответствующую часть пути.
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
              Самостоятельно измерьте величину скорости движения в каждом
              случае по формуле:
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
              Сделайте вывод о зависимости пути от времени при равномерном
              прямолинейном движении.
            </div>
          </div>
        </div>
      </div>

      <div className="central-column">
        <div className="app lab2-enhanced">
          <header className="header-lab2">
            <h1>Лабораторная работа</h1>
            <h1>Исследование равноускоренного движения</h1>
          </header>

          <div className="experiment-visualization">
            {/* Стол с текстурой дерева */}
            <div
              className="table wooden-surface"
              style={{ top: `${RIGHT_END_Y}px` }}
            >
              <div className="wood-texture"></div>
              <div className="table-leg left-leg"></div>
              <div className="table-leg right-leg"></div>
            </div>

            {/* Штатив с металлической текстурой */}
            <div className="tripod metal-stand" style={{ left: `${TRIPOD_X}px` }}>
              <div className="tripod-stand">
                <div className="metal-texture"></div>
                <div className="tripod-legs">
                  <div className="leg"></div>
                  <div className="leg"></div>
                  <div className="leg"></div>
                </div>
              </div>
              <div
                className="chute-mount metal-joint"
                style={{
                  top: `${leftEndY - 85}px`,
                  left: `${20}px`,
                }}
              >
                <div className="joint-screw"></div>
              </div>
            </div>
            <div
              className="tripod-base"
              style={{
                left: `${TRIPOD_X - 45}px`,
                top: `${RIGHT_END_Y - 15}px`,
              }}
            >
              <div className="base-texture"></div>
            </div>

            {/* Желоб с металлической текстурой */}
            <div
              className="chute metal-chute"
              style={{
                left: `${RIGHT_END_X - CHUTE_LENGTH}px`,
                top: `${RIGHT_END_Y}px`,
                width: `${CHUTE_LENGTH}px`,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "right center",
              }}
            >
              <div className="chute-track">
                <div className="ruler-on-chute">
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className="ruler-mark-container">
                      <div className="ruler-mark" style={{
                        left: `${i * (CHUTE_LENGTH / 10)}px`
                      }}></div>
                      {i % 2 === 0 && (
                        <div className="ruler-label" style={{
                          left: `${i * (CHUTE_LENGTH / 10)}px`
                        }}>
                          {i * (CHUTE_LENGTH / 100)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="chute-side left"></div>
              <div className="chute-side right"></div>
            </div>

            {/* Шар с металлической текстурой */}
            {ballPosition < CHUTE_LENGTH && (
              <div
                className={`ball metal-ball ${isAnimating ? "rolling" : ""}`}
                style={{
                  left: `${ballX}px`,
                  top: `${ballY}px`,
                  transform: `rotate(${ballPosition * 0.5}deg)`,
                }}
              >
                <div className="ball-highlight"></div>
              </div>
            )}

            {/* Цилиндр в конце желоба */}
            <div
              className="cylinder metal-cylinder"
              style={{
                left: `${RIGHT_END_X - 22}px`,
                top: `${RIGHT_END_Y - 10}px`,
                transform: `rotate(${-angle}deg)`,
                transformOrigin: "center bottom",
              }}
            >
              <div className="cylinder-body"></div>
              <div className="cylinder-ends"></div>
            </div>
          </div>
          <div className="control-panel">
            <div className="angle-control">
              <label>Угол наклона: {angle}°</label>
              <input
                type="range"
                min="30"
                max="40"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                disabled={isAnimating}
              />
            </div>
            <div className="buttons">
              <button
                className={`start-btn ${isAnimating ? "disabled" : ""}`}
                onClick={startExperiment}
              >
                ▶ Запустить эксперимент
              </button>
            </div>
          </div>
        </div>
           <div className="results-table">
          <h3>Таблица измерений:</h3>
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
              {[...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{["1", "½", "⅓", "¼"][i]}</td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Расчеты */}
        <div className="calculations">
          <h3>Расчеты:</h3>
          <p>
            v = s/t = <input type="number" /> м/с
          </p>
        </div>

        {/* Вывод и контрольные вопросы */}
        <div className="conclusion">
          <h3>Вывод:</h3>
          <textarea placeholder="Запишите вывод о зависимости пути от времени при равномерном прямолинейном движении"></textarea>
        </div>
        <div className="action-buttons">
          <button className="save-button">Сохранить</button>
        </div>
      </div>
      <div className="results">
        <h3>Результаты</h3>
                <p>Угол наклона: {angle}°</p>
                <p>Скорость: {(currentSpeed / 100).toFixed(2)} м/с</p>
            </div>
    </div>
  );
};

export default Lab2;