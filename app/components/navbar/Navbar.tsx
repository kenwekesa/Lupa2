'use client'
import React, { useState, useEffect, useRef } from "react";
import { SafeUser } from "@/app/types";
import Container from "../container/Container";
import Logo from "./Logo";
import Nav from "./nav/Nav";
import UserMenu from "./UserMenu";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleResize = () => {
      setMatches(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [query]);

  return matches;
}

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 1024px)");
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed nav-main-page sm:py-4 md:py-3 lg:py-2 xl:py-2 2xl:py-2 max-2xl:py-2 w-full z-20 shadow-sm ${
        isScrolled ? "bg-white text-black hover:text-black" : "bg-black bg-opacity-50 text-white"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="">
            <Logo />
          </div>

          {isLoaded && !isSmallScreen && (
            <div className="flex flex-grow items-center justify-between">
              <div className="logos-nav-barss">
                <Logo />
              </div>
              <Nav handleMenuToggle={handleMenuToggle}/>
              <UserMenu currentUser={currentUser} handleMenuToggle={handleMenuToggle} />
            </div>
          )}

          <div className="sm:hidden md:block lg:hidden xl:hidden 2xl:hidden max-2xl:hidden nav-bar-btn-smallscreen">
            <button
              className={`block focus:outline-none ${isScrolled ? "text-black" : "text-white"}`}
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && isSmallScreen && (
          <div className="sm:hidden md:block nav-bar-btn-smalls">
            <div className="nav-main-nav-open flex flex-col items-start gap-3 mt-3">
              <Nav handleMenuToggle={handleMenuToggle}/>
              <UserMenu currentUser={currentUser} handleMenuToggle={handleMenuToggle} />
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;







