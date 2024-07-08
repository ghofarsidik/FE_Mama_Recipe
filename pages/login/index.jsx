/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import MamaIcon from "../../assets/images/logos/mama recipe.png";
import background from "../../assets/images/backgroundImage/bgautentification.png";
import Input from "../../components/base/Input";
import { login } from "../../redux/slice/authSlice"; 
import PublicRoute from "../../components/module/route/PublicRoute";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("Updated email:", e.target.value); // Tambahkan log ini
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("Updated password:", e.target.value); // Tambahkan log ini
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    console.log("Data to be submitted:", data); // Tambahkan log ini
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      router.push("/");
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
            name="email"
            type="email"
            placeholder="masukkan email anda"
            onChange={handleEmailChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="masukkan password anda"
            onChange={handlePasswordChange}
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to terms & conditions</label>
          </div>
          <button
            className="border rounded-lg bg-yellow-300 py-2 px-4 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <p className="mt-2">Forgot Password?</p>
        <p className="mt-2">
          Don't have an account? <Link href="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default PublicRoute(Login, true);
