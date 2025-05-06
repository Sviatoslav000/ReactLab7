import { useState } from 'react';
import styles from '../styles/contact.module.css';
import { sendcont } from '../context/AuthContext.jsx';

const Contacts = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await sendcont(form);
      if (response) {
        alert("Повідомлення успішно надіслано!");
        setForm({ username: '', email: '', message: '' }); // Очистити форму
      } else {
        alert("Сталася помилка. Спробуйте пізніше.");
      }
    } catch (error) {
      console.error("Помилка при надсиланні форми:", error);
      alert("Помилка підключення до сервера.");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles['contact-container']}>
        <h2><strong>Зв'яжіться з нами</strong></h2>
        <p className={styles['contact-text']}>
          Якщо у вас є запитання щодо використання онлайн-галереї або роботи з виставками, ви можете зв’язатися з нами через цю сторінку.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Ім'я користувача"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="E-mail address"
            value={form.email}
            onChange={handleChange}
            className={!isValidEmail && form.email ? styles.invalid : ''}
            required
          />
          <input
            type="text"
            id="message"
            placeholder="Ваше повідомлення"
            value={form.message}
            onChange={handleChange}
            className={styles.message}
            required
          />
          <button className={styles['send-bt']} type="submit">Надіслати</button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
