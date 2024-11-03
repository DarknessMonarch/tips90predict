"use client";

import { useTermCardStore } from "@/app/store/TermCard";
import styles from "@/app/styles/termcard.module.css";

export default function TermCard() {
  const { showCard, setShowCard } = useTermCardStore();

  const termcardData = [
    {
      name: "Terms",
      title: "Terms and Conditions",
      description: "Read our Terms and Conditions",
    },
    {
      name: "Refund",
      title: "Refund Policy",
      description: "Read our Refund Policy",
    },
    {
      name: "Disclaimer",
      title: "Our Disclaimer",
      description: "Read our Disclaimer",
    },
  ];

  return (
    <div className={styles.termcardContainer}>
      {termcardData.map((data, index) => (
        <div
          className={`${styles.termcard} ${
            showCard === data.name ? styles.termcardActive : ""
          }`}
          onClick={() => setShowCard(data.name)}
          key={index}
        >
          <div className={styles.termcardTitle}>
            <h3> {data.title}</h3>
            <p>{data.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
