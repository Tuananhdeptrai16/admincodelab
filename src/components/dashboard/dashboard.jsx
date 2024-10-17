import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CalendarUI from "../calendar/calendar";
import { Link } from "react-router-dom";
import StoreContext from "../../context/context";
// import Calendar from "../calendar/calendar";
export const Dashboard = () => {
  const percentage = 50;
  const [listTutorials, setListTutorials] = useState([]);
  const { userLogin } = useContext(StoreContext);
  useEffect(() => {
    try {
      const getUserAdmin = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/admins`
        );
        const foundAdmin = res.data.filter((item) => {
          return item._id === userLogin;
        });
        setListTutorials(foundAdmin);
      };
      getUserAdmin();
    } catch (error) {}
  }, [userLogin]);
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

      <div className="row">
        <div className="col-8">
          <div className="dashboard__wrap">
            <div className="dashboard__total">
              <h1 className="dashboard__heading">DashBoard</h1>
              <div className="row">
                <div className="col">
                  <div className="dashboard__welcome-wrap">
                    <div className="dashboard__welcome">
                      <div className="dashboard__content">
                        <h2 className="dashboard__hello">
                          Xin chào ,{" "}
                          <span>
                            {listTutorials.length > 0
                              ? listTutorials[0].fullname
                              : "loading"}
                          </span>
                        </h2>
                        <p className="dashboard__welcome--desc">
                          Chào mừng các bạn đến với DashBoard! Đây là nơi cung
                          cấp những thông tin chi tiết và hữu ích nhất về trang
                          CodeLab.
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
              <div className="dashboard__list row row-cols-2">
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
            <div className="row row-cols-2 ">
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
        <div className="col-3  dashboard__right">
          <div className="dashboard__information--wrap">
            <div className="dashboard__information">
              <div className="dashboard__info-bg">
                <img
                  src=""
                  className="dashboard__info-bg--img"
                  alt=""
                  srcSet=""
                />
              </div>
              <div className="dashboard__avatar">
                <img
                  src={
                    listTutorials.length > 0
                      ? listTutorials[0].image
                      : "loading"
                  }
                  alt=""
                  className="dashboard__avatar--img"
                />
              </div>
              <div className="dashboard__name">
                <p className="dashboard__name--text">
                  {listTutorials.length > 0
                    ? listTutorials[0].fullname
                    : "loading"}
                </p>
              </div>
            </div>
            <div className="dashboard__social">
              <div className="dashboard__social--item">
                <Link>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/phone.svg`}
                    alt=""
                    className="dashboard__social--icon"
                  />
                </Link>
              </div>
              <div className="dashboard__social--item">
                <Link>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/email.svg`}
                    alt=""
                    className="dashboard__social--icon"
                  />
                </Link>
              </div>
              <div className="dashboard__social--item">
                <Link>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/dots.svg`}
                    alt=""
                    className="dashboard__social--icon"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="dashboard__calendar">
            <CalendarUI></CalendarUI>
          </div>
        </div>
      </div>
    </div>
  );
};
