"use client";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Image from "next/image";
import styles from "../../styles/Introduce.module.scss";
import Modal from "../Modal";
import Auth from "../Auth";
import { useRouter } from "next/navigation";
import axios from "axios";

const Introduce = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  let [userFromLocalStorage, setIsUSerFromLocalStorage] = useState(null);

  const checkUser = async () => {
    await axios
      .post("http://localhost:3333/users/check", null, {
        params: {
          email: userFromLocalStorage.data.email,
          hash: userFromLocalStorage.data.password,
        },
      })
      .then((user) => {
        if (user.data == "") {
          setIsLogged(false);
          localStorage.removeItem("user");
        }
        
      });
  };

  const openAuthModal = () => {
    if (!userFromLocalStorage) {
      setIsAuthModalOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      window.location.href = '/generate'
    }
    
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    document.body.style.overflow = "unset";
    window.location.href = "/generate";
  };

  useEffect(() => {
    setIsUSerFromLocalStorage(JSON.parse(localStorage.getItem("user")));
    if (userFromLocalStorage) {
      setIsLogged(true);
      checkUser();
    }
  }, []);

  return (
    <div className={styles.introduce}>
      <div className={styles.first}>
        <h1 className={styles.title}>
          Прокачай
          <br />
          свой Instagram сэкономив кучу времени!
        </h1>
        <p>Генерация постов/картинок за секунды.</p>
        <p>Бесплатно и быстро.</p>
        <PrimaryButton onClick={openAuthModal}>Начать прокачку</PrimaryButton>
      </div>
      <div>
        <Image
          src={"/assets/images/smartphone.svg"}
          alt="hand and smartphone"
          width={771.67}
          height={1048.341}
        />
      </div>
      {isAuthModalOpen && (
        <Modal isOpen={openAuthModal} onClose={closeAuthModal}>
          <Auth
            title={"Регистрация / Вход"}
            input1={"Введите почту..."}
            input2={"Введите пароль..."}
            button={"ВОЙТИ"}
            inputWidth={507}
            inputHeight={70}
            buttonWidth={330}
            buttonHeight={66}
            fontSize={25}
            paddingleft={30}
            onClose={closeAuthModal}
            setIsLogged={setIsLogged}
          />
        </Modal>
      )}
    </div>
  );
};

export default Introduce;
