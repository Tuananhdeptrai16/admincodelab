import React from "react";
import "./toast.scss";
export const Toast = () => {
  return (
    <div id="toast" className="toast toast--error">
      <div className="toast__icon">
        <img
          src={`${process.env.PUBLIC_URL}/images/icon/error.svg`}
          alt=""
          className="toast__icon-svg"
        />
      </div>
      <div className="toast__body">
        <h3 className="toast__title">Thông báo lỗi</h3>
        <p className="toast__msg">Vui lòng liên hệ đội ngũ kỹ thuật !</p>
      </div>
      <div className="toast__close">
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};
