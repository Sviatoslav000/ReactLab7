import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import styles from '../styles/addExhibition.module.css';
import axios from 'axios';


const API_URL = '/';

const AddOrEditExhibition = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // якщо є — це редагування
  const isEditMode = Boolean(id);

  const { fetchSingleExhibition } = useContext(ExhibitionsContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('/img/upload.gif');
  const [error, setError] = useState(null);

  // Завантаження виставки для редагування
  useEffect(() => {
    if (isEditMode) {
      const loadExhibition = async () => {
        try {
          const data = await fetchSingleExhibition(id);
          setFormData({
            title: data.title,
            description: data.description,
            startDate: data.start_date,
            endDate: data.end_date,
            image: null // Окремо зображення не встановлюємо
          });
          setImagePreview(data.image); // Встановлюємо preview з URL
        } catch (err) {
          setError('Не вдалося завантажити виставку');
        }
      };
      loadExhibition();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Лише JPG або PNG файли дозволено');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Файл перевищує 5MB');
      return;
    }

    setFormData(prev => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('start_date', formData.startDate);
    form.append('end_date', formData.endDate);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}api/exhibitions/one/${id}/`, form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`
              //'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(`${API_URL}api/exhibitions/`, form);
      }
      navigate('/exhibitions');
    } catch (err) {
      setError('Помилка збереження виставки');
      console.error(err);
    }
  };

  return (
    <section className={styles.addSection}>
      <div className={styles.blockSaveContainer}>
        <div className={styles.saveText}>
          <h1>{isEditMode ? 'Редагувати виставку' : 'Додати виставку'}</h1>
        </div>
        <div className={styles.actionButtons}>
          <button type="button" className={styles.save} onClick={handleSubmit}>
            Зберегти
          </button>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.containerInfoAdd}>
        <form className={styles.styledForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Назва виставки <span className={styles.required}>*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Опис</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="5"
            />
          </div>

          <div className={`${styles.formGroup} ${styles.durationGroup}`}>
            <label>Тривалість</label>
            <div className={styles.dateWrapper}>
              <div className={styles.dateField}>
                <label htmlFor="start-date" className={styles.dateLabel}>Дата початку</label>
                <input
                  type="date"
                  id="start-date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div className={styles.dateField}>
                <label htmlFor="end-date" className={styles.dateLabel}>Дата завершення</label>
                <input
                  type="date"
                  id="end-date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.formGroup} ${styles.imageUpload}`}>
            <label htmlFor="image">Зображення</label>
            <div className={styles.imagePreviewContainer}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                className={styles.previewImage} 
              />
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddOrEditExhibition;
