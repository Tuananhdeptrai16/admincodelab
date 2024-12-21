import React from "react";
import { NavLink } from "react-router-dom";
import "./logo.scss";
export const LogoOnly = () => {
  return (
    <div className="logo">
      <div className="logo__wrap">
        <NavLink to="/admincodelab/home">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            className="logo__img "
          />
        </NavLink>
      </div>
    </div>
  );
};
