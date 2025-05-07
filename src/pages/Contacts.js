import React from 'react';
import '../styles/contacts.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactsPage = () => {
    return (
        <div className="contacts-container">
            {/* Hero Section */}
            <section className="contacts-hero">
                <div className="container">
                    <h1>Свяжитесь с нами</h1>
                    <p>Есть вопросы или предложения? Мы всегда рады помочь!</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="contacts-content">
                <div className="container">
                    <div className="contacts-grid">
                        {/* Контактная информация */}
                        <div className="contacts-info">
                            <h2>Мои контакты</h2>
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="contact-details">
                                    <h3>Email</h3>
                                    <a href="mailto:jenya.kozlova.32@gmail.com">jenya.kozlova.32@gmail.com</a>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaPhone />
                                </div>
                                <div className="contact-details">
                                    <h3>Телефон</h3>
                                    <a href="tel:+79991234567">+7 (999) 123-45-67</a>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="contact-details">
                                    <h3>Адрес</h3>
                                    <p>Москва, пер. Вадковский, д. 3Ас1</p>
                                </div>
                            </div>
                        </div>

                        {/* Форма обратной связи */}
                        <div className="contacts-form">
                            <h2>Форма обратной связи</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Ваше имя</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        placeholder="Иван Иванов" 
                                        required 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        placeholder="example@mail.com" 
                                        required 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="subject">Тема сообщения</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        placeholder="Тема" 
                                        required 
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="message">Сообщение</label>
                                    <textarea 
                                        id="message" 
                                        rows="5" 
                                        placeholder="Ваше сообщение..." 
                                        required
                                    ></textarea>
                                </div>
                                
                                <button type="submit" className="submit-btn">
                                    <FaPaperPlane /> Отправить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactsPage;