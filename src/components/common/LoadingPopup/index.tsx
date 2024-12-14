"use client";

import React, { type FC } from "react";
import dynamic from "next/dynamic";

import styles from "./styles.module.css";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface LoadingPopupProps {
  isVisible: boolean;
}

export const LoadingPopup: FC<LoadingPopupProps> = ({ isVisible }) => {
  return (
    <>
      {isVisible && (
        <div className={styles.overlay}>
          <div className={styles.popupContainer}>
            <LottiePlayer
              src="https://cdn.lordicon.com/avytqtql.json"
              loop
              autoplay
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              style={{
                width: "125px",
                height: "125px",
                display: "flex",
                margin: "0 auto",
              }}
            />
            <span className={styles.popupText}>Carregando...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingPopup;
