"use client";

import React, { useEffect, useState } from "react";

import { checkout } from "@/config/links";

import Button from "../common/Button";

import styles from "./styles.module.css";

export const Video: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://scripts.converteai.net/334a67ad-f744-4d8a-9392-e73b84025538/players/675b9e6a1f644a0530aeda6d/player.js";
    script.async = true;

    document.head.appendChild(script);

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 60000); // 60000 ms = 1 minuto
    
    return () => {
      clearTimeout(timer);
      document.head.removeChild(script);
    };
  }, []);

  const handleInit = () => {
    window.location.href = checkout;
  };

  return (
    <>
      <div id={styles.center}>
        <p className={styles.text}>ASSISTA O VÍDEO ATÉ O FINAL</p>
        <div
          id="vid_675b9e6a1f644a0530aeda6d"
          style={{
            position: "relative",
            width: "100%",
            padding: "56.25% 0 0",
          }}
        >
          <img
            id="thumb_675b9e6a1f644a0530aeda6d"
            src="https://images.converteai.net/334a67ad-f744-4d8a-9392-e73b84025538/players/675b9e6a1f644a0530aeda6d/thumbnail.jpg"
            alt="thumbnail"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            id="backdrop_675b9e6a1f644a0530aeda6d"
            style={{
              WebkitBackdropFilter: "blur(5px)",
              backdropFilter: "blur(5px)",
              position: "absolute",
              top: 0,
              height: "100%",
              width: "100%",
            }}
          ></div>
        </div>

        {showButton && (
          <div id={styles.buttonWrapper}>
            <Button handleSubmit={handleInit} title="LIBERAR ACESSO AGORA" />
          </div>
        )}
      </div>

      <style>
        {`
          .elementor-element:has(#smartplayer) {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default Video;
