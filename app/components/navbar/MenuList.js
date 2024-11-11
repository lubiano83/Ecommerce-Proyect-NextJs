"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SvgImage from '../SvgImage';
import Swal from 'sweetalert2';

const MenuList = ({ show, handleShow, isDarkMode }) => {

  const path = usePathname();
  const { user, logOut } = useAuth();

  const handleMessage = () => {
    if(!user.logged){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Primero debes ingresar con tu cuenta.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className={`${show ? "opacity-100 visible" : "opacity-0 invisible"} transition-all fixed inset-0 bg-black/50 flex justify-start z-20`}>
      <aside className={`${!show ? "translate-x-48" : ""} transition-all w-72 bg-green-700`}>
        <div className='cursor-pointer text-3xl text-white text-right flex justify-end pr-4 pt-4'><div onClick={handleShow} className='w-4 hover:text-gray-700 text-center'>x</div></div>
        <ul style={{ height: 'calc(100vh - 72px)' }} className='flex flex-col gap-4 px-3 pb-10 justify-evenly items-center text-center'>
          { user.logged ? <Link href={`/pages/user/${user.email}`}><SvgImage src={"/user-check-alt-1-svgrepo-com.svg"} /></Link> : <SvgImage handleClick={handleMessage} src={"/user-xmark-alt-1-svgrepo-com.svg"} /> }
          {user.logged && ( <div className="hidden lg:block"><Link href={"/pages/admin"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/pages/admin" ? "underline" : "no-underline"}`}>Admin</div></Link></div> )}
          <Link href={"/"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/" ? "underline" : "no-underline"}`}>Inicio</div></Link>
          <Link href={"/pages/products"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/pages/products" ? "underline" : "no-underline"}`} >Tienda</div></Link>
          <Link href={"/pages/contact"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/pages/contacto" ? "underline" : "no-underline"}`}>Contacto</div></Link>
          <Link href={"/views/auth/register"} className='text-white p-2 hover:text-gray-700 font-bold'>Register</Link>
          { user.logged === true ? <p onClick={logOut} className='text-white p-2 hover:text-gray-700 font-bold'>Salir</p> : <Link href={"/views/auth/login"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/pages/login" ? "underline" : "no-underline"}`}>Login</div></Link> }
        </ul>
      </aside>
    </div>
  )
}; export default MenuList;