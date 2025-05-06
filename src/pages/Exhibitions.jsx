import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExhibitionsContext } from '../context/ExhibitionsContext';
import styles from '../styles/exhibitions.module.css';

const Exhibitions = () => {
  const {
    exhibitions,
    loading,
    error,
    totalPages,
    fetchExhibitions
  } = useContext(ExhibitionsContext);

  const [currentPage, setCurrentPage] = useState(1);

  // Завантаження виставок при зміні сторінки
  useEffect(() => {
    fetchExhibitions(currentPage);
  }, [currentPage]);

  return (
    <section className={styles.exhibition}>
      <div className={styles['exhibition-section']}>
        <div className={styles['text-container']}>
          <h1>
            <strong>Перелік Виставок</strong>
          </h1>
          <p>
            Виставки створюють унікальні можливості для вивчення, враження та
            взаємодії з різними сферами. <br />
            Мистецтва, науки та культури.
          </p>
        </div>

        {loading && <p>Завантаження...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {exhibitions.map((item, index) => (
          <div className={styles['section-img']} key={item.id || index}>
            <div className={styles['exh-container']}>
              <div className={styles['exh-img']}>
                <Link to={`/exhibition/${item.id}`}>
                  <img
                    src={item.image instanceof File ? URL.createObjectURL(item.image) : item.image}
                    alt={item.title}
                    className={styles['exh-img-item']}
                  />
                </Link>
              </div>
              <div className={styles['exh-text']}>
                <Link to={`/exhibition/${item.id}`} className={styles['exh-link']}> 
                  <h1>{item.title}</h1>
                </Link>
                <h2>{item.date || `${item.start_date} - ${item.end_date}`}</h2>
              </div>
            </div>
          </div>
        ))}

        <div className={styles['pagination-container']}>
          <nav>
            <ul className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`${styles['page-item']} ${currentPage === i + 1 ? styles.active : ''}`}
                >
                  <button
                    className={styles['page-link']}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;


