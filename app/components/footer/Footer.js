import React from 'react';
import Logo from '../Logo';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex justify-evenly items-center px-8 py-4 bg-green-700'>
        <h3 className='text-white'>#Todos los Derechos Reservados</h3>
        <Link href={"/"}>
          <Logo />
        </Link>
    </div>
  )
}

export default Footer;