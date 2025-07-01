"use client";
import React, { createContext, useContext, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

// const host = "http://localhost:3002"; // ✅ local dev backend

const host = "https://backend-production-b164.up.railway.app";

s
export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [loggIn, setLoggIn] = useState({ state: false, user: "", email: "" });
  const [justLoggedIn, setJustLoggedIn] = useState(false); // ✅ new flag
  const [notes, setNotes] = useState([]);

  // ✅ Get users
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
    setJustLoggedIn(false); // reset on logout
    router.push("/");
  };

  // ✅ Get Notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${host}/getNotes`, {
        params: { email: loggIn.email },
      });
      setNotes(response.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  // ✅ Delete Note
  const deleteNote = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${host}/deleteNote/${id}`);
      setNotes(notes.filter((note) => note.ID !== id));
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
        justLoggedIn,
        setJustLoggedIn,
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

// ✅ Custom hook
export const useAuth = () => useContext(AuthContext);
