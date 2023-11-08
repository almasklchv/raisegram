'use client'
import React, { useRef, useState } from "react";
import styles from "../styles/CardIdea.module.scss";
import stylesFromPost from "../styles/Post.module.scss";
import Image from "next/image";
import Modal from "./Modal";
import ContentImage from "./ContentImage";
import classNames from "classnames";
import axios from "axios";
import moment from "moment";

const CardIdea = ({ ideasArr, indexOfArr, ...props }) => {
  const [isPostModalOpened, setIsPostModalOpened] = useState(false);
  const [imageSrc, setImageSrc] = useState('')
  const [textGenerated, setTextGenerated] = useState(false)
  const [imageGenerated, setImageGenerated] = useState(false)
  const iconRef = useRef(null);
  const descriptionRef = useRef(null);
  const [postText, setPostText] = useState('')


  const openPostModal = () => {
    setIsPostModalOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closePostModal = () => {
    setIsPostModalOpened(false);
    document.body.style.overflow = "unset";
  };

  const copyText = () => {
    navigator.clipboard.writeText(descriptionRef.current.innerText).then(() => {
      iconRef.current.src = "/assets/icons/check-mark.svg";
      setTimeout(() => {
        iconRef.current.src = "/assets/icons/copy.svg";
      }, 400);
    });
  };

  const getPostFromApi = async (topic, keywords) => {
    try {
      await axios.post("https://raisegram-api-j38q.onrender.com/api/ai/text/", {
        topic,
        keywords,
      }).then((response) => {
        // descriptionRef.current.innerText = response.data.reply;
        setTextGenerated(true)
        setPostText(response.data.reply)
        getImageFromApi(response.data.reply);
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
          setImageGenerated(true)
          const userFromLocalStorage = JSON.parse(
            localStorage.getItem("user")
          ).data;
          const authorId = userFromLocalStorage["id"];
          axios.post("https://raisegram-api-j38q.onrender.com/api/post/", {
            authorId: authorId,
            title: ideasArr[indexOfArr]['topic'],
            keywords: ideasArr[indexOfArr]['keywords'],
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

  const handleBtnClicked = () => {
    setIsPostModalOpened(true);
    getPostFromApi(ideasArr[indexOfArr]['topic'], ideasArr[indexOfArr]['keywords'])
  };

  return (
    <div>
      {" "}
      <div className={styles.card}>
        <div className={styles.theme}>
          <h3 className={styles.topic}>{props.topic.slice(0, 50)}...</h3>
          <p className={styles.keywords}>{props.keywords.slice(0, 50)}...</p>
        </div>

        <div className={styles.btn} onClick={handleBtnClicked}>
          <Image
            src={"/assets/icons/idea-post-generate.png"}
            alt="generate post icon"
            width={88}
            height={88}
            className={styles.generateIcon}
          />
          <p className={styles.btnDescription}>
            ДАЙ ПОСТ
          </p>
        </div>
      </div>
      {isPostModalOpened && (
        <Modal isOpen={openPostModal} onClose={closePostModal}>
          <div className={classNames(stylesFromPost.postModal)}>
            <Image
              ref={iconRef}
              onClick={copyText}
              className={stylesFromPost.icon}
              src={"/assets/icons/copy.svg"}
              alt="copy icon"
              width={35}
              height={35}
            />
            <p ref={descriptionRef} className={stylesFromPost.description}>
              {!textGenerated && 'Генерация...'}
              {textGenerated && postText}
            </p>
          </div>
          {imageGenerated && (<ContentImage marginTop={"-150px"} imageSrc={imageSrc} />)}
          {!imageGenerated && (<ContentImage marginTop={"-150px"} imageSrc={'/assets/images/loader.gif'} />)}
        </Modal>
      )}
    </div>
  );
};

export default CardIdea;
