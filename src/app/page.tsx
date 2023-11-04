"use client";

import { useState } from "react";

export default function Home() {
  const [ytUrl, setYtUrl] = useState("");

  const handleSubmit = async () => {
    
  }

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
        <h1 className="font-bold text-7xl">
          Don't Watch the Whole Video - Try VideoBriefs!
        </h1>
        <input
          type="text"
          className="border-2 border-black"
          name="url"
          value={ytUrl}
          onChange={(e) => setYtUrl(e.target.value)}
        ></input>
        <button className="border-2 border-black" onClick={handleSubmit}>Summarize</button>
      </div>
    </main>
  );
}
