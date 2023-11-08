import React from "react";
import styles from "../styles/Card.module.scss";
import Image from "next/image";

const Card = ({ onClick, ...props }) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.container} onClick={handleCardClick}>
      <div className={styles.cardContainer}>
        <Image src={props.imageUrl} alt="post icon" width={250} height={250} />
        <p className={styles.cardTitle}>{props.title}</p>
      </div>
    </div>
  );
};

export default Card;
