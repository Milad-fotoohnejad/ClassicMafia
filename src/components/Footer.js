import React from 'react';
import footerLogo from "../images/logo192.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className=" bottom-0 w-full FooterBackground text-gold text-center p-4">
      <img src={footerLogo} alt="Footer Logo" className="inline-block w-20 h-20 mr-2" />
      <p>© 2023 Mafia Game</p>
    </footer>
  );
};

export default Footer;
