import React from 'react';
import Logo from '../Logo';
import SvgImage from '../SvgImage';

const NavBar = () => {
    return (
        <div className='bg-green-700 flex justify-evenly items-center px-8 py-3 gap-2'>
            <div className='flex justify-center items-center gap-2'>
                <SvgImage src={"/menu-svgrepo-com.svg"} />
                <Logo />
            </div>
            <SvgImage src={"/sun-5-svgrepo-com.svg"} />
            <SvgImage src={"/leaf-season-svgrepo-com.svg"} />
        </div>
    )
}

export default NavBar;