import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ExhibitionsContext = createContext();
const API_URL = '/';

export const ExhibitionsProvider = ({ children }) => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchExhibitions = async (page = 1, limit = 3) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}api/exhibitions/pag/`, {
        params: { page, limit }
      });
  
      // Отримуємо виставки з поля 'results'
      setExhibitions(response.data.results || []);
  
      // Обчислюємо кількість сторінок з поля 'count'
      const totalCount = response.data.count;
  
      if (totalCount !== undefined) {
        setTotalPages(Math.ceil(totalCount / limit));
      } else {
        setTotalPages(1); // fallback
      }
  
      setError(null);
    } catch (err) {
      console.error('Помилка при завантаженні виставок:', err);
      setError(err.response?.data?.message || err.message);
      setExhibitions([]);
    } finally {
      setLoading(false);
    }
  }; 

  // Деталі однієї виставки
  const fetchSingleExhibition = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}api/exhibitions/one/${id}/`);
      return response.data;
    } catch (err) {
      console.error('Помилка при завантаженні виставки:', err);
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Створення виставки авторизованим користувачем
  const addExhibition = async (exhibitionData) => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(exhibitionData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${API_URL}api/exhibitions/create/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`
          //'Content-Type': 'multipart/form-data'
        }
      });

      // Якщо бек повертає створену виставку
      setExhibitions(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Помилка при додаванні виставки:', err);
      throw err.response?.data?.message || err.message;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  return (
    <ExhibitionsContext.Provider value={{
      exhibitions,
      loading,
      error,
      totalPages,
      fetchExhibitions,
      fetchSingleExhibition,
      addExhibition
    }}>
      {children}
    </ExhibitionsContext.Provider>
  );
};
