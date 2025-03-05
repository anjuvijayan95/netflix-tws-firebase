import React from "react";
import logo from "../assets/img/netflix-logo1.png";

const Logo = ({ width, height, position, top, left, margin }) => {
  return (
    <img
      src={logo}
      alt="Netflix Logo"
      style={{ width, height, position, top, left, margin }}
    />
  );
};

export default Logo;
