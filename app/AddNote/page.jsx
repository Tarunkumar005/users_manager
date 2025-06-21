"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirection after submission (optional)
import { useAuth } from "../context";
import axios from "axios";

export default function AddNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const { loggIn ,host } = useAuth();
  const router = useRouter();

  // Handle change for both title and content
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title || !note.content) {
      alert("Both title and content are required!");
      return;
    }

    // Call your API to save the note using Axios
    try {
      const response = await axios.post(`${host}/addNote`, {
        title: note.title,
        content: note.content,
        email: loggIn.email, // Replace with actual user email from auth context
      });

      // If the response is successful, reset form and redirect
      if (response.status === 200) {
        setNote({ title: "", content: "" });
        router.push("/Home"); // Or wherever you want to redirect after submission
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (!loggIn.state)
      router.push("/");
  }, [loggIn.state]);

  return (
    <div className="p-6 max-w-lg mx-auto">
    <h1 className="text-2xl font-bold mb-4">Add a Note</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium">Title</label>
        <input
          type="text"
          id="title"
          name="title" // Added name attribute
          value={note.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-medium">Content</label>
        <textarea
          id="content"
          name="content" // Added name attribute
          value={note.content}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          rows={5}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Add Note</button>
    </form>
  </div>
  );
}
