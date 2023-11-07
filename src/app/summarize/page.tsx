"use client";

import streamData from "@/helpers/streamData";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function SummarizePage() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    toast.success("Summarizing...");
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("videoId");
    const inDepth = urlParams.get("inDepth");
    const bullets = urlParams.get("bullets");
    const getData = async () => {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId,
          inDepth,
          bullets,
        }),
      });
      setLoading(false)

      if (!res.body) {
        throw new Error("Response body is null");
      }

      await streamData(res, setSummary);
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
          <Image src="logo.svg" width={50} height={50} alt="logo" />
          <title className="font-bold text-2xl">VideoBriefs</title>
        </header>
        <div className="text-center flex flex-col pt-16 items-center px-6 lg:px-32">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <ClipLoader className="flex-1" />
            </div>
          ) : (
            <div>
              <h1 className="pb-10 text-left">
                {summary ? summary : "No Summary Found"}
              </h1>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
