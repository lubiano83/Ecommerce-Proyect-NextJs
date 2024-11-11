import React from 'react';
import Logo from '../Logo';

const Footer = () => {
  return (
    <div className='bg-green-700 flex justify-between items-center px-8 py-4'>
        <h3 className='text-white'>#Todos los Derechos Reservados</h3>
        <Logo />
    </div>
  )
}

export default Footer;