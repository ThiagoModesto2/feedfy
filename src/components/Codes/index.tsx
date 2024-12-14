import React, { useEffect, useState, type FC } from "react";
import { useRouter } from "next/navigation";

import { formatMoneyBRL } from "@/utils/formatMoneyBRL";

import Button from "../common/Button";
import PopupMoney from "../common/PopupMoney";

import styles from "./styles.module.css";
import usePriceStore from "@/store/usePriceStore";


const establishments = [
  {
    id: 1,
    name: "Nike",
    photo: "/codes/2nike.webp",
    price: 80,
  },
  {
    id: 2,
    name: "Riachuelo",
    photo: "/codes/2riachuelo.webp",
    price: 77
  },
  {
    id: 3,
    name: "Posto Ipiranga",
    photo: "/codes/ipianga-768x545.webp",
    price: 79,
  },
];

export const Codes: FC = () => {
  const { setPrice } = usePriceStore();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [environmentRating, setEnvironmentRating] = useState<number>(0);
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [fuelQualityRating, setFuelQualityRating] = useState<number>(0);
  const [priceRating, setPriceRating] = useState<string | null>(null);
  const [isVisibleModalMoney, setIsVisibleModalMoney] = useState(false);

  const isButtonDisabled =
    environmentRating === 0 ||
    serviceRating === 0 ||
    fuelQualityRating === 0 ||
    priceRating === null;

  const handleRatingChange = (
    setter: (value: number) => void,
    value: number
  ) => {
    setter(value);
  };

  const handlePriceChange = (value: string) => {
    setPriceRating(value);
  };

  const handleSubmit = () => {
    setTotalPrice((prev) => prev + establishments[currentIndex].price);
    setIsVisibleModalMoney(true);
  };

    const resetFeedback = () => {
      setEnvironmentRating(0);
      setServiceRating(0);
      setFuelQualityRating(0);
      setPriceRating(null);
    };

    const handleGoToWithdraw = () => {
      router.push("/saque");
    };


  useEffect(() => {
    if (isVisibleModalMoney) {
      const timer = setTimeout(() => {
        setIsVisibleModalMoney(false);
        if (currentIndex + 1 < establishments.length) {
          setCurrentIndex((prev) => prev + 1);
          setPrice(totalPrice + establishments[currentIndex].price);
          resetFeedback();
        } else {
          handleGoToWithdraw();
          setPrice(totalPrice + establishments[currentIndex].price);
        }
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisibleModalMoney]);

  const currentEstablishment = establishments[currentIndex];

  return (
    <>
      <PopupMoney
        isVisible={isVisibleModalMoney}
        codeName={currentEstablishment.name}
        price={currentEstablishment.price}
      />

      <div id={styles.center}>
        <div className={styles.establishmentInfo}>
          <img
            src={currentEstablishment.photo}
            alt={currentEstablishment.name}
            className={styles.photo}
          />
          <h2>{currentEstablishment.name}</h2>
          <p>Preço: R${formatMoneyBRL(currentEstablishment.price)}</p>
        </div>

        <div className={styles.question}>
          <p>Que nota você daria ao ambiente?</p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={`environment-${star}`}
                className={`${styles.star} ${
                  environmentRating >= star ? styles.selected : ""
                }`}
                onClick={() => handleRatingChange(setEnvironmentRating, star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className={styles.question}>
          <p>Qual foi a sua experiência com o atendimento?</p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={`service-${star}`}
                className={`${styles.star} ${
                  serviceRating >= star ? styles.selected : ""
                }`}
                onClick={() => handleRatingChange(setServiceRating, star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className={styles.question}>
          <p>Como você descreveria a qualidade dos combustíveis?</p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={`fuel-${star}`}
                className={`${styles.star} ${
                  fuelQualityRating >= star ? styles.selected : ""
                }`}
                onClick={() => handleRatingChange(setFuelQualityRating, star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className={styles.question}>
          <p>O que você achou do preço?</p>
          <div className={styles.prices}>
            {["$", "$$", "$$$"]?.map((option) => (
              <button
                key={`price-${option}`}
                className={`${styles.priceButton} ${
                  priceRating === option ? styles.selected : ""
                }`}
                onClick={() => handlePriceChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <Button
          handleSubmit={handleSubmit}
          title="Postar Feedback"
          disabled={isButtonDisabled}
        />
      </div>
    </>
  );
};

export default Codes;