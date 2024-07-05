// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_API_URL,
});

API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error, e.g., redirect to login page
      console.error("Unauthorized, redirecting to login...");
      // You can add a redirect to login page here if needed
    }
    return Promise.reject(error);
  }
);

export default API;
