import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './home.module.css';

const Home = () => {
  const [tests, setTests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await axios('http://localhost:4444/tests');
        setTests(response.data);
      } catch (err) {
        console.error('Error fetching tests: ' + err);
      }
    }

    fetchTests();
  }, []);

  return (
    <div>
      <h1 className={styles.heading}>Приветсвуем на нашем сайте</h1>

      <h2 className={styles.subHeading}>Выберите тест который хотите пройти</h2>

      <div className={styles.cardContainer}>
        {tests.map((item) => (
          <div className={styles.card} key={item.id}>
            <img
              className={styles.image}
              onClick={() => navigate(`test/${item.title}`)}
              src={item.image}
              alt={`${item.title} preview`}
            />

            <h3 className={styles.title}>{item.title}</h3>
          </div>
        ))}
      </div>

      <Link to='/answers' className={styles.link}>
        Посмотреть ответы
      </Link>
    </div>
  );
};

export default Home;
