"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function summarizePage() {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    toast.success("Summarizing...");
    const urlParams = new URLSearchParams(window.location.search);
    const ytUrl = urlParams.get("ytUrl");
    const getSummary = async () => {
      const res = await axios.post("/api/summarize", { ytUrl });
      setSummary(res.data.summary);
    };
    getSummary();
  }, []);
  return (
    <main className="min-h-screen">
      <Toaster />
      <h1>{summary ? summary : "please wait"}</h1>
    </main>
  );
}
