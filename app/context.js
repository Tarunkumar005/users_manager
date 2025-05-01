"use client"
import React, { createContext, useContext, useState} from 'react';
import axios from "axios"; // Ensure axios is installed via npm
import { useRouter } from 'next/navigation';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
      const router = useRouter();

      const [users, setUsers] = useState([]); // State to store the users
      const [loading, setLoading] = useState(true); // State for loading status
      const [error, setError] = useState(""); // State for error messages

      const [loggIn, setLoggIn] = useState({state:false , user:"" , email:""}); // user loggin state

      const [notes, setNotes] = useState([]); // fetched notes

      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:3002/users");
      
          // Sort users by username (case-insensitive)
          const sortedUsers = response.data.sort((a, b) => {
            const nameA = (a.Name || "").toLowerCase();
            const nameB = (b.Name || "").toLowerCase();
            return nameA.localeCompare(nameB);
          });
          setUsers(sortedUsers); // Set sorted users to state
          setLoading(false); // Stop loading
        } catch (error) {
          console.error("Error fetching users:", error);
          setError("Failed to load users");
          setLoading(false); // Stop loading
        }
      };
      

    const LogOut = () => {
        setLoggIn({state:false , user:"" , email:""});
        router.push("/");
    };

    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getNotes", {
          params: { email: loggIn.email }, // or whatever your auth email is
        });
    
        console.log("Fetched notes:", response.data);
        setNotes(response.data); // assuming you use useState
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };

    const deleteNote = async (id) => {
      const confirmDelete = confirm("Are you sure you want to delete this note?");
      if (!confirmDelete) return;
  
      try {
        await axios.delete(`http://localhost:3002/deleteNote/${id}`);
        setNotes(notes.filter((note) => note.id !== id));
      } catch (err) {
        console.error("Failed to delete note:", err);
      }
    };
    


    return (
        <AuthContext.Provider value={{fetchUsers ,users ,loading ,error ,loggIn ,setLoggIn ,LogOut,fetchNotes,notes,deleteNote}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
