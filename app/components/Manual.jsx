"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/manualPayment.module.css";

export default function ManualPayment({ countryCode, price }) {
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const getPaymentDetails = () => {
      const africanPayments = {
        ke: {
          currency: "KSH",
          method: "MPESA",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via MPESA",
        },
        ng: {
          currency: "Naira",
          method: "Bank Transfer/Opay",
          name: "SAMUEL AYODELE",
          phone: "07035213038",
          description: "Send payment via Opay or Bank Transfer",
        },
        gh: {
          currency: "Cedis",
          method: "MOMO",
          name: "RICHARD BAAFI",
          phone: "0247192693",
          description: "Send payment via MOMO",
        },
        tz: {
          currency: "TZS",
          method: "M-PESA Tanzania",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via M-PESA Tanzania",
        },
        ug: {
          currency: "UGX",
          method: "Mobile Money",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via Mobile Money",
        },
        zm: {
          currency: "ZMW",
          method: "Mobile Money",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via Mobile Money",
        },
        cm: {
          currency: "XAF",
          method: "Mobile Money",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via Mobile Money",
        },
        za: {
          currency: "ZAR",
          method: "Bank Transfer",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via Bank Transfer",
        },
        rw: {
          currency: "RWF",
          method: "Mobile Money",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via Mobile Money",
        },
        mw: {
          currency: "MWK",
          method: "Mobile Money",
          name: "HANNINGTONE ODUONG",
          phone: "0743247861",
          description: "Send payment via Mobile Money",
        },
      };

      const defaultPayment = {
        currency: "USD",
        methods: [
          {
            name: "SKRILL",
            contactName: "Tycoon Consultant",
            contactInfo: "tycoonsultan254@gmail.com",
            description: "Send payment via Skrill",
          },
          {
            name: "PAYPAL",
            contactName: "Leah Nyambura",
            contactInfo: "leahnyambura710@gmail.com",
            description: "Send payment via PayPal",
          },
          {
            name: "NETELLER",
            contactName: "Manuel",
            contactInfo: "manuumedjs@gmail.com",
            description: "Send payment via Neteller",
          },
        ],
      };

      return africanPayments[countryCode] || defaultPayment;
    };

    setPaymentDetails(getPaymentDetails());
  }, [countryCode]);

  if (!paymentDetails) return null;

  return (
    <div className={styles.manualContainer}>
      <h3>Manual Payment</h3>

      {paymentDetails.methods ? (
        <>
          {paymentDetails.methods.map((method, index) => (
            <div key={index} className={styles.methodItem}>
              <h4 className={styles.methodName}>{method.name}</h4>
              <ul className={styles.instructionsList}>
                <li>
                  Name: <span>{method.contactName}</span>{" "}
                </li>
                <li>
                  Email: <span>{method.contactInfo}</span>{" "}
                </li>
                <li>
                  Amount to pay: <span>{price}</span>{" "}
                </li>
                <li>{method.description}</li>
              </ul>
            </div>
          ))}
        </>
      ) : (
        <ul className={styles.instructionsList}>
          <li>
            Name: <span>{paymentDetails.name}</span>
          </li>
          <li>
            Phone: <span>{paymentDetails.phone}</span>{" "}
          </li>
          <li>
            Amount to pay: <span>{price}</span>{" "}
          </li>
          <li>{paymentDetails.description}</li>
        </ul>
      )}
    </div>
  );
}
