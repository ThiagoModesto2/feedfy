"use client";

import { FC } from "react";
import { FaUser } from "react-icons/fa";

import usePriceStore from "@/store/usePriceStore";
import { formatMoneyBRL } from "@/utils/formatMoneyBRL";

import styles from "./styles.module.css";

export const Header: FC = () => {
  const { price } = usePriceStore();

  return (
    <header id={styles.header}>
      <img src="/feedfy.png" />
      
      {price > 0 ? (
        <div className={styles.valueBox}>
          <span id={styles.value}>{formatMoneyBRL(price)}</span>
        </div>
      ) : (
        <FaUser color="#fff" size={20} />
      )}
    </header>
  );
};

export default Header;
