import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import MamaIcon from "../../assets/images/logos/mama recipe.png";
import background from "../../assets/images/backgroundImage/bgautentification.png";
import Input from "../../components/base/Input";
import API from "../../api/api";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const { name, email, phone, password } = userData;
      const response = await API.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });
      if (response.status === 200) {
        router.push("/login");
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  return (
    <div className="max-w-full flex flex-col md:flex-row mx-auto">
      {/* Left side with background and logo */}
      <div
        className="hidden md:block w-full md:w-1/2 h-[900px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <div className="absolute inset-0 bg-yellow-500 bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={MamaIcon}
            alt="Mama recipe logo"
            width="182"
            height="224"
            priority
          />
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex flex-col px-8 md:px-20 pt-16 md:pt-32">
        <p>Let's Get Started!</p>
        <p>Create a new account to access all features</p>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Masukkan nama anda"
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="masukkan email anda"
            onChange={handleChange}
          />
          <Input
            name="phone"
            type="text"
            placeholder="08xxxxxxxxxx"
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="masukkan password anda"
            onChange={handleChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Masukkan kembali password anda"
            onChange={handleChange}
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to terms & conditions</label>
          </div>
          <button
            className="border rounded-lg bg-yellow-300 py-2 px-4 mt-4"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="mt-4">{message}</p>
        <p className="mt-2">Forgot Password?</p>
        <p className="mt-2">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
