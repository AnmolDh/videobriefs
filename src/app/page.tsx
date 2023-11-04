"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [ytUrl, setYtUrl] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/summarizer", { ytUrl });
    } catch (error: any) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center px-10"
      style={{
        backgroundImage: `url('bg.svg')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }}
    >
      <div className="flex flex-col justify-center items-center pt-10">
        <img src="logo.svg" width={50}></img>
        <h1 className="font-bold text-2xl">VideoBriefs</h1>
      </div>
      <div className="text-center flex flex-col flex-1 pt-32 items-center">
        <h1 className="font-bold text-5xl lg:text-7xl">
          Don't Watch the Whole Video - Try VideoBriefs!
        </h1>
        <input
          type="text"
          className="border bg-black rounded text-white text-xl p-2 mt-14 text-center"
          placeholder="YouTube URL"
          name="url"
          value={ytUrl}
          onChange={(e) => setYtUrl(e.target.value)}
        ></input>
        <button
          className="border bg-black rounded text-white p-1 mt-4"
          onClick={handleSubmit}
        >
          Summarize
        </button>
      </div>
    </main>
  );
}
