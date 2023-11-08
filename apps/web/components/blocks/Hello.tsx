import React, { useState } from "react";
import styles from "../../styles/Hello.module.scss";
import PrimaryTextInput from "../inputs/PrimaryTextInput";
import SecondaryTextInput from "../inputs/SecondaryTextInput";
import SecondaryButton from "../buttons/SecondaryButton";
import { useRouter } from "next/navigation";

const Hello = ({
  setIsPost,
  handleBackClicked,
  onTopicChange,
  onKeywordsChange,
  onGenerateClicked,
}) => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  let topic = "";
  let keywords = "";

  const onBackClicked = () => {
    setIsPost(false);
    handleBackClicked();
  };

  const handleTopicChange = (event) => {
    topic = event.target.value;
    onTopicChange(topic);
  };

  const handleKeywordsChange = (event) => {
    keywords = event.target.value;
    onKeywordsChange(keywords);
  };

  const handleGenerateClicked = () => {
    let isNotEmpty = true;
    document
      .querySelectorAll(".custom-text")
      .forEach((elem: HTMLInputElement) => {
        if (elem.value == "") {
          isNotEmpty = false;
        }
      });
    if (isNotEmpty) {
      onGenerateClicked("true");
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
      }, 60000);
      router.push("#content");
    } else {
      const fillAllElements: HTMLParagraphElement =
        document.querySelector(".fillAllElements");
      fillAllElements.style.display = "inline";
      setTimeout(() => {
        fillAllElements.style.display = "none";
      }, 1500);
    }
  };

  return (
    <div className="hello">
      <button className="btn_back" onClick={onBackClicked}>
        ‹
      </button>
      <h1 className={styles.title}>Привет, я Raisegram AI!</h1>
      <p className={styles.description}>
        Вам больше не нужно <br></br> тратить время на написание постов
      </p>
      <PrimaryTextInput
        placeholder="eg. Как войти в IT в 2023 году?"
        onChange={handleTopicChange}
      />
      <SecondaryTextInput
        placeholder="eg. Войти в айти в 2023, направления, что нужно"
        onChange={handleKeywordsChange}
      />
      <SecondaryButton onClick={handleGenerateClicked} disabled={isGenerating}>
        Прокачать инсту
      </SecondaryButton>
      <p className={styles.clickLimit}>Нажатия на кнопку - 1 раз в минуту</p>
      <p className="fillAllElements" style={{ display: "none" }}>
        Заполните все поля!
      </p>
    </div>
  );
};

export default Hello;
