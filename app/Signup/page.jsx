"use client"
import axios from "axios";
import React, { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await axios.post("http://localhost:3002/register", {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });
  
        console.log("Server response:", res.data);
        alert("User registered successfully!");
        setErrors({});
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Registration error:", error);
        setErrors({ server: "Registration failed. Try again." });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

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

        <div className="mb-4">
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

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
