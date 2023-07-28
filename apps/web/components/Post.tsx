import React, { useRef, useState } from "react";
import styles from "../styles/Post.module.scss";
import Image from "next/image";
import { all } from "axios";
import Modal from "./Modal";
import classNames from "classnames";
import ContentImage from "./ContentImage";

const Post = ({ title, keywords, imageUrl, post, date }) => {
  const [isPostModalOpened, setIsPostModalOpened] = useState(false);
  const iconRef = useRef(null);
  const descriptionRef = useRef(null);


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

  return (
    <div className={styles.postContainer}>
      <div className={styles.first}>
        <Image
          src={imageUrl}
          alt={"post image"}
          width={121.012}
          height={123}
          className={styles.postImage}
        />
        <p className={styles.small}>{date}</p>
      </div>
      <div className={styles.second}>
        <h4 className={styles.title}>{title.slice(0, 40)}</h4>
        <h5 className={styles.keywords}>{keywords.slice(0, 40)}...</h5>
      </div>
      <div className={styles.third} onClick={openPostModal}>
        <Image
          src={"/assets/icons/open.svg"}
          alt="open icon"
          width={108}
          height={108}
          className={styles.openImage}
        />
        <p className={classNames(styles.small, styles.open)}>ОТКРЫТЬ</p>
      </div>
      {isPostModalOpened && (
        <Modal isOpen={openPostModal} onClose={closePostModal}>
          <div className={classNames(styles.postModal)}>
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
              {post}
            </p>
          </div>
          <ContentImage marginTop={'-150px'} imageSrc={imageUrl}/>
        </Modal>
      )}
    </div>
  );
};

export default Post;
