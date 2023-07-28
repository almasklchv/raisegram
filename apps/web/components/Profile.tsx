import React from "react";
import Image from "next/image";

const Profile = ({ setIsOpened, isOpened }) => {
  const handleDropdownMenu = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="profile" onClick={handleDropdownMenu}>
      <Image
        src={"/assets/images/profile.svg"}
        alt="profile"
        width={37}
        height={37}
        className="profile__icon"
      />
      <span className="profile__name">Профиль</span>
    </div>
  );
};

export default Profile;
