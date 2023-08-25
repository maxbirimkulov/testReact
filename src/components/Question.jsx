import React from 'react';
import styles from './question.module.css';


const Question = ({ register, item }) => {
  return (
    <div className={styles.questionContainer}>
      <h2>{item.question}</h2>
      <ul className={styles.optionsList}>
        {item.options
          .reduce((acc, currentValue) => {
            const randomIndex = Math.floor(Math.random() * (acc.length + 1));
            acc.splice(randomIndex, 0, currentValue);
            return acc;
          }, [])
          .map((el) => (
            <li key={el.text} className={styles.optionItem}>
              <label className={styles.optionLabel}>
                <input

                  className={styles.radioInput}
                  required
                  value={JSON.stringify(el)}
                  {...register(`${item.question}`)}
                  type='radio'
                />
                {el.text}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Question;
