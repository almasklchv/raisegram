import React from "react";
import Image from "next/image";
import Content from "../Content";
import ContentImage from "../ContentImage";
import styles from '../../styles/Messages.module.scss'

const Messages = ({isText, topic, keywords, generateClicked, setGenerateClicked}) => {
  return (
    <div className={styles.message}>
      <Image
        src={"/assets/images/bot.svg"}
        alt="profile photo"
        width={100}
        height={100}
      />
      <Content topic={topic} keywords={keywords} generateClicked={generateClicked} setGenerateClicked={setGenerateClicked}/> 
    </div>
    
  );
};

export default Messages;
