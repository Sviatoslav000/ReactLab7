import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { login } from '../context/AuthContext.jsx'; // Підключення файлу для авторизації
import styles from '../styles/login.module.css';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isLoggedIn = await login(form.username, form.password);
      if (isLoggedIn) {
        window.location.reload()
        navigate('/'); // Перенаправлення на головну сторінку
      }
    } catch (err) {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginContainer}>
        <h2><strong>Вхід у VA Gallery</strong></h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Ім'я користувача або E-mail"
            value={form.username}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            id="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button className={styles.logBt} type="submit">Увійти</button>
        </form>
        <div className={styles.registerLink}>
          У вас немає акаунта? <Link to="/register">Зареєструватися</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
