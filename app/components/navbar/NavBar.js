import React from 'react';
import Logo from '../Logo';
import SvgImage from '../SvgImage';

const NavBar = () => {
    return (
        <div className='bg-green-800 h-12 flex justify-evenly items-center px-8 gap-2'>
            <div className='flex justify-center items-center gap-2'>
                <SvgImage src={"/menu-svgrepo-com.svg"} />
                <Logo />
            </div>
            <SvgImage src={"/leaf-season-svgrepo-com.svg"}/>
        </div>
    )
}

export default NavBar;