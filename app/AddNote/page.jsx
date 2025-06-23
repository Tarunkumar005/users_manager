"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context";
import axios from "axios";

export default function AddNote() {
  const [note, setNote] = useState({ title: "", content: "" });
  const { loggIn, host } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      alert("Both title and content are required!");
      return;
    }

    try {
      const response = await axios.post(`${host}/addNote`, {
        title: note.title,
        content: note.content,
        email: loggIn.email,
      });

      if (response.status === 200) {
        setNote({ title: "", content: "" });
        router.push("/Home");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (!loggIn.state) router.push("/");
  }, [loggIn.state]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-xl relative backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg">

        {/* ❌ Close Button */}
        <button
          onClick={() => router.push("/Home")}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition"
          aria-label="Close"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">Add a Note</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-neutral-900/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block font-semibold mb-1">Content</label>
            <textarea
              id="content"
              name="content"
              value={note.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 rounded-lg bg-neutral-900/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
