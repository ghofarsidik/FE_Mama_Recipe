import React, { useState } from "react";
import MamaIcon from "../../assets/images/logos/mama recipe.png";
import Image from "next/image";
import Input from "../../components/base/Input";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  

  return (
    <div className="max-w-[100%] flex mx-auto">
      <div className="w-[50%] bg-autentic h-[900px] bg-cover bg-center">
        <div className="bg-mr_yellow bg-opacity-70 h-full w-full flex items-center justify-center text-red">
          <Image
            src={MamaIcon}
            alt="Mama recipe logo"
            width="182"
            height="224"
          />
        </div>
      </div>

      <div className="w-[50%] flex flex-col px-[5%] pt-32">
        <p className="text-mr_yellow text-[30px]">Lets Get Started !</p>
        <p>Create new account to access all features</p>
        {/* <form onSubmit={handleSubmit}> */}
          <Input
          name ="name"
          type="text"
          placeholder="Masukkan nama anda"
          onChange={(e) => setName(e.target.value)}
          />
        <Input
          name="E-mail"
          type="email"
          placeholder="masukkan email anda"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name ="phone"
          type="text"
          placeholder="08xxxxxxxxxx"
          onChange={(e) => setPhone(e.target.value)}
          />
        <Input
          name="Password"
          type="Password"
          placeholder="masukkan password anda"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          name ="Konfirmasi Password"
          type="password"
          placeholder="Masukkan kembali password anda"
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
        {/* <Checkbox label="I agree to terms & conditions" /> */}
        <div className="flex space-x-2">
          <input type="checkbox" />
          <p>I agree to terms & conditions</p>
        </div>
        <button className="border rounded-lg bg-yellow-300 py-2 px-4" type="submit">
          Login
        </button>
        {/* </form> */}
        {/* <p>{message}</p> */}
        <p>Forgot Password ?</p>
        <p>Dont have an account? Sign Up</p>
      </div>
    </div>
  );
};

export default Login;