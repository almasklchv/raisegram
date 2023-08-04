"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
import Profile from "./Profile";
import Auth from "./Auth";
import Modal from "./Modal";
import styles from "../styles/Header.module.scss";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  let userFromLocalStorage = null;
  

  const checkUser = async () => {
    await axios
      .post("https://raisegram.ctw.re/api/users/check", null, {
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
    setIsAuthModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    document.body.style.overflow = "unset";
    router.push("/generate");
  };

  

  useEffect(() => {
    userFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    if (userFromLocalStorage) {
      setIsLogged(true);
      checkUser();
    } else {
      setIsLogged(false);
      router.push("/");
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
          className={styles.logo}
        />
      </Link>

      <div className="header__navigation">
        <Nav openAuthModal={openAuthModal} />
        {isLogged && <Profile setIsOpened={setIsOpened} isOpened={isOpened} />}
        {isLogged && isOpened && <DropdownMenu setIsLogged={setIsLogged} />}
        {!isLogged && (
          <button className={styles.btn} onClick={openAuthModal}>
            РЕГИСТРАЦИЯ
          </button>
        )}
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
