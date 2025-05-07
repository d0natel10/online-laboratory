import axios from 'axios';

const API_URL = 'https://42c36e35c8f14881.mokky.dev';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    // Проверяем, существует ли пользователь с таким логином или email
    const { data: users } = await api.get('/users');
    const userExists = users.some(
      (user) => user.login === userData.login || user.email === userData.email
    );

    if (userExists) {
      throw new Error('Пользователь с таким логином или email уже существует');
    }

    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (login, password) => {
  try {
    const { data: users } = await api.get('/users');
    const user = users.find(
      (u) => (u.login === login || u.email === login) && u.pass === password
    );

    if (!user) {
      throw new Error('Неверный логин или пароль');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};