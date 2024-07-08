import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../../redux/slice/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsLoggedIn(false);
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full flex px-[5%] font-montserrat items-center h-[50px] md:h-[100px] text-mr_color shadow-md z-50">
        <button className="block md:hidden mr-auto" onClick={toggleMenu}>
          <svg className={`w-6 h-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className="hidden md:flex text-base font-semibold space-x-[5%] flex-grow">
          <Link href="/"> <p className="">Home</p></Link>
          <Link href="/recipes/add_recipe"><p className="">Add Recipe</p></Link>
          <Link href="/profile"><p className="">Profile</p></Link>
        </div>
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-yellow-400 py-2 px-4 rounded-lg mx-2">Login</button>
              </Link>
              <Link href="/register">
                <button className="bg-yellow-400 py-2 px-4 rounded-lg mx-2">Register</button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <div ref={menuRef} className={`absolute top-0 left-0 h-full w-64 bg-white shadow-md transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <button className="absolute top-4 right-4" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex flex-col items-start p-4">
          <Link href="/"><p className="py-2" onClick={toggleMenu}>Home</p></Link>
          <Link href="/recipes/add_recipe"><p className="py-2" onClick={toggleMenu}>Add Recipe</p></Link>
          <Link href="/profile"><p className="py-2" onClick={toggleMenu}>Profile</p></Link>
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); toggleMenu(); }} className="py-2">Logout</button>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-yellow-400 py-2 px-4 rounded-lg mx-2 mt-1" onClick={toggleMenu}>Login</button>
              </Link>
              <Link href="/register">
                <button className="bg-yellow-400 py-2 px-4 rounded-lg mx-2 mt-3" onClick={toggleMenu}>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default Navbar;
