"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/app/store/Auth";
import { useEffect, useState } from "react";
import LogoImg from "@/public/assets/logo.png";
import { useDrawerStore } from "@/app/store/Drawer";
import styles from "@/app/styles/sideNav.module.css";
import { usePathname } from "next/navigation";
import { RiVipLine as VipIcon } from "react-icons/ri";
import {
  RiDashboardHorizontalLine as DashboardIcon,
  RiMenuUnfold2Line as MenuIcon,
} from "react-icons/ri";
import { HiOutlineLogout as LogoutIcon } from "react-icons/hi";
import { IoBookOutline as TermsIcon } from "react-icons/io5";
import { PiTelegramLogo as TelegramLogo } from "react-icons/pi";
import { RiFolderInfoFill as AboutIcon } from "react-icons/ri";
import {
  GiReceiveMoney as MoneyIcon,
  GiSportMedal as WinIcon,
} from "react-icons/gi";
import { GiBasketballBasket as BasketballIcon } from "react-icons/gi";
import { GoGoal as StraightWinIcon } from "react-icons/go";
import { GiGoalKeeper as BankerIcon } from "react-icons/gi";
export default function SideNav() {
  const { isOpen, toggleOpen } = useDrawerStore();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { isAuth, toggleAuth } = useAuthStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClasses = `${styles.sideContainer} ${
    isMobile
      ? isOpen
        ? styles.showSideNav
        : styles.hideSideNav
      : styles.showSideNav
  }`;

  const openTelegram = () => {
    window.open("https://t.me/+p9eRLjKRtv45Y2Fk", "_blank");
  };

  const logout = () => {
    toggleAuth();
  };

  return (
    <div className={sidebarClasses}>
      {isMobile && (
        <div onClick={toggleOpen} className={styles.toggleMenuButton}>
          <MenuIcon
            className={styles.toggleMenuIcon}
            aria-label="Toggle menu"
            alt="toggle menu icon"
          />
        </div>
      )}
      <div className={styles.sideContent}>
        <div className={styles.sideLogo}>
          <Image
            className={styles.logo}
            src={LogoImg}
            alt="logo"
            height={35}
            priority
          />
        </div>
        <div className={styles.sideTop}>
          {isAuth && (
            <Link href="/page/dashboard" className={styles.sideLink}>
              <div
                className={`${styles.innerSideLink} ${
                  pathname === "/page/dashboard" ||
                  pathname.startsWith("/page/dashboard/")
                    ? styles.activeLink
                    : ""
                }`}
              >
                <DashboardIcon
                  alt="dashboard icon"
                  aria-label="dashboard icon"
                  className={styles.linkIcon}
                />
                <h1>Dashboard</h1>
              </div>
            </Link>
          )}

          <Link href="/page/banker" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/banker" ||
                pathname.startsWith("/page/banker/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <BankerIcon
                alt="banker icon"
                aria-label="banker icon"
                className={styles.linkIcon}
              />
              <h1>Banker of the day</h1>
            </div>
          </Link>
          <Link href="/page/winning" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/winning" ||
                pathname.startsWith("/page/winning/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <WinIcon
                alt="winning icon"
                aria-label="winning icon"
                className={styles.linkIcon}
              />
              <h1>100% winning tips</h1>
            </div>
          </Link>
          <Link href="/page/straight" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/straight" ||
                pathname.startsWith("/page/straight/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <StraightWinIcon
                alt="straight icon"
                aria-label="straight icon"
                className={styles.linkIcon}
              />
              <h1>Straight wins</h1>
            </div>
          </Link>
          <Link href="/page/basketball" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/basketball" ||
                pathname.startsWith("/page/basketball/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <BasketballIcon
                alt="basketball icon"
                aria-label="basketball icon"
                className={styles.linkIcon}
              />
              <h1>Basketball</h1>
            </div>
          </Link>

          <Link href="/page/vip" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/vip" || pathname.startsWith("/page/vip/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <VipIcon
                alt="vip icon"
                aria-label="vip icon"
                className={styles.linkIcon}
              />
              <h1>Vip</h1>
            </div>
          </Link>
          <Link href="/page/payment" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/payment" ||
                pathname.startsWith("/page/payment/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <MoneyIcon
                alt="payment icon"
                aria-label="payment icon"
                className={styles.linkIcon}
              />
              <h1>How to pay</h1>
            </div>
          </Link>

          <div className={styles.sideLink} onClick={openTelegram}>
            <div className={styles.innerSideLink}>
              <TelegramLogo
                alt="telegran icon"
                aria-label="telegram icon"
                className={styles.linkIcon}
              />
              <h1>Join telegram</h1>
            </div>
          </div>
          <Link href="/page/about" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/about" ||
                pathname.startsWith("/page/about/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <AboutIcon
                alt="about icon"
                aria-label="about icon"
                className={styles.linkIcon}
              />
              <h1>About</h1>
            </div>
          </Link>
          <Link href="/page/terms" className={styles.sideLink}>
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/terms" ||
                pathname.startsWith("/page/terms/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <TermsIcon
                alt="terms icon"
                aria-label="terms icon"
                className={styles.linkIcon}
              />
              <h1>Terms and Condition</h1>
            </div>
          </Link>
          <div onClick={logout} className={styles.sideLink}>
            <div
              className={styles.innerSideLink}
            >
              <LogoutIcon
                alt="logout icon"
                aria-label="logout icon"
                className={styles.linkIcon}
              />
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
