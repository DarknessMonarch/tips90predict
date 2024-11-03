"use client";

import TermCard from "@/app/components/TermCard";
import styles from "@/app/styles/about.module.css";
import TermsInfo from "@/app/components/TermsInfo";
import RefundInfo from "@/app/components/RefundInfo";
import { useTermCardStore } from "@/app/store/TermCard";
import DisclaimerInfo from "@/app/components/DisclaimerInfo";

export default function TermPage() {
  const { showCard } = useTermCardStore();

  const showCardHandler = (name) => {
    switch (name) {
      case "Terms":
        return <TermsInfo />;
      case "Refund":
        return <RefundInfo />;
      case "Disclaimer":
        return <DisclaimerInfo />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.aboutContainer}>
      <TermCard />
      {showCardHandler(showCard)}
    </div>
  );
}
