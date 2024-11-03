import { Toaster } from "react-hot-toast";
import Script from "next/script";
import "@/app/styles/global.css";
import {
  PoppinsBlack,
  PoppinsBold,
  PoppinsExtraBold,
  PoppinsExtraLight,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsSemiBold,
  PoppinsThin,
} from "@/app/fonts/font";


export const metadata = {
  metadataBase: new URL("https://tips90prediction.vercel.app/"),
  title: "Tips90predict - Free Football and Basketball tips & Predictions",
  applicationName: "Tips90predict",
  author: "Tips90predict",
  images:
    "https://raw.githubusercontent.com/DarknessMonarch/Tips90predict/refs/heads/master/public/assets/banner.png",
  description:
    "Access very strong tips for today games and enjoy victories with everday wining tips.",
  metadataBase: new URL("https://tips90prediction.vercel.app/"),
  keywords: [
    "betting tips",
    "Everyday winning tips",
    "100 percent winning tips",
    "Banker Of The Day",
    " Geniuine VIP Tips",
    " Bet-tip-win",
    "Double Chance",
    "Over 1.5 Goals",
    " Under 2.5 Goals",
    "Best football tips",
    " basketball tips",
    "sports betting",
    "sure straight wins"
  ],
  openGraph: {
    title: "Tips90predict - Free Football and Basketball tips & Predictions",
    description:
      "Access very strong tips for today games and enjoy victories with everday wining tips.",
    url: "https://tips90prediction.vercel.app//",
    siteName: "Tips90predict",
    images:
      "https://raw.githubusercontent.com/DarknessMonarch/Tips90predict/refs/heads/master/public/assets/banner.png",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.paypal.com/sdk/js?client-id=AecSsqZBM68JtGP4BOA4Agcdk4vDGldQJwYoU83Ig4VM7ItL6Tou_wVnixLw2d0ouZf2ap30kjv4dB-J"
        ></Script>

        {/* Google tag (gtag.js)  */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VSR6SV19V8"
        ></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${"${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}"});
          `}
        </Script>
      </head>
      <body className={`
      ${PoppinsBlack.variable}
       ${PoppinsBold.variable} 
       ${PoppinsExtraBold.variable}
        ${PoppinsExtraLight.variable}
         ${PoppinsLight.variable} 
         ${PoppinsMedium.variable} 
         ${PoppinsRegular.variable} 
         ${PoppinsSemiBold.variable}
          ${PoppinsThin.variable}`}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 8000,
            style: {
              background: "#09122eff",
              color: "#6cd7ffff",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
