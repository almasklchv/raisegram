import React, { useEffect, useState } from "react";
import styles from "../styles/BottomNavigationMenu.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Modal from "./Modal";
import Auth from "./Auth";

const BottomNavigationMenu = () => {
  const router = useRouter();

  const [home, setHome] = useState("home");
  const [generate, setGenerate] = useState("generate");
  const [history, setHistory] = useState("history");
  const [isChanged, setIsChanged] = useState(window.location.pathname);

  useEffect(() => {
    
    if (isChanged == "/") {
      setHome("home-active");
      setGenerate("generate");
      setHistory("history");
    } else if (isChanged == "/generate" ) {
      setGenerate("generate-active");
      setHome("home");
      setHistory("history");
    } else if (isChanged == "/history") {
      setHistory("history-active");
      setHome("home");
      setGenerate("generate");
    }
  }, [isChanged]);

  const [isLogged, setIsLogged] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  let userFromLocalStorage = null;

  

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    document.body.style.overflow = "unset";
    router.push("/generate");
  };

  const handleGenerateRoute = (e) => {
    e.preventDefault();
    if (localStorage.getItem("user")) {
      setIsChanged("/generate");
      router.push("/generate");
    } else {
      openAuthModal();
    }
  };

  const handleHomeRoute = (e) => {
    e.preventDefault();
    setIsChanged("/");
    router.push("/");
  };

  const handleHistoryRoute = (e) => {
    e.preventDefault();
    if (localStorage.getItem("user")) {
      setIsChanged("/history");
      window.location.href = `/history?user_id=${JSON.parse(localStorage.getItem('user')).data.id}`
    } else {
      openAuthModal();
    }
  };

  return (
    <div>
      <div className={styles.bottomNavigationMenu}>
        <div className={styles.menu}>
          <Image
            src={`/assets/icons/${home}.png`}
            alt={"home page"}
            width={40}
            height={40}
            className={styles.home}
            onClick={handleHomeRoute}
          />
          <Image
            src={`/assets/icons/${generate}.png`}
            alt={"generate page"}
            width={38}
            height={38}
            className={styles.generate}
            onClick={handleGenerateRoute}
          />
          <Image
            src={`/assets/icons/${history}.png`}
            alt={"history page"}
            width={40}
            height={40}
            className={styles.history}
            onClick={handleHistoryRoute}
          />
        </div>
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

export default BottomNavigationMenu;
