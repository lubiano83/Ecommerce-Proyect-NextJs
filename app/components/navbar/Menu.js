"use client";
import React from 'react';
import MenuList from './MenuList';
import { useShow } from '@/app/hooks/useShow';
import Image from 'next/image';

const Menu = ({ isDarkMode }) => {

    const { show, handleShow } = useShow();

  return (
    <div onClick={ handleShow }>
        <Image
        src={"/menu-svgrepo-com.svg"}
        alt="menu logo"
        height={35}
        width={35}
        className="hover:scale-110 cursor-pointer"
      />
        <MenuList handleShow={ handleShow } show={ show } isDarkMode={ isDarkMode } />
    </div>
  )
}

export default Menu;