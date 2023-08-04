"use client";
import React, { useState } from "react";
import styles from "../../styles/Ideas.module.scss";
import stylesFromHello from "../../styles/Hello.module.scss";
import stylesFromContentImage from "../../styles/ContentImage.module.scss";
import PrimaryTextInput from "../inputs/PrimaryTextInput";
import SecondaryButton from "../buttons/SecondaryButton";
import { useRouter } from "next/navigation";
import CardIdea from "../CardIdea";
import axios from "axios";
import Image from "next/image";
import classNames from "classnames";

const Ideas = ({ setIsIdea, handleBackClicked, onGenerateClicked }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState([]);

  const onBackClicked = () => {
    setIsIdea(false);
    handleBackClicked();
  };

  const handleGenerateClicked = () => {
    let isNotEmpty = true;
    const categoryInput: HTMLInputElement =
      document.querySelector(".custom-text");
    console.log(categoryInput);
    if (categoryInput.value == "") {
      isNotEmpty = false;
    }
    if (isNotEmpty) {
      onGenerateClicked("true");
      setIsGenerating(true);
      setIsWaiting(false);
      if (ideas) {
        setIdeas([]);
      }
      getIdeasFromApi(categoryInput.value);
    } else {
      const fillAllElements: HTMLParagraphElement =
        document.querySelector(".fillAllElements");
      fillAllElements.style.display = "inline";
      setTimeout(() => {
        fillAllElements.style.display = "none";
      }, 1500);
    }
  };

  const getIdeasFromApi = async (category: string) => {
    const ideas: any = await axios.post(
      "https://raisegram.ctw.re/api/ai/idea",
      category
    );
    setIdeas(ideas["data"]);
    setIsGenerating(false);
  };

  return (
    <div className="hello">
      <button className="btn_back" onClick={onBackClicked}>
        ‹
      </button>
      <h1 className={stylesFromHello.title}>Нету идей? Не проблема!</h1>
      <p className={stylesFromHello.description}>
        Напиши свою категорию, <br></br> и я тебе предоставлю 15 идей для постов
      </p>
      <PrimaryTextInput placeholder="eg. IT" />
      <SecondaryButton onClick={handleGenerateClicked} disabled={isGenerating}>
        Дай идеи
      </SecondaryButton>
      <p className={stylesFromHello.clickLimit}>
        Нажатия на кнопку - 1 раз в минуту
      </p>
      <p className="fillAllElements" style={{ display: "none" }}>
        Заполните все поля!
      </p>

      <div className={classNames(styles.cards, "cards")}>
        {Boolean(ideas.length) &&
          ideas.map((idea, index) => (
            <CardIdea
              ideasArr={ideas}
              indexOfArr={index}
              key={index}
              {...idea}
            />
          ))}
        {isWaiting && (
          <p
            className={stylesFromHello.description}
            style={{ color: "rgba(201, 125, 37, 0.85)" }}
          >
            Жду вашего запроса :)
          </p>
        )}
        {isGenerating && (
          <div
            className={stylesFromContentImage.message__content}
            style={{
              maxWidth: "70vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              className={stylesFromHello.description}
              style={{ color: "rgba(31, 169, 86, 0.85)", maxWidth: "50%" }}
            >
              Сейчас все будет готово, дайте нам 1 минуту...
            </p>
            <Image
              className={classNames(stylesFromContentImage.poster, "poster")}
              src={"/assets/images/loader.gif"}
              alt={"loader"}
              width={500}
              height={508.214}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ideas;
