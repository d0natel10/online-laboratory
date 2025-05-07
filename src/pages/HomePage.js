import React, { useRef, useEffect, useState } from 'react';
import LabCard from '../components/LabCard';
import '../styles/home.css';
import lab1Path from '../images/lab1.jpg';
import lab2Path from '../images/lab2.jpg';
import lab3Path from '../images/lab3.jpg';
import lab4Path from '../images/lab4.jpg';
import lab5Path from '../images/lab5.jpg';
import lab6Path from '../images/lab6.jpg';
import { useNavigate } from 'react-router-dom';

const labs = [
    {id: 1, title: "Равномерное движение", description: "Изучение законов равномерного прямолинейного движения", image: lab1Path},
    {id: 2, title: "Равноускоренное движение", description: "Анализ равноускоренного движения тел", image: lab2Path},
    {id: 3, title: "Свободное падение", description: "Исследование свободного падения тел", image: lab3Path},
    {id: 4, title: "Движение брошенного тела", description: "Исследование движения тела, брошенного под углом к горизонту", image: lab4Path},
    {id: 5, title: "Движение по окружности", description: "Анализ равномерного движения по окружности", image: lab5Path},
    {id: 6, title: "Движение связанных тел", description: "Исследование движения системы связанных тел", image: lab6Path},
];

const HomePage = ({user}) => {
    const labsContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const animationRef = useRef(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const scrollSpeed = 1;

    const navigate = useNavigate();

    const handleOnStart = () => {
        navigate('/auth');
    }

    // Плавный скролл к позиции
    const smoothScrollTo = (position, duration = 1000) => {
        const start = labsContainerRef.current.scrollLeft;
        const change = position - start;
        const startTime = performance.now();
        
        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutQuad(progress);
            labsContainerRef.current.scrollLeft = start + change * ease;
            
            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animateScroll);
            } else {
                setIsAutoScrolling(true);
                animationRef.current = requestAnimationFrame(autoScroll);
            }
        };
        
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(animateScroll);
    };

    // Функция плавности
    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Автоматическая прокрутка
    const autoScroll = () => {
        if (!isAutoScrolling || !labsContainerRef.current) return;
        
        const container = labsContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 5) {
            setIsAutoScrolling(false);
            smoothScrollTo(0);
        } else {
            container.scrollLeft += scrollSpeed;
            animationRef.current = requestAnimationFrame(autoScroll);
        }
    };

    // Обработчики для перетаскивания
    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - labsContainerRef.current.offsetLeft;
        scrollLeft.current = labsContainerRef.current.scrollLeft;
        setIsAutoScrolling(false);
        cancelAnimationFrame(animationRef.current);
    };

    const handleMouseUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        
        // Запускаем автоматическую прокрутку через 2 секунды после отпускания
        setTimeout(() => {
            setIsAutoScrolling(true);
            animationRef.current = requestAnimationFrame(autoScroll);
        }, 2000);
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - labsContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        labsContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(autoScroll);
        
        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section with Parallax */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Виртуальная лаборатория по кинематике</h1>
                    <p>Исследуйте законы движения в интерактивной среде</p>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section-home">
                <div className="container">
                    <h2>О лаборатории</h2>
                    <p>
                        Виртуальная лаборатория предоставляет уникальную возможность изучать основы кинематики 
                        через интерактивные эксперименты и симуляции. Вы сможете визуализировать физические процессы, 
                        которые трудно представить в обычных условиях.
                    </p>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Реальные графики</h3>
                            <p>Автоматическое построение графиков зависимости параметров движения</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚙️</div>
                            <h3>Настройка параметров</h3>
                            <p>Возможность изменять начальные условия экспериментов</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Доступность</h3>
                            <p>Работает на любых устройствах без дополнительного ПО</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Labs Catalog with Parallax Background */}
           <section className="parallax-bg">
                <div className="container">
                    <div className="lab-catalog">
                        <h2 id="catalog">Каталог лабораторных работ</h2>
                        <p className="catalog-description">
                            Выберите интересующую вас лабораторную работу из нашего каталога
                        </p>
                        <div 
                            className="labs-scroll-container"
                            ref={labsContainerRef}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseMove={handleMouseMove}
                        >
                            <div className="labs-grid">
                                {labs.map(lab => (
                                    <LabCard
                                        key={lab.id}
                                        id={lab.id}
                                        title={lab.title}
                                        description={lab.description}
                                        image={lab.image}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            {!user ? <section className="contact-section-home">
                <div className="container">
                    <h2>Готовы начать?</h2>
                    <p>
                        Зарегистрируйтесь, чтобы сохранять результаты экспериментов и получить доступ 
                        ко всем возможностям платформы.
                    </p>
                    <button className="cta-button-home" onClick={handleOnStart}>Начать обучение</button>
                </div>
            </section>
           :
           <div></div> 
        }
        </div>
    );
}

export default HomePage;