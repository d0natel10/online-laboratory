import React, { useState, useEffect } from 'react';
import '../styles/header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        
        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    
    const handleLoginClick = () => {
        navigate('/auth');
    };
    
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
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="nav-container">
                <div className="logo">
                    <h1>Кинематика Онлайн</h1>
                </div>
                <ul className="nav-links">
                    <div className="linksstyle">
                        <li className='linksstyle-item'><Link to="/">Главная</Link></li>
                        <li className='linksstyle-item'onClick={handleOnClick}><a>Лабораторные работы</a></li>
                        <li className='linksstyle-item'><Link to={user ? '/profile' : '/auth'}>Профиль</Link></li>
                    </div>
                        {user ? (
                            <li className='linksstyle-item-logout'>
                                <span>{user.firstName} {user.lastName}</span>
                                 <button className="logout-btn" onClick={onLogout}>Выйти
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button className="logout-btn" onClick={handleLoginClick}>Вход</button>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;