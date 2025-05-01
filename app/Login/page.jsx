"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context";

export default function Login() {

  const {loggIn ,setLoggIn} = useAuth();

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post("http://localhost:3002/login", {
          email: formData.email,
          password: formData.password,
        });

        console.log("Login successful:", res.data);
        setLoggIn({state:true , user: "" , email:formData.email});

        // Redirect user to the dashboard or home page after login
        router.push("/"); // Replace '/dashboard' with your desired path
      } catch (error) {
        console.log("Login error:", error);
        alert("Invalid email or password");
      }
    }
  };

  useEffect(() => {
    if (loggIn.state) router.push("/");
  }, [loggIn.state]);

  if (loggIn.state) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Log In</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Log In
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="Signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          Delete your account?{" "}
          <a href="/DeleteUser" className="text-red-600 hover:underline">
            Delete Account
          </a>
        </div>
      </form>
    </div>
  );
}
