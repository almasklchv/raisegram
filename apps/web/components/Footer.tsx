import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer>
        <Image 
            className='footer__logo'
            src={'/assets/images/WeMadeItInKZ_black.png'}
            alt='Made in Kazakhstan Logo'
            width={246}
            height={126.44}
        />
        <div className="footer__text">
            <p>© Все права защищены.</p>
            <p style={{marginRight: '10%'}}>2023</p>
            <p>Raisegram</p>
        </div>
    </footer>
  )
}

export default Footer