import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inika } from "@next/font/google";
import { useRouter } from "next/navigation";

const inika = Inika({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Nav = () => {
  const router = useRouter();
  const handleGenerateRoute = (e) => {
    e.preventDefault();
    if (localStorage.getItem("user")) {
      router.push("/generate");
    } else {
    }
  };
  return (
    <nav>
      <ul className="navigation__list">
        <li>
          <Link href={"/"} className={"navigation__link"}>
            Главная
          </Link>
        </li>
        <li>
          <Link
            onClick={handleGenerateRoute}
            href={"#"}
            className="navigation__link"
          >
            Генерация
          </Link>
        </li>
        <div className="navigation__social">
          <li>
            <a
              href="https://www.instagram.com/almasklchv/"
              className="navigation__link"
            >
              <Image
                src={"/assets/icons/instagram.svg"}
                alt="instagram icon"
                width={32}
                height={32}
              />
            </a>
          </li>
          <li>
            <a
              href="https://t.me/thisismywayto_ru"
              className="navigation__link"
            >
              <Image
                src={"/assets/icons/telegram.svg"}
                alt="instagram icon"
                width={41}
                height={41}
              />
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
