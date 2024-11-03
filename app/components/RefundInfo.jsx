"use client";

import styles from "@/app/styles/about.module.css";

export default function RefundPolicy() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContainerInner}>
        <p>
          Our services are intended solely for users who are 18 years of age or
          older. Please note that Tips90predict does not offer refunds on
          subscription payments, and we cannot be held responsible for any
          financial outcomes, whether losses or gains, resulting from the use of
          our services. We strongly recommend that individuals from countries
          where betting is restricted or prohibited refrain from subscribing to
          our plans. For more details, please refer to our full Terms and
          Conditions.
        </p>
      </div>
    </div>
  );
}
