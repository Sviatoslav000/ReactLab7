import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import styles from '../styles/addExhibition.module.css';

const AddExhibition = () => {
  const navigate = useNavigate();
  const { addExhibition } = useContext(ExhibitionsContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('/img/upload.gif');
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG and PNG files are allowed.');
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB.');
      return;
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      image: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Формуємо об'єкт для відправки
      const exhibitionData = {
        title: formData.title,
        description: formData.description,
        start_date: formData.startDate,
        end_date: formData.endDate,
        image: formData.image
      };

      await addExhibition(exhibitionData);
      navigate('/exhibitions');
    } catch (err) {
      setError(err.message || 'Failed to add exhibition');
    }
  };

  return (
    <section className={styles.addSection}>
      <div className={styles.blockSaveContainer}>
        <div className={styles.saveText}>
          <h1>Додати виставку</h1>
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
                      name="start_date"
                      className={styles.dateInput}
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div className={styles.dateField}>
                    <label htmlFor="end-date" className={styles.dateLabel}>Дата завершення</label>
                    <input
                      type="date"
                      id="end-date"
                      name="end_date"
                      className={styles.dateInput}
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
                    id="imagePreview"
                    src={imagePreview} 
                    alt="Image Preview" 
                    className={styles.previewImage} 
                  />
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                </div>
                <small className={styles.hint}>
                  Лише один файл.<br/> Максимум 5 МБ. <br/>Дозволені формати: png, jpg, jpeg. Мінімальний розмір: 340×200px.<br/>
                  Зображення розміром понад 5000x5000 пікселів будуть змінені у розмірі.
                </small>
              </div>
            </form>
          </div>
        </section>
    );
  };
  
  export default AddExhibition;
