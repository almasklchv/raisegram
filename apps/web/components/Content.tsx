"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "../styles/Content.module.scss";
import axios from "axios";

const Content = ({ topic, keywords, generateClicked }) => {
  const descriptionRef = useRef(null);
  const iconRef = useRef(null);
  const getPostFromApi = (topic: string, keywords: string) => {
    axios
      .post("http://localhost:3333/ai/text/", null, {
        params: {
          topic,
          keywords,
        },
      })
      .then((data) => {
        console.log(data);
        descriptionRef.current.innerText = data.data.reply;
      });
  };

  useEffect(() => {
    if (generateClicked === "true") {
      descriptionRef.current.innerText = "Генерация...";
      getPostFromApi(topic, keywords);
    }
  }, [topic, keywords, generateClicked]);

  const copyText = () => {
    navigator.clipboard.writeText(descriptionRef.current.innerText).then(() => {
      iconRef.current.src = "/assets/icons/check-mark.svg";
      setTimeout(() => {
        iconRef.current.src = "/assets/icons/copy.svg";
      }, 400);
    });
  };

  return (
    <div className={classNames("message__content", styles.message__content)}>
      <Image
        ref={iconRef}
        onClick={copyText}
        className={styles.icon}
        src={"/assets/icons/copy.svg"}
        alt="copy icon"
        width={35}
        height={35}
      />
      <p ref={descriptionRef} className={styles.description}>
        Жду вашего запроса :)
      </p>
    </div>
  );
};

export default Content;
