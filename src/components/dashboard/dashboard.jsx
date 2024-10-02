import React from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export const Dashboard = () => {
  const percentage = 50;

  return (
    <div className="dashboard">
      <div className="breadcrumb">
        <div className="breadcrumb__wrap">
          <NavLink to="/home" className="breadcrumb__item">
            <p className="breadcrumb__name">Trang chủ</p>
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
              alt=""
              className="breadcrumb__icon-arrow"
            />
          </NavLink>
          <NavLink to="/page" className="breadcrumb__item">
            <p className="breadcrumb__name  breadcrumb__active">DashBoard</p>
          </NavLink>
        </div>
      </div>

      <div className="dashboard__wrap">
        <div className="dashboard__total">
          <h1 className="dashboard__heading">DashBoard</h1>
          <div className="row">
            <div className="col">
              <div className="dashboard__welcome-wrap">
                <div className="dashboard__welcome">
                  <div className="dashboard__content">
                    <h2 className="dashboard__hello">
                      Xin chào , <span>Tuan Anh </span>
                    </h2>
                    <p className="dashboard__welcome--desc">
                      Chào mừng các bạn đến với DashBoard, những thông tin chi
                      tiết của trang CodeLab sẽ hiển thị tại đây!!!!
                    </p>
                    <button className="dashboard__more">Xem thêm </button>
                  </div>
                  <div className="dashboard__background">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/background.svg`}
                      alt=""
                      className="dashboard__background--img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard__list row row-cols-3">
            <div className="col">
              <div className="dashboard__item dashboard__courses">
                <div className="dashboard__item--icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/page.svg`}
                    alt=""
                    className="dashboard__icon icon"
                  />
                </div>
                <div className="dashboard__item--content">
                  <p className="dashboard__desc">khóa học đã tạo</p>
                  <span className="dashboard__number">
                    01 <span className="dashboard__number--desc">khóa</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__lesson">
                <div className="dashboard__item--icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/lesson.svg`}
                    alt="svg"
                    className="dashboard__icon"
                  />
                </div>
                <div className="dashboard__item--content">
                  <p className="dashboard__desc">khóa học đã tạo</p>
                  <span className="dashboard__number">
                    01 <span className="dashboard__number--desc">khóa</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__blog">
                <div className="dashboard__item--icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/blog.svg`}
                    alt="svg"
                    className="dashboard__icon"
                  />
                </div>
                <div className="dashboard__item--content">
                  <p className="dashboard__desc">khóa học đã tạo</p>
                  <span className="dashboard__number">
                    01 <span className="dashboard__number--desc">khóa</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__comment">
                <div className="dashboard__item--icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/comment.svg`}
                    alt="svg"
                    className="dashboard__icon"
                  />
                </div>
                <div className="dashboard__item--content">
                  <p className="dashboard__desc">khóa học đã tạo</p>
                  <span className="dashboard__number">
                    01 <span className="dashboard__number--desc">khóa</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__members">
                <div className="dashboard__item--icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/user_group.svg`}
                    alt="svg"
                    className="dashboard__icon"
                  />
                </div>
                <div className="dashboard__item--content">
                  <p className="dashboard__desc">khóa học đã tạo</p>
                  <span className="dashboard__number">
                    01 <span className="dashboard__number--desc">khóa</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__admin-total">
                <div className="dashboard__item--icon">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/user_admin.svg`}
                    alt="svg"
                    className="dashboard__icon icon"
                  />
                </div>
                <div className="dashboard__item--content">
                  <p className="dashboard__desc">khóa học đã tạo</p>
                  <span className="dashboard__number">
                    01 <span className="dashboard__number--desc">khóa</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__admin">
        <h1 className="dashboard__heading">Tiến độ</h1>
        <div className="row row-cols-3 ">
          <div className="col">
            <div className="dashboard__item dashboard__admin-total">
              <div style={{ width: 80, height: 80 }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    // rotation: 0.25,
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                    textColor: "#333",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#5795e1",
                    strokeWidth: 50, // Tăng độ dày của viền
                  })}
                />
                ;
              </div>
              <div className="dashboard__item--content">
                <p className="dashboard__desc">khóa học đã tạo</p>
                <span className="dashboard__number">
                  01 <span className="dashboard__number--desc">khóa</span>
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="dashboard__item dashboard__admin-total">
              <div style={{ width: 80, height: 80 }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    // rotation: 0.25,
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                    textColor: "#333",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                    strokeWidth: 50, // Tăng độ dày của viền
                  })}
                />
                ;
              </div>
              <div className="dashboard__item--content">
                <p className="dashboard__desc">khóa học đã tạo</p>
                <span className="dashboard__number">
                  01 <span className="dashboard__number--desc">khóa</span>
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="dashboard__item dashboard__admin-total">
              <div style={{ width: 80, height: 80 }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    // rotation: 0.25,
                    strokeLinecap: "round",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                    textColor: "#333",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                    strokeWidth: 50, // Tăng độ dày của viền
                  })}
                />
                ;
              </div>
              <div className="dashboard__item--content">
                <p className="dashboard__desc">khóa học đã tạo</p>
                <span className="dashboard__number">
                  01 <span className="dashboard__number--desc">khóa</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
