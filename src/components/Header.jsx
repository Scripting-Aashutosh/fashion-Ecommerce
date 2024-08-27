import React from 'react'
import { useContext } from 'react'

//sidebar context
import { SidebarContext } from '../contexts/SidebarContext'

//cart context
import { CartContext } from '../contexts/CartContext';

//import icons
import { BsBag } from 'react-icons/bs';

//import link
import { Link } from '`react-router-dom`';

//import logo
import Logo from '../assets/logo (2).png';
import { useState, useEffect } from 'react';


const Header = () => {
  //header state
  const [isActive, setisActive] = useState(false);
  const {isOpen, setIsOpen} = useContext(SidebarContext);
  const {itemAmount} = useContext(CartContext);

  //event handeling
  useEffect(()=>{
    window.addEventListener('scroll', ()=> {
      window.scrollY > 60 ? setisActive(true) : setisActive(false);
    });
  });

  return (
    <header className= {`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 transition-all` }>
      <div className='container mx-auto flex items-center justify-between h-full'>
        {/* LOGO */}
      <Link to={'/'}>
        <div>
          <img className='w-[100px]' src={Logo} alt="" />
        </div>
      </Link>

     
      <div className='cursor-pointer flex relative' 
           onClick={() => {setIsOpen(!isOpen)}}>
           <BsBag className='text-2xl' />

           <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center item-center'>
             {itemAmount}
           </div>
      </div>
      </div>
    </header>
  )
}

export default Header
