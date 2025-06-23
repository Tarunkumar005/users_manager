"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { useRouter } from "next/navigation";
import BlurText from "../BlurText";

export default function Home() {
  const { loggIn, fetchNotes, notes, deleteNote, justLoggedIn, setJustLoggedIn } = useAuth(); // ✅ include
  const [show, setShow] = useState(false); // initially false
  const router = useRouter();

  useEffect(() => {
    if (!loggIn.state) {
      router.push("/Login");
    } else {
      fetchNotes();

      // ✅ Show welcome only if just logged in
      if (justLoggedIn) {
        setShow(true);
        setTimeout(() => {
          setShow(false);
          setJustLoggedIn(false); // ✅ reset after first render
        }, 2000);
      }
    }
  }, [loggIn.state]);

  return (
    <div className="p-6 min-h-screen text-white relative z-10 max-w-4xl mx-auto">
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <BlurText
            text={`Hello ${loggIn.user}`}
            delay={0}
            animateBy="words"
            direction="top"
            onAnimationComplete={() => console.log("Animation done")}
            className="text-8xl text-white font-semibold"
          />
        </div>
      )}

      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold px-2">Your Notes</h1>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          onClick={() => router.push("/AddNote")}
        >
          Add Note
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {notes.map((note) => (
          <div
            key={note.ID}
            className="w-full backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition duration-300"
          >
            <h2 className="text-xl font-bold mb-2">{note.Title}</h2>
            <p className="text-neutral-300">{note.Content}</p>
            <button
              onClick={() => deleteNote(note.ID)}
              className="mt-4 text-sm text-red-400 hover:text-red-300 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
