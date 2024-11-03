"use client";

import Image from "next/image";
import Script from "next/script";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Manual from "@/app/components/Manual";
import { useManualStore } from "@/app/store/Manual";
import CardImage from "@/public/assets/card.png";
import MpesaImage from "@/public/assets/mpesa.png";
import CountriesData from "@/app/components/Countries";
import manualImage from "@/public/assets/manual.png";
import SkrillImage from "@/public/assets/skrill.png";
import CoinbaseImage from "@/public/assets/crypto.png";
import PaypalImage from "@/public/assets/paypal.png";
import styles from "@/app/styles/paymentmethod.module.css";
import { useSearchParams } from "next/navigation";

const PAYMENT_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  COINBASE_KEY: process.env.NEXT_PUBLIC_COINBASE_KEY,
  PAYSTACK_KEY: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
  SERVER_HOST: process.env.NEXT_PUBLIC_SERVER_HOST,
};

const AFRICAN_COUNTRIES = CountriesData.filter((country) => [
  "KE",
  "NG",
  "CM",
  "GH",
  "ZA",
  "TZ",
  "UG",
  "ZM",
  "RW",
  "MW",
]).map((country) => country.code.toLowerCase());

export default function PaymentMethods({ params }) {
  const [paymentState, setPaymentState] = useState({
    isPaid: false,
    isCancel: false,
    status: "",
    result: null,
  });
  const [customerId, setCustomerId] = useState("");

  const searchParams = useSearchParams();
  const slug = decodeURIComponent(params.slug || "");
  const { showManual, toggleManual } = useManualStore();
  const currentCountry = slug?.trim().toLowerCase() || "";
  const selectedPrice = searchParams.get("price") || "";
  const selectedPlan = searchParams.get("plan") || "";

  const getCountryCode = (countryName) => {
    const country = CountriesData.find(
      (c) => c.name.toLowerCase() === countryName.toLowerCase()
    );
    return country ? country.code.toLowerCase() : null;
  };

  const [showMethods, setShowMethods] = useState({
    mpesa: false,
    coinbase: false,
    paypal: false,
    stripe: false,
    manual: false,
    skrill: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCustomerId(localStorage.getItem("id") || null);
    }
  }, []);

  useEffect(() => {
    if (currentCountry) {
      const countryCode = getCountryCode(currentCountry);

      setShowMethods({
        mpesa: countryCode === "ke",
        manual: countryCode !== "other",
        skrill: countryCode === "other",
        coinbase: countryCode ? true : false,
        stripe: countryCode ? true : false,
        paypal: countryCode ? true : false,
      });
    }
  }, [currentCountry]);

  const addVIPAccess = async () => {
    if (!paymentState.isPaid) {
      toast.error("Payment failed");
      return;
    }

    if (!customerId) {
      toast.error("Login or create an account to pay");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const currentDate = new Date();
      const formattedDate = `${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}-${currentDate.getFullYear()}`;
      const account = JSON.parse(localStorage.getItem("account"));

      const response = await fetch(
        `${PAYMENT_CONFIG.SERVER_HOST}/auth/update/${customerId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paid: true,
            plan: selectedPlan,
            activationDate: formattedDate,
            days: selectedPlan === "Weekly" ? 7 : 30,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update account");

      account.status = true;
      localStorage.setItem("account", JSON.stringify(account));
      localStorage.setItem("paid", "true");

      toast.success("Payment successful!");
      window.location.href = "https://www.tips90predict.com/vip";
    } catch (err) {
      toast.error("An error occurred while updating your account.");
    }
  };

  const handlePayManually = () => {
    toggleManual();
  };

  const handleStripeCheckout = () => {
    const checkoutUrl =
      selectedPlan === "Weekly"
        ? "https://buy.stripe.com/"
        : "https://buy.stripe.com/";
    window.open(checkoutUrl, "_blank");
    addVIPAccess();
  };

  const handleMpesaPayment = () => {
    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("Login or create an account to pay");
      return;
    }

    const PaystackPop = require("@paystack/inline-js");
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: PAYMENT_CONFIG.PAYSTACK_KEY,
      email,
      amount: Number(selectedPrice) * 100,
      currency: "KES",
      ref: `ref_${Math.floor(Math.random() * 1000000000 + 1)}`,
      callback: (response) => {
        if (response.status === "success") {
          setPaymentState((prev) => ({
            ...prev,
            isPaid: true,
            status: "success",
          }));
          addVIPAccess();
        } else {
          setPaymentState((prev) => ({
            ...prev,
            isCancel: true,
            status: "cancelled",
          }));
          toast.error("Payment failed");
        }
      },
      onClose: () => {
        setPaymentState((prev) => ({
          ...prev,
          isCancel: true,
          status: "cancelled",
        }));
        toast.error("Payment failed");
      },
    });
  };

  const handleCoinbasePayment = async () => {
    try {
      const response = await fetch(
        "https://api.commerce.coinbase.com/charges/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CC-Api-Key": PAYMENT_CONFIG.COINBASE_KEY,
          },
          body: JSON.stringify({
            name: "Vip subscription",
            description: "Subscribe for vip",
            pricing_type: "fixed_price",
            local_price: {
              amount: selectedPrice,
              currency: "USD",
            },
            cancel_url: "",
            success_url: "https://www.tips90predict.com/vip",
          }),
        }
      );

      if (!response.ok) throw new Error("Coinbase payment failed");

      const data = await response.json();
      window.location.href = data.data.hosted_url;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    const loadPayPalScript = async () => {
      if (!window.paypal) return;

      try {
        await window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedPrice,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const details = await actions.order.capture();
              setPaymentState((prev) => ({
                ...prev,
                result: details,
                isPaid: true,
                status: "success",
              }));
              addVIPAccess();
            },
            onError: (err) => {
              setPaymentState((prev) => ({
                ...prev,
                isCancel: true,
                status: "error",
              }));
              toast.error("Payment failed");
              console.error("PayPal error:", err);
            },
            onCancel: () => {
              setPaymentState((prev) => ({
                ...prev,
                isCancel: true,
                status: "cancelled",
              }));
              toast.error("Payment failed");
            },
          })
          .render("#paypal-button-container");
      } catch (error) {
        console.error("Error rendering PayPal buttons:", error);
      }
    };

    if (showMethods.paypal) {
      loadPayPalScript();
    }
  }, [currentCountry, selectedPlan, selectedPrice, showMethods.paypal]);

  return (
    <div className={styles.paymentContainer}>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYMENT_CONFIG.CLIENT_ID}&currency=USD`}
        strategy="lazyOnload"
      />
      <div className={styles.paymentContainerHeader}>
        <h1>Choose your payment method</h1>
      </div>

      <div className={styles.paymentLayout}>
        {showMethods.mpesa && (
          <PaymentOption
            image={MpesaImage}
            alt="mpesa logo"
            onClick={handleMpesaPayment}
            buttonText="Pay Now"
          />
        )}

        {showMethods.stripe && (
          <PaymentOption
            image={CardImage}
            alt="card logo"
            onClick={handleStripeCheckout}
            buttonText="Pay with card"
          />
        )}

        {showMethods.paypal && (
          <div className={styles.payController} id="paypal-button-container">
            <Image
              src={PaypalImage}
              alt="paypal logo"
              width={200}
              height={100}
              className={styles.paymentPaypalImage}
            />
          </div>
        )}

        {showMethods.coinbase && (
          <PaymentOption
            image={CoinbaseImage}
            alt="coinbase logo"
            onClick={handleCoinbasePayment}
            buttonText="Pay with crypto"
          />
        )}

        {showMethods.manual && (
          <div className={styles.payController}>
            <div className={styles.paymentImageWp}>
              <Image
                className={styles.paymentImage}
                src={manualImage}
                alt="manual image"
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <h1>Manual payment</h1>
            <p>Manual option is also available</p>
            <button
              type="button"
              onClick={handlePayManually}
              className={styles.btnPay}
            >
             {showManual ? "Hide manual payment" : "Show manual payment"}
            </button>
          </div>
        )}

        {showMethods.skrill && (
          <PaymentOption
            image={SkrillImage}
            alt="skrill logo"
            onClick={handlePayManually}
            buttonText="Pay Now"
          />
        )}
      </div>
      {showManual && (
        <div className={styles.paymentManual}>
          <Manual
            countryCode={getCountryCode(currentCountry)}
            price={selectedPrice.toLowerCase()}
          />
        </div>
      )}
    </div>
  );
}

const PaymentOption = ({ image, alt, onClick, buttonText }) => (
  <div className={styles.payController}>
    <div className={styles.paymentImageWp}>
      <Image
        className={styles.paymentImage}
        src={image}
        alt={alt}
        layout="fill"
        objectFit="cover"
        priority={true}
      />
    </div>

    <div className={styles.btnWp}>
      <button type="button" onClick={onClick} className={styles.btnPay}>
        {buttonText}
      </button>
    </div>
  </div>
);
