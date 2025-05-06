import { useState, useContext, useEffect } from 'react';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import styles from '../styles/likeButton.module.css';
import axios from 'axios';

const API_URL = '/';

const LikeButton = ({ exhibitionId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loading } = useContext(ExhibitionsContext);

  const API_ENDPOINT = `${API_URL}api/exhibitions/${exhibitionId}/likes/`;

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access');
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return {};
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const token = localStorage.getItem('access');
      const isAuth = Boolean(token);
      setIsAuthenticated(isAuth);

      try {
        const response = await axios.get(API_ENDPOINT, isAuth ? getAuthHeaders() : {});
        setIsLiked(response.data.isLiked || false);
        setLikeCount(response.data.likeCount || 0);
      } catch (error) {
        console.error("Помилка завантаження лайків:", error);
        setIsLiked(false);
        setLikeCount(0);
      }
    };
    fetchLikes();
  }, [exhibitionId]);

  const handleLike = async () => {
    if (loading || !isAuthenticated) return;

    try {
      if (isLiked) {
        await axios.delete(API_ENDPOINT, getAuthHeaders());
        setLikeCount(prev => prev - 1);
      } else {
        await axios.post(API_ENDPOINT, {}, getAuthHeaders());
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Помилка оновлення лайку:", error);
    }
  };

  return (
    <button 
      onClick={handleLike} 
      className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
      disabled={loading || !isAuthenticated}
      title={!isAuthenticated ? "Увійдіть, щоб поставити лайк" : ""}
    >
      {isLiked ? '❤️' : '🤍'} {likeCount}
    </button>
  );
};

export default LikeButton;
