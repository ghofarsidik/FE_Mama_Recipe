import React, { useState, useEffect } from "react";
import User from "../../assets/images/icons/User.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cek token atau status login di sini
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
    <nav className="fixed top-0 left-0 w-full flex px-[5%] font-montserrat items-center h-[100px] text-mr_color shadow-md z-50">
      <div className="flex text-base font-semibold space-x-[5%] flex-grow">
        <Link href="/"> <p className="">Home</p></Link>
        <Link href="/recipes/add_recipe"><p className="">Add Recipe</p></Link>
        <Link href="/profile"><p className="">Profile</p></Link>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Image src={User} alt="user icon" />
            <Link href="/login"><p>login</p></Link>
          </>
        )}
      </div>
    </nav>
    <div className="h-[100px]"></div>
    </div>
  );
};

export default Navbar;
