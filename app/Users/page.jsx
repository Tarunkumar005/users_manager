"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context";


export default function Users() {
    const {fetchUsers ,users ,loading ,error} = useAuth(); 

  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
      <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Usernames</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user, index) => (
              <li
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition"
              >
                {user.Name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
