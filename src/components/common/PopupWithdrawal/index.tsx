"use client";

import React, { useEffect, type FC } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { formatMoneyBRL } from "@/utils/formatMoneyBRL";

import styles from "./styles.module.css";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface PopupWithdrawalProps {
  isVisible: boolean;
  price: number;
}

export const PopupWithdrawal: FC<PopupWithdrawalProps> = ({
  isVisible,
  price,
}) => {
  const router = useRouter(); 

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        router.push("/video"); 
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

            <span className={styles.popupText}>PIX Realizado com sucesso!</span>
            <span className={styles.popupText}>Você recebeu:</span>
            <span className={styles.popupTextPrice}>
              {formatMoneyBRL(price)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupWithdrawal;
