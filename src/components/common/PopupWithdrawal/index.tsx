"use client";

import React, { useEffect, type FC } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";

import { formatMoneyBRL } from "@/utils/formatMoneyBRL";

import styles from "./styles.module.css";

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
            <Player
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
