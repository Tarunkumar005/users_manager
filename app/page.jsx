"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context";

export default function Home() {
  const { loggIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loggIn.state) {
      router.push("/Login");
    } else {
      router.push("/Home"); // or your actual home page after login
    }
  }, [loggIn.state]);

  return null; // no UI shown here, just redirect logic
}