import React from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

const Header = () => {
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

        <div className="profile">
          <Image
            src={"/assets/images/profile.svg"}
            alt="profile"
            width={37}
            height={37}
          />
          <span className="profile__name">Almas</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
