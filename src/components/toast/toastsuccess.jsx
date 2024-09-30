import React from "react";

export const ToastSuccess = () => {
  return (
    <div id="toast" className="toast toast--success">
      <div className="toast__icon">
        <img
          src={`${process.env.PUBLIC_URL}/images/icon/like.svg`}
          alt=""
          className="toast__icon-svg"
        />
      </div>
      <div className="toast__body">
        <h3 className="toast__title">Thành Công</h3>
        <p className="toast__msg">Đang chuyển hướng .....</p>
      </div>
      <div className="toast__close">
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};
