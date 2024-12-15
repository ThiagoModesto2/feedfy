"use client";

import React, { type FC, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import usePriceStore from "@/store/usePriceStore";

import { formatMoneyBRL } from "@/utils/formatMoneyBRL";

import styles from "./styles.module.css";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface PopupCompletedProps {
  isVisible: boolean;
}

export const PopupCompleted: FC<PopupCompletedProps> = ({
  isVisible,
}) => {
  const router = useRouter(); 
  const { price } = usePriceStore();

   useEffect(() => {
     if (isVisible) {
       const timer = setTimeout(() => {
         router.push("/saque");
       }, 2000);

       return () => clearTimeout(timer);
     }
   }, [isVisible, router]);

  return (
    <>
      {isVisible && (
        <div className={styles.overlay}>
          <div className={styles.popupContainer}>
            <LottiePlayer
              src="https://cdn.lordicon.com/xzksbhzh.json"
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

            <span className={styles.popupText}>
              Parabéns! Você ganhou {formatMoneyBRL(price)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupCompleted;
