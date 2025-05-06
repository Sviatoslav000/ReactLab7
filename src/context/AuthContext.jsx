import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = '/';

// Функція для авторизації користувача (логін)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}api/user/auth/login/`, {  
      username: username,
      password: password
    });
    const { access, refresh, user } = response.data;
    if (access) {
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("username", user.username);
      return true; // Повертаємо true, якщо авторизація успішна
    }

    return false; // Якщо немає username, повертаємо false
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Невірний логін або пароль");
  }
};

// Функція для логауту користувача
export const logout = async () => {
  try {
    const refresh = localStorage.getItem("refresh");

    await axios.post(`${API_URL}api/user/auth/logout/`, { refresh }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    });

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
};

// Функція для перевірки, чи авторизований користувач
export const checkAuth = () => {
  const token = localStorage.getItem("access");
  if (!token) return false;

  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const now = Math.floor(Date.now() / 1000);

    return decoded.exp > now;
  } catch (error) {
    console.error("Помилка перевірки токена", error);
    return false;
  }
};


// Функція для отримання імені користувача (якщо авторизований)
export const getUsername = () => {
  return localStorage.getItem('username'); // Отримуємо ім'я користувача з localStorage
};

// Функція для реєстрації нового користувача
export const register = async (form) => {
  try {
    const response = await axios.post(`${API_URL}api/user/registration/`, {
      username: form.username,
      email: form.email,
      password: form.password,
      phone_number: form.number,
      birthday_date: form.birthday
    });

    const { access, refresh, user } = response.data;
    if (access) {
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('username', user.username);
      return true; // Повертаємо true, якщо реєстрація успішна
    }

    return false; // Якщо немає username, повертаємо false
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Помилка реєстрації");
  }
};

// Функція запису контактів в бд
export const sendcont = async (form) => {
  try {
    const response = await axios.post(`${API_URL}api/contacts/`, {
      username: form.username,
      email: form.email,
      message: form.message
    });
    
    const username = response.data
    if (username){
      return true;
    }
    return false; // Якщо немає username, повертаємо false
  } catch (error) {
    console.error("Error during adding message:", error);
    throw new Error("Error during adding message.");
  }
};


