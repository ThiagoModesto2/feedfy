"use client";

import React, { useEffect, type FC } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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
}) => {
  const router = useRouter(); 

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        router.push("/video"); 
      }, 3000);

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
            <span className={styles.popupText}>Verifique suas notificações ou extrato bancário!</span>
            <span>Obs: O valor pode demorar 1 ou mais minutos para cair.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupWithdrawal;
