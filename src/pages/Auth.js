import { useState } from 'react';
import '../styles/auth.css';
import { registerUser, loginUser } from '../components/Api';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    classNumber: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Обработка входа
        const user = await loginUser(formData.login, formData.password);
        onLogin(user);
        navigate('/profile');
      } else {
        // Обработка регистрации
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Пароли не совпадают!');
        }
        
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          classNumber: formData.classNumber,
          login: formData.login,
          email: formData.email,
          pass: formData.password,
          completedLabs: []
        };
        
        const user = await registerUser(userData);
        onLogin(user);
        navigate('/profile');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        <form onSubmit={handleSubmit}>
  {!isLogin ? (
    <div className="form-columns">
      <div className="form-column">
        <div className="form-group">
          <label htmlFor="lastName">Фамилия:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">Имя:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="classNumber">Класс (цифра):</label>
          <input
            type="number"
            id="classNumber"
            name="classNumber"
            min="1"
            max="11"
            value={formData.classNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-column">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="form-group">
        <label htmlFor="login">Логин:</label>
        <input
          type="text"
          id="login"
          name="login"
          value={formData.login}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
    </>
  )}
  
  {!isLogin && (
    <div className="form-group">
      <label htmlFor="confirmPassword">Подтвердите пароль:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
    </div>
  )}
 {error && <div className="error-message">{error}</div>}
  <div className="auth-actions">
    <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
  </div>
</form>
        
        <div className="auth-switch">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button 
            type="button" 
            className="switch-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;