"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SummarizePage() {
  const [data, setData] = useState({title: "", summary: ""});

  useEffect(() => {
    toast.success("Summarizing...");
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("videoId");
    const getData = async () => {
      const res = await axios.post("/api/summarize", { videoId });
      setData(res.data);
    };
    getData();
  }, []);
  return (
    <main className="min-h-screen">
      <Toaster />
      <h1 className="text-4xl font-bold">{data ? data.title : "please wait"}</h1>
      <h1>{data.summary}</h1>
    </main>
  );
}
