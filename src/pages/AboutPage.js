import React, {useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/about.css';
import labPreview from '../images/lab2.jpg';
import { FaAtom, FaLaptopCode,  FaBullseye } from 'react-icons/fa';


const AboutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleOnClick = () => {
        navigate('/#catalog');
    }

useEffect(() => {
        const hash = location.hash; // Получаем хэш из URL
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, [location]);
    return (
        <div className="about-page">
            {/* Герой-секция */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Виртуальная лаборатория <span>по кинематике</span>
                    </h1>
                    <p className="hero-subtitle">
                        Интерактивная платформа для изучения движения тел с современной визуализацией
                    </p>
                    <div className="hero-image-container">
                        <img src={labPreview} alt="Превью лаборатории" className="hero-image" />
                        <div className="image-overlay"></div>
                    </div>
                </div>
            </section>

            {/* Основной контент */}
            <section className="main-content">
                {/* Карточка актуальности */}
                <div className="content-card relevance-card">
                    <div className="card-header">
                        <h2>Почему это важно?</h2>
                        <div className="divider"></div>
                    </div>
                    <p className="card-text">
                        В эпоху цифрового образования 87% школьников лучше воспринимают материал через интерактивные форматы. 
                        Наш проект заполняет пробел в качественных визуализациях базовых концепций кинематики.
                    </p>
                </div>

                {/* Особенности */}
                <div className="features-section">
                    <div className="section-header">
                    <FaAtom className="section-icon" />
                        <h2>Ключевые возможности</h2>
                    </div>
                    
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-number">01</div>
                            <h3>Интерактивные эксперименты</h3>
                            <p>Реальное моделирование движения с настраиваемыми параметрами: масса, скорость, ускорение</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-number">02</div>
                            <h3>Динамическая визуализация</h3>
                            <p>Графики зависимостей в реальном времени с возможностью экспорта данных</p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-number">03</div>
                            <h3>Готовые лабораторные</h3>
                            <p>10+ работ, соответствующих школьной программе 9-11 классов</p>
                        </div>
                    </div>
                </div>

                {/* Технологии */}
                <div className="tech-section">
                    <div className="section-header">
                    <FaLaptopCode className="section-icon" />
                        <h2>Технологический стек</h2>
                    </div>
                    
                    <div className="tech-cards">
                        <div className="tech-card frontend-card">
                            <h3>Frontend</h3>
                            <ul>
                                <li>React.js</li>
                                <li>Three.js для 3D</li>
                                <li>D3.js для графиков</li>
                                <li>Framer Motion</li>
                            </ul>
                        </div>
                        
                        <div className="tech-card backend-card">
                            <h3>Backend</h3>
                            <ul>
                                <li>Node.js + Express</li>
                                <li>PostgreSQL</li>
                                <li>JWT-аутентификация</li>
                                <li>REST API</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Цели */}
                <div className="goals-section">
                    <div className="section-header">
                    <FaBullseye className="section-icon" />
                        <h2>Образовательные цели</h2>
                    </div>
                    
                    <div className="goals-list">
                        <div className="goal-item">
                            <div className="goal-progress" style={{'--progress': '90%'}}></div>
                            <h3>Наглядность</h3>
                            <p>Улучшение понимания абстрактных концепций через визуализацию</p>
                        </div>
                        
                        <div className="goal-item">
                            <div className="goal-progress" style={{'--progress': '85%'}}></div>
                            <h3>Безопасность</h3>
                            <p>Возможность экспериментировать без ограничений реальных лабораторий</p>
                        </div>
                        
                        <div className="goal-item">
                            <div className="goal-progress" style={{'--progress': '80%'}}></div>
                            <h3>Аналитика</h3>
                            <p>Развитие навыков анализа данных и построения гипотез</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <h2>Готовы к экспериментам?</h2>
                <p>Начните исследовать законы движения прямо сейчас</p>
                <button className="cta-button" onClick={handleOnClick}>
                    Попробовать лабораторию
                    <span className="arrow-icon">→</span>
                </button>
            </section>
        </div>
    );
};

export default AboutPage;