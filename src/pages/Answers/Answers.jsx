import React, { useEffect, useState } from 'react';
import styles from './answers.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Answers = () => {
  const [answers, setAnswers] = useState([]);
  const [filteredSortedAnswers, setFilteredSortedAnswers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    axios('http://localhost:4444/answers').then(({ data }) => {
      setAnswers(data);
      setFilteredSortedAnswers(data);

      const uniqueCategories = [...new Set(data.map((item) => item.category))];
      setCategories(uniqueCategories);
    });
  }, []);

  useEffect(() => {
    let filtered = answers;

    if (selectedCategory !== 'all') {
      filtered = answers.filter((item) => item.category === selectedCategory);
    }

    const sortedAnswers = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'category-abc':
          return a.category.localeCompare(b.category);
        case 'category-cba':
          return b.category.localeCompare(a.category);
        case 'point-more':
          return b.point - a.point;
        case 'point-lower':
          return a.point - b.point;
        default:
          return 0;
      }
    });

    setFilteredSortedAnswers(sortedAnswers);
  }, [sortBy, selectedCategory, answers]);

  return (
    <div>
      <Link to='/' className={styles.link}>
        Назад
      </Link>
      <h2 className={styles.title}>Ответы</h2>

      <div className={styles.filters}>
        <label className={styles.label}>
          Фильтр по категории:
          <select
            className={styles.select}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value='all'>All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Сортировать по:
          <select
            className={styles.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <option value='none'>Не сортировать</option>
            <option value='category-abc'>Категории (ABC)</option>
            <option value='category-cba'>Категории (CBA)</option>
            <option value='point-more'>Наибольшим баллам</option>
            <option value='point-lower'>Наименьшим баллам</option>
          </select>
        </label>
      </div>

      <div className={styles.block}>
        <table className={styles.table}>
          <tr className={styles.row}>
            <th className={styles.td}>USER ID</th>
            <th className={styles.td}>NAME</th>
            <th className={styles.td}>CATEGORY</th>
            <th className={styles.td}>POINT</th>
            <th className={styles.td}>ACTION</th>
          </tr>

          {filteredSortedAnswers.map((item) => (
            <tr key={item.id}>
              <td className={styles.td}>{item.id}</td>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>{item.category}</td>
              <td className={styles.td}>{item.point}</td>
              <td className={styles.td}>
                  <Link to={`/answer/${item.category}/${item.name}/${item.id}`}>Посмотреть ответы</Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Answers;
