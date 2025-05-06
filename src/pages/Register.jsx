import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/register.module.css';
import { register } from '../context/AuthContext.jsx';


const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    number: '',
    birthday: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const isValidUsername = /^[a-zA-Zа-яА-ЯіІїЇєЄ\s]+$/.test(form.username);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isValidPhone = /^\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(form.number);
  const isValidBirthday = /^\d{2}\.\d{2}\.\d{4}$/.test(form.birthday);
  const passwordsMatch = form.password === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUsername || !isValidEmail || !isValidPhone || !isValidBirthday) {
      alert('Будь ласка, перевірте правильність введених даних');
      return;
    }

    if (!passwordsMatch) {
      alert('Паролі не співпадають');
      return;
    }

    try {
      const success = await register(form);
      if (success) {
        alert('Реєстрація успішна!');
        window.location.reload()
        navigate('/');
      } else {
        alert('Щось пішло не так, спробуйте ще раз');
      }
    } catch (error) {
      alert(error.message || 'Помилка при реєстрації');
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles['reg-container']}>
        <h2><strong>Реєстрація у VA Gallery</strong></h2>
        <form onSubmit={handleSubmit}>
          <input
            id="username"
            type="text"
            placeholder="Ім'я користувача"
            value={form.username}
            onChange={handleChange}
            className={!isValidUsername && form.username ? styles.invalid : ''}
            required
          />
          <input
            id="email"
            type="email"
            placeholder="E-mail address"
            value={form.email}
            onChange={handleChange}
            className={!isValidEmail && form.email ? styles.invalid : ''}
            required
          />
          <input
            id="number"
            type="tel"
            placeholder="Номер телефону"
            value={form.number}
            onChange={handleChange}
            className={!isValidPhone && form.number ? styles.invalid : ''}
            required
          />
          <input
            id="birthday"
            type="text"
            placeholder="Ваш вік (ДД.ММ.РРРР)"
            value={form.birthday}
            onChange={handleChange}
            className={!isValidBirthday && form.birthday ? styles.invalid : ''}
            required
          />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            className={form.password && form.confirmPassword && !passwordsMatch ? styles.invalid : passwordsMatch && form.password ? styles.valid : ''}
            required
          />
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Підтвердіть пароль"
            value={form.confirmPassword}
            onChange={handleChange}
            className={form.password && form.confirmPassword && !passwordsMatch ? styles.invalid : passwordsMatch && form.confirmPassword ? styles.valid : ''}
            required
          />

          <div className={styles['checkbox-container']}>
            <input
              type="checkbox"
              id="show-password"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password">Показати пароль</label>
          </div>

          <button className={styles['reg-bt']} type="submit">Зареєструватись</button>
        </form>

        <div className={styles['register-link']}>
          У вас вже є акаунт? <Link to="/login">Увійти тут</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
