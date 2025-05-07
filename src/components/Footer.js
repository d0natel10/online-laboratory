import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <p>Виртуальная лаборатория по кинематике</p>
                <div className="footer-links">
                    <a href="/about">О проекте</a>
                    <a href="/contacts">Контакты</a>
                    {/* <a href="#privacy">Политика конфиденциальности</a> */}
                </div>
                <div className="copyright">
                    &copy; {new Date().getFullYear()} Виртуальная лаборатория по кинематике. Все права защищены.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
