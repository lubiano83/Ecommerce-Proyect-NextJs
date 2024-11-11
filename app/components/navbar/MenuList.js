"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SvgImage from '../SvgImage';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const MenuList = ({ show, handleShow, isDarkMode }) => {

  const path = usePathname();
  const { user, logout } = useAuth();

  const logoutUser = (token) => {
    try {
        // const token = Cookies.get("coderCookieToken");  // Obtén el token de la cookie como una cadena
        console.log("Token obtenido:", token);

        if (!token) {
            console.error("No se encontró un token de sesión.");
            return;
        }

        logout(token);  // Llama a la función de logout pasando el token
        Cookies.remove("coderCookieToken");  // Elimina la cookie del navegador
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
  };

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
          <Link href={"/"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/" ? "underline" : "no-underline"}`}>Inicio</div></Link>
          <Link href={"/pages/products"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/pages/products" ? "underline" : "no-underline"}`} >Tienda</div></Link>
          <Link href={"/pages/contact"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/pages/contacto" ? "underline" : "no-underline"}`}>Contacto</div></Link>
          <Link href={"/views/auth/register"} className='text-white p-2 hover:text-gray-700 font-bold'>Register</Link>
          <Link href={"/views/auth/login"}><div className={`text-white p-2 hover:text-gray-700 font-bold ${path === "/pages/login" ? "underline" : "no-underline"}`}>Login</div></Link> 
          <p onClick={logoutUser} className='text-white p-2 hover:text-gray-700 font-bold'>Salir</p>
        </ul>
      </aside>
    </div>
  )
}; export default MenuList;