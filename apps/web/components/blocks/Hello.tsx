import React from "react";
import styles from "../../styles/Hello.module.scss";
import PrimaryTextInput from "../inputs/PrimaryTextInput";
import SecondaryTextInput from "../inputs/SecondaryTextInput";
import SecondaryButton from "../buttons/SecondaryButton";

const Hello = ({ onTopicChange, onKeywordsChange, onGenerateClicked }) => {
  let topic = '';
  let keywords = '';

  const handleTopicChange = (event) => {
    topic = event.target.value
    onTopicChange(topic);
  };

  const handleKeywordsChange = (event) => {
    keywords = event.target.value
    onKeywordsChange(keywords);
  };

  const handleGenerateClicked = () => {
    let isNotEmpty = true;
    document.querySelectorAll('.custom-text').forEach((elem: HTMLInputElement) => {
      if (elem.value == '') {
        isNotEmpty = false;
      }
    })
    if (isNotEmpty) {
      onGenerateClicked('true')
    } else {
      const fillAllElements: HTMLParagraphElement = document.querySelector('.fillAllElements')
      fillAllElements.style.display = 'inline';
      setTimeout(() => {
        fillAllElements.style.display = 'none';
      }, 1500)
    }
    
  }


  return (
    <div className="hello">
      <h1 className={styles.title}>Привет, я Raisegram AI!</h1>
      <p className={styles.description}>
        Я помогу вам с созданием контента <br></br> для вашего инстаграма :)
      </p>
      <PrimaryTextInput
        placeholder="Введите тему..."
        onChange={handleTopicChange}
      />
      <SecondaryTextInput
        placeholder="Введите ключевые слова..."
        onChange={handleKeywordsChange}

      />
      <SecondaryButton onClick={handleGenerateClicked}>Сгенерировать</SecondaryButton>
      <p className="fillAllElements" style={{display: 'none'}}>Заполните все поля!</p>
    </div>
  );
};

export default Hello;
