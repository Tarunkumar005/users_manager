"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context";

export default function DeleteAccountPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();
  const { setLoggIn } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3002/verifyAndDelete", credentials);

      if (res.status === 200) {
        alert("Account deleted successfully.");
        setLoggIn({ state: false, email: "" });
        router.push("/Signup");
      }
    } catch (err) {
      alert(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4 text-center">Delete Your Account</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Confirm and Delete
        </button>
      </form>
    </div>
  );
}
