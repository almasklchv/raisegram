"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import Profile from "./Profile";
import Auth from "./Auth";
import Modal from "./Modal";
import styles from '../styles/Header.module.scss'
import axios from "axios";

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

  const checkUser = async () => {
    await axios.post("http://localhost:3333/users/check", null, {
      params: {
        email: userFromLocalStorage.data.email,
        hash: userFromLocalStorage.data.password,
      },
    }).then((user) => {
      if (user.data == '') {
        setIsLogged(false)
        localStorage.removeItem('user');
      }
    });
  }

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    document.body.style.overflow = 'hidden'
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    if (userFromLocalStorage) {
      setIsLogged(true);
      checkUser()
    }
  }, []);

  return (
    <header>
      <Link href="/">
        <Image
          src={"/assets/images/logo.svg"}
          alt="Raisegram Logo"
          width={62.29}
          height={115.29}
        />
      </Link>

      <div className="header__navigation">
        <Nav />
        {isLogged && <Profile />}
        {!isLogged && <button className={styles.btn} onClick={openAuthModal}>РЕГИСТРАЦИЯ</button>}
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
    </header>
  );
};

export default Header;
