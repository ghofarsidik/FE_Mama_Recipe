/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import MamaIcon from "../../assets/images/logos/mama recipe.png";
import background from "../../assets/images/backgroundImage/bgautentification.png";
import Input from "../../components/base/Input";
import API from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      const { token } = response.data.data;
      localStorage.setItem("token", token);

      setMessage("Login successful");
      router.push("/");
    } catch (error) {
      console.error("Login error: ", error);
      const errorMsg = error.response?.data?.message || "Login failed";
      setMessage(errorMsg);
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
        <p>Welcome</p>
        <p>Log in into your existing account</p>
        <form onSubmit={handleSubmit}>
          <Input
            name="E-mail"
            type="email"
            placeholder="masukkan email anda"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="Password"
            type="password"
            placeholder="masukkan password anda"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to terms & conditions</label>
          </div>
          <button
            className="border rounded-lg bg-yellow-300 py-2 px-4 mt-4"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4">{message}</p>
        <p className="mt-2">Forgot Password?</p>
        <p className="mt-2">
          Don't have an account? <Link href="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
