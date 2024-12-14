"use client";

import React, { type FC } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Button from "../Button";

import styles from "./styles.module.css";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface DailyLimitProps {
  isVisible: boolean;
}

export const DailyLimit: FC<DailyLimitProps> = ({ isVisible }) => {
  const router = useRouter();

  const handleGoToWithdraw = () => {
    router.push("/saque");
  };

  return (
    <>
      {isVisible && (
        <div className={styles.overlay}>
          <div className={styles.popupContainer}>
            <LottiePlayer
              src="https://cdn.lordicon.com/inrunzby.json"
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
              <strong>LIMITE DIÁRIO ATINGIDO!</strong>
            </span>
            <span className={styles.popupText}>
              Precisa sacar seu saldo de hoje?
            </span>

            <Button handleSubmit={handleGoToWithdraw} title="SACAR AGORA" />

            <span className={styles.popupText}>Ou espere 24 horas</span>
            <span className={styles.popupText}>para continuar avaliando.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyLimit;
