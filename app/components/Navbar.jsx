"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import Loading from "@/app/components/loader";
import { useAuthStore } from "@/app/store/Auth";
import { useDrawerStore } from "@/app/store/Drawer";
import styles from "@/app/styles/navbar.module.css";
import ProfileImg from "@/public/assets/profile.jpg";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  RiSearch2Line as SearchIcon,
  RiUserLine as UserIcon,
} from "react-icons/ri";
import { HiOutlineLogout as LogoutIcon } from "react-icons/hi";

import { RiMenuFold2Line as MenuIcon } from "react-icons/ri";
const SearchBar = ({ value, onChange, className }) => (
  <div className={`${styles.searchContainer} ${className}`}>
    <SearchIcon
      alt="search icon"
      className={styles.searchIcon}
      aria-label="Search"
    />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search ..."
      className={styles.searchInput}
      aria-label="Search input"
    />
  </div>
);

export default function NavbarComponent() {
  const [profile, setProfile] = useState(ProfileImg);
  const [username, setUsername] = useState("penguin");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, toggleOpen } = useDrawerStore();
  const [isMobile, setIsMobile] = useState(false);
  const { isAuth, toggleAuth } = useAuthStore();
  const [status, setStatus] = useState("user");
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSearchablePage =
    pathname === "/page/banker" ||
    pathname === "/page/winning" ||
    pathname === "/page/basketball" ||
    pathname === "/page/straight" ||
    pathname === "/page/vip";

  const performSearch = useMemo(
    () =>
      debounce((searchValue) => {
        const params = new URLSearchParams(searchParams);
        if (searchValue) {
          params.set("q", searchValue);
        } else {
          params.delete("q");
        }
        router.replace(`${pathname}?${params}`);
      }, 300),
    [searchParams, router, pathname]
  );

  useEffect(() => {
    performSearch(search.trim());

    return () => performSearch.cancel();
  }, [search, performSearch, isSearchablePage]);

  const handleInputChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoading(true);
    try {
      toggleAuth(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  }, [toggleAuth]);

  const handleLogin = useCallback(() => {
    router.push("/authentication/login", { scroll: false });
  }, []);

  return (
    <nav className={styles.navMain}>
      <div className={styles.navContainer}>
        <div className={styles.navContainerLeft}>
          {!isOpen && (
            <MenuIcon
              onClick={toggleOpen}
              className={styles.menuIcon}
              aria-label="Toggle menu"
              alt="toggle menu icon"
            />
          )}
          {isSearchablePage ? (
            <SearchBar
              value={search}
              onChange={handleInputChange}
              className={styles.desktopSearch}
            />
          ) : isAuth && !isMobile ? (
            <div className={styles.userProfile}>
              <Image
                src={profile}
                height={35}
                width={35}
                alt={`${username}'s profile`}
                priority
                className={styles.profileImg}
              />
              <h1 className={styles.username}>
                {username} <span>({status})</span>
              </h1>
            </div>
          ) : (
            <></>
          )}
        </div>

        {isAuth ? (
          <div
            className={styles.userSection}
            style={{ width: !isOpen || isMobile ? "auto" : "" }}
          >
            {(isMobile || isSearchablePage) && (
              <div className={styles.userProfile}>
                <Image
                  src={profile}
                  height={35}
                  width={35}
                  alt={`${username}'s profile`}
                  priority
                  className={styles.profileImg}
                />
                <h1 className={styles.username}>
                  {username} <span>({status})</span>
                </h1>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={styles.userButton}
              aria-label="Logout"
            >
              {isLoading ? (
                <Loading />
              ) : (
                <LogoutIcon className={styles.userIcon} />
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={styles.userButton}
            aria-label="Login"
          >
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <UserIcon alt="user icon" className={styles.userIcon} />
                <span>Login</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Mobile search bar */}
      {isSearchablePage ? (
        <SearchBar
          value={search}
          onChange={handleInputChange}
          className={styles.mobileSearch}
        />
      ) : (
        ""
      )}
    </nav>
  );
}
