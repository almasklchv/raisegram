import React from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import Image from "next/image";
import styles from '../../styles/Introduce.module.scss';

const Introduce = () => {
  return (
    <div className={styles.introduce}>
        <div className={styles.first}>
          <h1 className={styles.title}>Прокачай<br/>свой Instagram сэкономив кучу времени!</h1>
          <p>Генерация постов/картинок за секунды.</p>
          <p>Бесплатно и 100% безопасно.</p>
          <PrimaryButton>Начать прокачку</PrimaryButton>
        </div>
        <div>
          <Image 
            src={'/assets/images/smartphone.svg'}
            alt="hand and smartphone"
            width={771.67}
            height={1048.341}
          />
        </div>
      </div>
  )
}

export default Introduce