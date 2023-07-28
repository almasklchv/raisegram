import React from "react";
import styles from "../styles/DropdownMenu.module.scss";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/navigation";

const DropdownMenu = ({ setIsLogged }) => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
  };

  const handleHistory = () => {
    window.location.href = `/history?user_id=${userFromLocalStorage.data.id}`
  }

  return (
    <div>
      <ul className={styles.menu}>
        <li onClick={handleHistory} className={classNames(styles.menu__link, styles.historyLink)}>
          
            История
          
        </li>
        <div className={styles.line}></div>
        <li className={classNames(styles.menu__link, styles.menu__logoutLink)}>
          <Link onClick={handleLogout} href={"#"}>
            Выйти
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
