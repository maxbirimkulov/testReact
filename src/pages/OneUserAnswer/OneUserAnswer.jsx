import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import styles from "../../components/question.module.css";

const OneUserAnswer = () => {

    const {title, name, id} = useParams()

    const [questions, setQuestions] = useState([])

    const [answer, setAnswer] = useState({})

    useEffect(() => {
        axios(`http://localhost:4444/questions?category=${title}`)
            .then(({data}) => setQuestions(data))

        axios(`http://localhost:4444/answers/${id}`)
            .then(({data}) => setAnswer(data))
    }, [])


    if (questions.length && 'name' in answer) {
        return (
            <div style={{paddingLeft:"50px"}}>
                <h2>Ответы {name} по {title}</h2>

                {
                   questions.map((item) => (
                        <div key={item.question} className={styles.questionContainer}>
                            <h2>{item.question}</h2>
                            <ul className={styles.optionsList}>
                                {item.options
                                    .map((el) => {
                                        return (
                                            <li style={{background: el.correct ? 'green' : JSON.parse(answer[item.question]).text === el.text ? 'red' : 'transparent'}} key={el.text} className={styles.optionItem}>
                                                <label className={styles.optionLabel}>
                                                    <input
                                                        className={styles.radioInput}
                                                        value={el.correct}
                                                        defaultChecked={JSON.parse(answer[item.question]).text === el.text}
                                                        disabled
                                                        name={item.question}
                                                        type='radio'
                                                    />
                                                    {el.text}
                                                </label>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    ))
                }



            </div>
        );
    } else {
        return <h2>Loading...</h2>
    }




};

export default OneUserAnswer;