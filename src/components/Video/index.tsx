"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "../common/Button";

import styles from "./styles.module.css";

export const Video: React.FC = () => {
  const router = useRouter();

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://scripts.converteai.net/09c2f601-071c-44f2-871b-5863c1a3b3f3/players/67586e6d16f0d937fbb9facd/player.js";
    script.async = true;

    document.head.appendChild(script);

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 0); // Adjust timeout duration as needed

    return () => {
      clearTimeout(timer);
      document.head.removeChild(script);
    };
  }, []);

  const handleInit = () => {
    router.push("/saque");
  };

  return (
    <>
      <div id={styles.center}>
        <p className={styles.text}>ASSISTA O VÍDEO ATÉ O FINAL</p>

        <div
          id="vid_67586e6d16f0d937fbb9facd"
          style={{
            position: "relative",
            width: "100%",
            padding: "56.25% 0 0",
          }}
        >
          <img
            id="thumb_67586e6d16f0d937fbb9facd"
            src="https://images.converteai.net/09c2f601-071c-44f2-871b-5863c1a3b3f3/players/67586e6d16f0d937fbb9facd/thumbnail.jpg"
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
            id="backdrop_67586e6d16f0d937fbb9facd"
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
            <Button handleSubmit={handleInit} title="REALIZAR SAQUE TESTE" />
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
