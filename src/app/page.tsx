"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import validateUrl from "@/helpers/validateUrl";
import NProgress from "nprogress";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ytUrl: "",
    inDepth: false,
    bullets: false,
  });

  const handleSubmit = async () => {
    try {
      NProgress.start();
      const { ytUrl } = formData;
      const videoId = validateUrl(ytUrl);
      if (!videoId) {
        toast.error("Invalid YouTube URL!");
        return;
      }
      router.push(
        `/summarize?videoId=${videoId}&inDepth=${formData.inDepth}&bullets=${formData.bullets}`
      );
      NProgress.done();
    } catch (error: any) {
      NProgress.done();
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <Toaster />
      <main
        className="min-h-screen flex flex-col items-center lg:px-10"
        style={{
          backgroundImage: `url('bg.svg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
        }}
      >
        <header className="flex flex-col justify-center items-center pt-10">
          <Image src="logo.svg" width={50} height={50} alt="logo"></Image>
          <title className="font-bold text-2xl">VideoBriefs</title>
        </header>
        <div className="text-center flex flex-col flex-1 pt-32 items-center">
          <h1 className="font-bold text-5xl lg:text-7xl lg:px-10">
            Don't want to watch the entire video? – Try VideoBriefs!
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col items-center w-full sm:w-3/4 md:w-1/2 lg:w-2/5"
          >
            <input
              type="text"
              className="border bg-black rounded-3xl text-white text-xl p-2 mt-14 text-center lg:w-full"
              placeholder="YouTube URL"
              name="url"
              value={formData.ytUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ytUrl: e.target.value }))
              }
            ></input>
            <div className="my-1">
              <label className="mx-2">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="indepth"
                  checked={formData.inDepth}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inDepth: e.target.checked,
                    }))
                  }
                ></input>{" "}
                In-Depth
              </label>
              <label className="mx-2">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="bullet"
                  checked={formData.bullets}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bullets: e.target.checked,
                    }))
                  }
                ></input>{" "}
                Bullet Points
              </label>
            </div>
            <button
              type="submit"
              className="border bg-black rounded-2xl text-white p-1.5 mt-4"
            >
              Summarize
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
