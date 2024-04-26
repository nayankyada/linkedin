import "./contentScript.css";
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";

const App = () => {
  const onClick = () => {
    console.log("clicked");

    let connectButton = document.querySelectorAll(
      '[data-test-icon="connect-medium"]'
    )?.[1]?.parentElement;

    if (!connectButton) {
      connectButton = document.querySelectorAll(
        '[data-test-icon="connect-small"]'
      )?.[1]?.parentElement;
    }
    if (connectButton) {
      connectButton?.click();
      setTimeout(() => {
        document.querySelector('button[aria-label="Add a note"]')?.click();
        setTimeout(() => {
          let textarea = document.querySelector("#custom-message");
          textarea.value = `Hello, it's a pleasure to meet you!\n\nI wanted to get in touch with you in case there was a chance later. I am a senior frontend developer with over 5 years of experience.\n\nExpertise in JavaScript, TypeScript, NextJS, ReactJS, and Node.js.\n\nBest regards,\nKyada Nayan`;
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
          setTimeout(() => {
            document.querySelector('button[aria-label="Send invitation"]')?.click();
          }, 500);
        }, 500);
      }, 500);
    }
  };

  const follow = () => {

  }

  return (
    <div className="container">
      <div className="customeNode" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          data-supported-dps="40x40"
          fill="#0a66c2"
          class="mercado-match"
          width="40"
          height="40"
          focusable="false"
        >
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
        </svg>
      </div>
      {/* <div className="customeNode follow" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            opacity="0.5"
            cx="12"
            cy="12"
            r="10"
            stroke="#1C274C"
            stroke-width="1.5"
          />
          <path
            d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </div> */}
    </div>
  );
};

let div = document.createElement("div");
document.body.appendChild(div);
const root = createRoot(div);
root.render(<App />);
