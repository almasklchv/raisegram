import React from 'react'
import Image from 'next/image'

const Profile = () => {
  return (
    <div className="profile">
    <Image
      src={"/assets/images/profile.svg"}
      alt="profile"
      width={37}
      height={37}
    />
    <span className="profile__name">Профиль</span>
  </div>
  )
}

export default Profile