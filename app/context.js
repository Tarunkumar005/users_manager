"use client";
import React, { createContext, useContext, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

// Create a context
const AuthContext = createContext();

const host = "https://backend-production-a1fb.up.railway.app"; // your Railway backend

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [loggIn, setLoggIn] = useState({ state: false, user: "", email: "" });
  const [notes, setNotes] = useState([]);

  // ✅ Route: GET /users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${host}/users`);
      const sortedUsers = response.data.sort((a, b) => {
        const nameA = (a.Name || "").toLowerCase();
        const nameB = (b.Name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setUsers(sortedUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
      setLoading(false);
    }
  };

  // ✅ Logout
  const LogOut = () => {
    setLoggIn({ state: false, user: "", email: "" });
    router.push("/");
  };

  // ✅ Route: GET /getNotes?email=...
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${host}/getNotes`, {
        params: { email: loggIn.email },
      });
      console.log("Fetched notes:", response.data);
      setNotes(response.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  // ✅ Route: DELETE /deleteNote/:id
  const deleteNote = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${host}/deleteNote/${id}`);
      setNotes(notes.filter((note) => note.ID !== id)); // Use correct case for MySQL field
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        fetchUsers,
        users,
        loading,
        error,
        loggIn,
        setLoggIn,
        LogOut,
        fetchNotes,
        notes,
        deleteNote,
        host,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => useContext(AuthContext);
