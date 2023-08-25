import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Question from '../../components/Question';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './test.module.css';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios(`http://localhost:4444/questions?category=${params.title}`).then(
      ({ data }) => setQuestions(data)
    );
  }, []);

  const passTest = (data) => {

    const score = Object.values(data).splice(1).filter((item) => JSON.parse(item).correct === true).length;

    axios
      .post('http://localhost:4444/answers', {
        ...data,
        point: score,
        category: params.title,
      })
      .then((res) => console.log(res));

    alert(`${data.name} вы получили - ${score} баллов из ${questions.length}`);

    navigate('/');
  };

  return (
    <div className={styles.testContainer}>
      <h1>Тесты по {params.title}</h1>

      <form onSubmit={handleSubmit(passTest)}>
        <input
          {...register('name')}
          type='text'
          placeholder='Введите свое имя'
        />

        <div className={styles.questionContainer}>
          {questions
            .reduce((acc, currentValue) => {
              const randomIndex = Math.floor(Math.random() * (acc.length + 1));
              acc.splice(randomIndex, 0, currentValue);
              return acc;
            }, [])
            .map((item) => (
              <Question register={register} key={item.question} item={item} />
            ))}
        </div>

        <button type={'submit'} className={styles.submitButton}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Test;
