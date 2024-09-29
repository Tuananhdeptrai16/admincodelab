import React from "react";
import { NavLink } from "react-router-dom";
import "./logo.scss";
const Logo = () => {
  return (
    <div className="logo">
      <NavLink to="/home" className="logo__wrap">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            className="logo__img"
          />
        </div>
        <span className="logo__name">
          Code<span className="logo__highlight">Lab</span>
        </span>
      </NavLink>
    </div>
  );
};

export default Logo;
