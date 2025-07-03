import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useLocation } from 'wouter';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import showToast from '../utils/Toast';

const schema = yup.object().shape({
  name: yup.string().required("Name is required").trim(),
  email: yup.string().email("Invalid email").required("Email is required").trim(),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  mobile: yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  dob: yup.string().required("Date of birth is required"),
  profile: yup.mixed().required("Profile picture is required"),
});

const Register = () => {
  const [, navigate] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("email", data.email.trim());
    formData.append("password", data.password.trim());
    formData.append("mobile", data.mobile);
    formData.append("dob", data.dob);
    formData.append("profile", data.profile[0]); // File
    console.log(data, "Data before FormData conversion");
    try {
      const res = await axios.post(`${BASE_URL}/users/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
      if (res.status === 201) {
        showToast(res.data.message);
        setTimeout(() => {
          navigate('/login');
          reset();
        }, 2200);
        reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert(error?.response?.data?.message || "Something went wrong");
      showToast(error?.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 mt-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Name */}
        <div>
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
        </div>

        {/* Mobile No */}
        <div>
          <input
            type="text"
            {...register("mobile")}
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm mt-1">{errors.mobile?.message}</p>
        </div>

        {/* DOB */}
        <div>
          <input
            type="date"
            {...register("dob")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm mt-1">{errors.dob?.message}</p>
        </div>

        {/* Profile Picture */}
        <div>
          <input
            type="file"
            {...register("profile")}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <p className="text-red-500 text-sm mt-1">{errors.profile?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800"
        >
          Submit
        </button>

        <p className="text-center text-sm mt-2">
          Already Registered?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login Here
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
