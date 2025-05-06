import { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';
import styles from '../styles/exhibitionSingle.module.css';
import axios from 'axios';


const ExhibitionSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchSingleExhibition } = useContext(ExhibitionsContext);
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Отримання даних користувача з JWT
  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('jwtToken');  // Або отримання токена з куки
      const response = await axios.get('/api/user-id/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
          //'Content-Type': 'multipart/form-data'
        },
      });
      setCurrentUser(response.data);  // Зберігаємо дані користувача
    } catch (error) {
      console.error("Не вдалося отримати дані користувача", error);
    }
  };

  useEffect(() => {
    const loadExhibition = async () => {
      try {
        if (id.startsWith('local-')) {
          const staticExh = staticExhibitions.find(ex => ex.id === id);
          setExhibition(staticExh);
        } else {
          const data = await fetchSingleExhibition(id);
          setExhibition(data);
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setLoading(false);
      }
    };
    loadExhibition();
    getCurrentUser(); 
  }, [id]);
  
  // Цей ефект залишаємо без змін - він відповідає за фон
  useEffect(() => {
    if (exhibition) {
      const imageUrl = exhibition.image instanceof File ? 
        URL.createObjectURL(exhibition.image) : 
        exhibition.image;
      
      document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
    }
    
    return () => {
      document.body.style.removeProperty('--bg-image');
    };
  }, [exhibition]);

  if (loading) return <div className={styles.loading}>Завантаження...</div>;
  if (!exhibition) return <div className={styles.error}>Виставку не знайдено</div>;

  const isOwner = currentUser && exhibition.user === currentUser.user_id;

  return (
    <section className={styles.exhibitionSingle}>
      <div className={styles.header}>
        {isOwner && (
            <button 
              onClick={() => navigate(`/edit-exhibition/${id}`)}
              className={styles.editButton}
            >
              Редагувати
            </button>
          )}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{exhibition.title}</h2>
        <img 
          src={exhibition.image instanceof File ? URL.createObjectURL(exhibition.image) : exhibition.image} 
          alt={exhibition.title} 
          className={styles.image}
        />
                  <p className={styles.dates}>
            {exhibition.date || `${exhibition.start_date} - ${exhibition.end_date}`}
          </p>
        <div className={styles.details}>
          <p className={styles.description}>{exhibition.description}</p>
          
          <div className={styles.interactions}>
            <LikeButton exhibitionId={id} />
          </div>
        </div>
      </div>

      <CommentSection exhibitionId={id} />
    </section>
  );
};

export default ExhibitionSingle;
