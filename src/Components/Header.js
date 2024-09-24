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
    <div>
      <nav className={`nav1 ${isSearchOpen ? "openSearch" : ""} ${isNavOpen ? "openNav" : ""} ${isScrolled ? 'scrolled' : ''}`}>
        <i className="uil uil-bars navOpenBtn" onClick={openNav}></i>
        <RouterLink className="navbar-brand" to="">Landio</RouterLink>

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
        {/* <button className="btn border-0" style={{ fontSize: "14px" }} type="submit"> */}
          <span>
            <a href="https://wa.me/+447918261080" target="_blank" rel="noopener noreferrer" className="">
              <i class="ri-whatsapp-fill fs-4 align-middle text-success"></i>&nbsp;<span className="fw-bold text-dark">+447918261080</span>
            </a>
          </span>
        {/* </button> */}
      </nav>
    </div>
  );
};

export default Header;
