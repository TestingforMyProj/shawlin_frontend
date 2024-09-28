import React, { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll"; // Import Link from react-scroll

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => {
    setIsNavOpen(true);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <nav className={`nav1 ${isSearchOpen ? "openSearch" : ""} ${isNavOpen ? "openNav" : ""} ${isScrolled ? 'scrolled' : ''}`}>
        <i className="uil uil-bars navOpenBtn d-md-none" onClick={openNav}></i>
        <RouterLink className="navbar-brand" to="">
          <img alt="" src="assets/img/shawlin.png" className="" style={{ width: "110px" }}></img>
        </RouterLink>

        <ul className="nav-links">
          <i className="uil uil-times navCloseBtn" onClick={closeNav}></i>
          <li>
            <Link to="home" smooth={true} duration={50} onClick={closeNav}>Home</Link>
          </li>
          <li>
            <Link to="services" smooth={true} duration={50} onClick={closeNav}>Services</Link>
          </li>
          <li>
            <Link to="testimonial" smooth={true} duration={50}>Testimonials</Link>
          </li>
          <li>
            <Link to="faqs" smooth={true} duration={50} onClick={closeNav}>FAQs</Link>
          </li>
          <li>
            <Link to="community" smooth={true} duration={50} onClick={closeNav}>Community</Link>
          </li>
        </ul>
        <span>
          <a href="https://wa.me/+447918261080" target="_blank" rel="noopener noreferrer" className="">
            <i className="ri-whatsapp-fill fs-4 align-middle header_wp"></i>&nbsp;<span className="fw-bold text-light" style={{ fontSize: "13px" }}>+44 7918 261080</span>
          </a>
        </span>
      </nav>
    </>
  );
};

export default Header;
