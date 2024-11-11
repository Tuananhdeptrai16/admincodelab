import React from "react";
import "./notice.scss";
const DesktopNotice = () => {
  return (
    <div className="notice">
      <img
        src={`${process.env.PUBLIC_URL}/images/e.png`}
        alt=""
        className="notice__img"
      />
      Trang này được thiết kế để hiển thị tốt nhất trên màn hình desktop.
    </div>
  );
};

export default DesktopNotice;
