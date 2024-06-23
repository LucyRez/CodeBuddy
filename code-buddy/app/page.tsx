"use client";
import Image from "next/image";
import grained from "../lib/grained"
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    console.log("render")
    grained('#container')
  })

  const myStyle = {
    height: "100vh",
    width: "110vw",
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
};

  return (
    <main id="container" className="bg-[url('../public/home-background.jpeg')]" style={myStyle}>
      <section className="flex flex-col ">
        <h1 className="font-semibold text-white text-8xl mx-8 mt-32"> Codebuddy</h1>
        <h1 className="font-semibold text-white  text-4xl mx-16 my-12"> your AI assistant for mobile development</h1>
      </section>
    </main>
  );
}
