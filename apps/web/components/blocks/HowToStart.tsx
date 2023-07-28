import React from "react";
import styles from "../../styles/HowToStart.module.scss";
import Image from "next/image";
import classNames from "classnames";

const HowToStart = () => {
  
  return (
    <div>
      <h2 className={styles.title}>
        Как начать работу
        <br />с Raisegram?
      </h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={classNames(styles.circle)}>
            <p className={styles.stepPosition}>01</p>
          </div>
          <p className={styles.stepInfo}>РЕГИСТРАЦИЯ</p>
        </div>
        <div className={classNames(styles.line, styles.lineToTwo)}></div>
        <div className={classNames(styles.step, styles.stepSecond)}>
          <Image
            className={styles.lightning}
            src={"/assets/icons/lightning.svg"}
            alt=""
            width={67}
            height={67}
          />
          <p className={styles.stepInfo}>ВВОД ТЕМЫ</p>
          <div className={classNames(styles.circle)}>
            <p className={styles.stepPosition}>02</p>
          </div>
        </div>
        <div className={classNames(styles.line, styles.lineToThree)}></div>
        <div className={classNames(styles.step, styles.stepThree)}>
          <Image
            className={styles.edit}
            src={"/assets/icons/edit.svg"}
            alt=""
            width={67}
            height={67}
          />
          <div className={classNames(styles.circle)}>
            <p className={styles.stepPosition}>03</p>
          </div>
          <p className={styles.stepInfo}>
            ВВОД КЛЮЧЕВЫХ
            <br />
            СЛОВ
          </p>
        </div>
        <div className={classNames(styles.line, styles.lineToFour)}></div>
        <div className={classNames(styles.step, styles.stepFour)}>
          <Image
            className={styles.search}
            src={"/assets/icons/search.svg"}
            alt=""
            width={67}
            height={67}
          />
          <p className={styles.stepInfo}>ГЕНЕРАЦИЯ</p>
          <div className={classNames(styles.circle)}>
            <p className={styles.stepPosition}>04</p>
          </div>
        </div>
        
        <Image
          className={styles.lineToFive}
          src={"/assets/images/arrow-1.svg"}
          alt={""}
          width={25}
          height={376}
        />
        
        <p className={classNames(styles.stepInfo, styles.stepFiveInfo)}>
          ВАШ ПОСТ ГОТОВ!
        </p>
      </div>
    </div>
  );
};

export default HowToStart;
