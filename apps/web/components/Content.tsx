"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "../styles/Content.module.scss";
import axios from "axios";
import ContentImage from "./ContentImage";
import moment from 'moment';

const Content = ({ topic, keywords, generateClicked, setGenerateClicked }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const descriptionRef = useRef(null);
  const iconRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  

  const getPostFromApi = async (topic, keywords) => {
    try {
      await axios.post("https://raisegram-api-j38q.onrender.com/api/ai/text/", {
        topic,
        keywords,
      }).then((response) => {
        descriptionRef.current.innerText = response.data.reply;
        getImageFromApi(descriptionRef.current.innerText);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getImageFromApi = async (text) => {
    try {
      await axios
        .post("https://raisegram-api-j38q.onrender.com/api/ai/image/", text)
        .then((response) => {
          setImageSrc(response.data);
          setImageLoaded(true);
          const userFromLocalStorage = JSON.parse(
            localStorage.getItem("user")
          ).data;
          const authorId = userFromLocalStorage["id"];
          axios.post("http://localhost:3333/api/post/", {
            authorId: authorId,
            title: topic,
            keywords: keywords,
            imageUrl: response.data,
            date: moment().format('DD-MM-YYYY'),
            post: descriptionRef.current.innerText,
          });
        });
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  useEffect(() => {
    if (generateClicked === "true") {
      descriptionRef.current.innerText = "Генерация...";
      getPostFromApi(topic, keywords);
      setGenerateClicked("");
      setImageLoaded(false);
    }
  }, [generateClicked]);

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
      <div
        id="content"
        className={classNames("message__content", styles.message__content)}
      >
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
      {!imageLoaded && <ContentImage imageSrc={"/assets/images/loader.gif"} />}
    </div>
  );
};

export default Content;
