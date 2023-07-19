"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "../styles/Content.module.scss";
import axios from "axios";
import ContentImage from "./ContentImage";

const Content = ({ topic, keywords, generateClicked }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const descriptionRef = useRef(null);
  const iconRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');

  const getPostFromApi = async (topic, keywords) => {
    try {
      const { data } = await axios.post("http://localhost:3333/ai/text/", null, {
        params: {
          topic,
          keywords,
        },
      });
      descriptionRef.current.innerText = data.reply;
      const imageUrl = await getImageFromApi(descriptionRef.current.innerText);
      setImageSrc(imageUrl);
      setImageLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getImageFromApi = async (text) => {
    try {
      const { data } = await axios.post("http://localhost:3333/ai/image/", null, {
        params: {
          text,
        },
      });
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
      return '';
    }
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
    <div>
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
      {imageLoaded && <ContentImage imageSrc={imageSrc} />}
      {!imageLoaded && <ContentImage imageSrc={'/assets/images/loader.gif'} />}
    </div>
  );
};

export default Content;

