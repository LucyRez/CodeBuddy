'use client'
import Sidebar from "@/components/Sidebar";
import { BoltIcon, SunIcon } from "@heroicons/react/24/outline";

import React, { useEffect } from "react";

function PlaygroundPage() {

  useEffect(() => {
    var token = window.localStorage.getItem("token")
      if (token == null) {
        window.location.replace("http://localhost:3000/login");
       }
    })

  return (
    <div className="flex">
      <div className="flex-1 bg-[#191c2e] max-w-xs h-screen overflow-y-scroll md:min-w-[20rem]">
        <Sidebar></Sidebar>
      </div>

      <div className="flex-1 items-center justify-center bg-[#282d4a]">
        <div className="flex flex-col items-center justify-center text-white h-screen px-2">
          <h1 className="text-5xl font-bold mb-20"> CodeBuddy Playground</h1>

          <div className="flex space-x-8 text-center">
            <div>
              <div className="flex flex-col items-center justify-center mb-5">
                <SunIcon className="h-8 w-8"></SunIcon>
                <h2>Examples</h2>
              </div>
              <div className="space-y-2">
                <p className="infoText">
                  "Generate me the code for a login screen of an iOS
                  application"
                </p>
                <p className="infoText">
                  "Generate me a tableView cell that contains a button and a
                  label"
                </p>
                <p className="infoText">
                  "Generate me the code in Swift to design a loading animation
                  on API call"
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center mb-5">
                <BoltIcon className="h-8 w-8"></BoltIcon>
                <h2>Capabilities</h2>
              </div>
              <div className="space-y-2">
                <p className="infoText">
                  "Can generate source code for iOS components and screens"
                </p>
                <p className="infoText">
                  "Can help you writing algorithms and business-logic in Swift"
                </p>
                <p className="infoText">
                  "Can generate test for your functions and screens"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaygroundPage;
