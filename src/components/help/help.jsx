import React from "react";
import { NavLink } from "react-router-dom";
import "./Help.scss";
export const Help = () => {
  return (
    <div>
      <h1 className="help__heading">
        Chào mừng các bạn đến với trang Admin !! Nơi quản lý các khóa học ,
        người dùng , blog, .... của trang học trực tuyến CodeLab !!!! Nếu có bất
        cứ khó khăn gì vui lòng liên hệ{" "}
        <NavLink to="tel:+84373696603" className="help__phone">
          0373696603
        </NavLink>
        để khắc phục sự cố 😁😁😁😁😁😁❤️❤️
      </h1>
    </div>
  );
};
