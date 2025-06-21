"use client";
import { useEffect } from "react";
import { useAuth } from "../context";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loggIn, fetchNotes, notes ,deleteNote } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loggIn.state){
        router.push("/Login");
    }else{
        fetchNotes();
    }
  }, [loggIn.state]);

  return (
    <div className="p-6">
        <div className="w-full flex items-center justify-between">
            <h1 className="text-3xl font-extrabold px-2">Your Notes</h1>
            <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition" onClick={() => {router.push("/AddNote")}}>Add Note</button>
        </div>
      <div className="grid gap-4">
        {notes.map(note => (
          <div key={note.ID} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">{note.Title}</h2>
            <p className="text-gray-700">{note.Content}</p>
            <button onClick={() => deleteNote(note.ID)} className="text-sm text-red-600 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
