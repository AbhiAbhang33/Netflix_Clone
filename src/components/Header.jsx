import { useState, useEffect } from "react";

import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <header className={scrolled ? "nav-bg-black" : ""}>
      <a href="/" className="nav_logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
      </a>

      <button className="header__btn">Sign In</button>
    </header>
  );
};

export default Header;
