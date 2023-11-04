"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function SummarizePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    summary: []
  });

  useEffect(() => {
    toast.success("Summarizing...");
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("videoId");
    const inDepth = urlParams.get("inDepth");
    const bullets = urlParams.get("bullets");
    const getData = async () => {
      const res = await axios.post("/api/summarize", {
        videoId,
        inDepth,
        bullets,
      });
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <>
      <Toaster />
      <main
        className="min-h-screen"
        style={{
          backgroundColor: "white",
        }}
      >
        <header className="flex flex-col justify-center items-center pt-10">
          <Image src="logo.svg" width={50} height={50} alt="logo"></Image>
          <h1 className="font-bold text-2xl">VideoBriefs</h1>
        </header>
        <div className="text-center flex flex-col pt-16 items-center lg:px-32">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <ClipLoader className="flex-1" />
            </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold pb-10 text-left">
                {data.title || ""}
              </h1>
              <ul>
                {data.summary.map((e, i) => {
                  return (
                    <li key={i} className="list-disc text-left pb-2 text-lg font-medium">
                      {e}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
