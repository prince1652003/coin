import "../assets/header.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <h1>CryptoCoin.com</h1>

      <div className="rt">
        <Link to="/coins">Coins</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
};

export default Header;
