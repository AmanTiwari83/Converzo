import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "wouter";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useLocation } from "wouter";
import showToast from "../utils/Toast";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [ , navigate] = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
   try{
     const res = await axios.post(`${BASE_URL}/users/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      showToast(res.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2200);
    } else {
      showToast("Login failed. Please try again.", "error");
    }
   }catch (error) {
     console.error("Login error:", error);
     showToast(error.response?.data?.message || "An error occurred during login." , "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-15 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login Here</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          Sign Up
        </button>
        <p className='text-center mt-[-10]'>Not Registered yet, <Link href='/register' className="text-blue-500 font-semibold">Register Here</Link></p>
            
      </form>
    </div>
  );
};

export default Login;
