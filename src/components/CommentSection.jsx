import { useState, useEffect } from 'react';
import styles from '../styles/commentSection.module.css';
import axios from 'axios';

// API налаштування
const API = {
  baseUrl: '/api', 
  endpoints: {
    getComments: (exhibitionId) => `/exhibitions/${exhibitionId}/comments`,
    addComment: (exhibitionId) => `/exhibitions/${exhibitionId}/comments`,
  }
};

const CommentSection = ({ exhibitionId }) => {
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Отримання коментарів
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API.baseUrl}${API.endpoints.getComments(exhibitionId)}`);
        
        console.log('Отримані коментарі:', response.data); // Логування отриманих даних
        
        // Перевірка, чи це масив
        const data = Array.isArray(response.data) ? response.data : [];
        setComments(data); // Встановлення даних як масив
      } catch (err) {
        setError('Не вдалося завантажити коментарі');
        console.error('Помилка:', err);
      } finally {
        setLoading(false);
      }
    };

    if (exhibitionId) {
      fetchComments();
    }
  }, [exhibitionId]);

  // Додавання коментаря
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const token = localStorage.getItem('access');
    const commentData = {
      text: newComment,
      exhibition: exhibitionId
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${API.baseUrl}${API.endpoints.addComment(exhibitionId)}`,
        commentData,
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {} // Анонімний користувач
        }
      );
      
      // Додавання нового коментаря до списку
      setComments(prev => [...prev, response.data]);
      setNewComment('');
    } catch (err) {
      setError('Не вдалося додати коментар');
      console.error('Помилка:', err);
    } finally {
      setLoading(false);
    }
  };

  // Перевірка, чи comments - це масив
  if (!Array.isArray(comments)) {
    console.error('comments не є масивом:', comments);
  }

  return (
    <div className={styles.commentSection}>
      <h3>Коментарі ({comments.length})</h3>

      {error && <div className={styles.error}>{error}</div>}

      <ul className={styles.commentList}>
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <p className={styles.commentText}>{comment.text}</p>
              <div className={styles.commentMeta}>
                <span className={styles.author}>
                  {comment.author_name }
                </span>
                <span className={styles.date}>
                  {new Date(comment.created_at).toLocaleString()}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>Немає коментарів</p>
        )}
      </ul>

      <div className={styles.commentForm}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Залиште ваш коментар..."
          className={styles.commentInput}
          disabled={loading}
        />
        <button
          onClick={handleAddComment}
          className={styles.commentSubmit}
          disabled={loading || !newComment.trim()}
        >
          {loading ? 'Надсилання...' : 'Відправити'}
        </button>
      </div>
    </div>
  );
};

export default CommentSection;

