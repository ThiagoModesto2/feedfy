"use client";

import React, { useState, type FC } from "react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import axios from "axios";

import {
  MdPeople,
  MdOutlinePhoneAndroid,
} from "react-icons/md";

import Button from "../common/Button";
import PopupWithdrawal from "../common/PopupWithdrawal";

import usePriceStore from "@/store/usePriceStore";
import { formatMoneyBRL } from "@/utils/formatMoneyBRL";
import { sanitizePixKey } from "@/utils/sanitizePixKey";

import { api } from "@/config/links";

import styles from "./styles.module.css";

export const Withdrawal: FC = () => {
  const { price } = usePriceStore();
  const [selectedType, setSelectedType] = useState("cpf");
  const [pixKey, setPixKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [buttonName, setButtonName] = useState("Realizar Saque");

  const handleGoToPage = async () => {
    if (pixKey === "") {
      toast.error("Informe a chave pix.");
      return;
    }

    const sanitizedKey = sanitizePixKey(pixKey);

    const payload = {
      pixKey: sanitizedKey,
      pixType: selectedType,
    };

    setButtonName("Processando");
    try {
      const { data } = await axios.post(api, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === "success") {
        toast.success("Pix registrado com sucesso!");
        setIsVisible(true);
      } else {
        toast.error(data.message || "Erro ao registrar o Pix.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro ao conectar com o servidor.";
      toast.error(errorMessage);
    } finally {
      setButtonName("Realizar Saque");
    }
  };

  const handlePixKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPixKey(e.target.value);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const renderInput = () => {
    switch (selectedType) {
      case "cpf":
        return (
          <InputMask
            mask="999.999.999-99"
            maskPlaceholder=""
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (CPF)"
            className={styles.input}
            style={inputStyle}
          />
        );
      case "telefone":
        return (
          <InputMask
            mask="(99) 99999-9999"
            maskPlaceholder=""
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (Telefone)"
            className={styles.input}
            style={inputStyle}
          />
        );
      case "email":
        return (
          <input
            type="email"
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (E-mail)"
            className={styles.input}
            style={inputStyle}
          />
        );
      case "aleatorio":
        return (
          <input
            type="text"
            value={pixKey}
            onChange={handlePixKeyChange}
            placeholder="Digite sua chave PIX aqui (Aleatório)"
            className={styles.input}
            style={inputStyle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PopupWithdrawal isVisible={isVisible} price={0.10} />

      <div className={styles.container}>
        <div className={styles.valorBoxSaque}>
          <p id={styles.valorSaque}>
            Antes de realizar seu 1° saque, vamos te enviar um PIX TESTE de R$
            0,10 CENTAVOS para confirmar se está tudo certo com o seu cadastro!
          </p>

          <p>
            Seu saldo
            <br />
            <span>{formatMoneyBRL(price)}</span>
          </p>
        </div>

        <div className={styles.pixTypeContainer}>
          <button
            className={`${styles.pixTypeButton} ${
              selectedType === "cpf" && styles.selected
            }`}
            onClick={() => setSelectedType("cpf")}
          >
            <MdPeople size={28} />
            CPF
          </button>
          <button
            className={`${styles.pixTypeButton} ${
              selectedType === "phone" && styles.selected
            }`}
            onClick={() => setSelectedType("telefone")}
          >
            <MdOutlinePhoneAndroid size={28} />
            Telefone
          </button>
        </div>

        <div className={styles.form}>
          {renderInput()}
          <Button
            handleSubmit={handleGoToPage}
            title={buttonName}
            disabled={buttonName === "Processando"}
          />
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
