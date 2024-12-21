import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./details.scss";
import axios from "axios";
import StoreContext from "../../context/Context";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export const DetailsCourse = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { setAction, targetCourseID, setTargetLessonID } =
    useContext(StoreContext);
  const [activeSection, setActiveSection] = useState(null);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState("");
  const [toastError, setToastError] = useState(false);
  const handleToggle = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // Ẩn nếu đã hiển thị
    } else {
      setActiveSection(section); // Hiển thị phần tử được chọn
    }
  };
  useEffect(() => {
    NProgress.start();
    const getListTutorials = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/courses?populate=lessonInfo`
        );
        const foundCourse = res.data.data.filter(
          (item) => item._id === targetCourseID
        );
        setListTutorials(foundCourse);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getListTutorials();
    NProgress.done();
  }, [targetCourseID]);
  const deleteLesson = async (courseId, lessonId) => {
    NProgress.start();
    try {
      const dataDelete = {
        lessonId: lessonId,
        courseId: courseId,
      };

      await axios.delete(`${process.env.REACT_APP_API_BACKEND_URL}/lesson`, {
        data: dataDelete,
      });
      const getListTutorials = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_BACKEND_URL}/courses?populate=lessonInfo`
          );
          const foundCourse = res.data.data.filter(
            (item) => item._id === targetCourseID
          );
          setListTutorials(foundCourse);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      getListTutorials();
      setToastSuccess(true);
      setTimeout(() => {
        setToastSuccess(false);
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Có lỗi xảy ra";
        setError(errorMessage);
      } else {
        setError("Có lỗi không xác định");
      }
      setToastError(true);
      setTimeout(() => {
        setToastError(false);
      });
    }
    NProgress.done();
  };
  return (
    <div>
      {toastSuccess === true ? (
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
            <p className="toast__msg">Bạn vui lòng đợi kết quả ...</p>
          </div>
          <div className="toast__close">
            <i className="fas fa-times"></i>
          </div>
        </div>
      ) : toastError === true ? (
        <div>
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
              <p className="toast__msg">{error}</p>
            </div>
            <div className="toast__close">
              <i className="fas fa-times"></i>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        <div className="detail">
          <div className="breadcrumb">
            <div className="breadcrumb__wrap">
              <NavLink to="/admincodelab/home" className="breadcrumb__item">
                <p className="breadcrumb__name">Trang chủ</p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                  alt=""
                  className="breadcrumb__icon-arrow"
                />
              </NavLink>
              <NavLink to="/admincodelab/lesson" className="breadcrumb__item">
                <p className="breadcrumb__name">Quản lý khóa học</p>
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                  alt=""
                  className="breadcrumb__icon-arrow"
                />
              </NavLink>
              <NavLink to="/studyplant/frontEnd" className="breadcrumb__item">
                <p className="breadcrumb__name breadcrumb__active">
                  {listTutorials[0] ? listTutorials[0].title : "Loading..."}
                </p>
              </NavLink>
            </div>
          </div>
          <div className="row detail__main">
            <div className="col-8 col-lg-12">
              <div className="detail__content">
                <h2 className="detail__heading">Nội dung khóa học</h2>
                <div className="detail__info">
                  <div className="detail__info--left">
                    <p className="detail__text">
                      •
                      {listTutorials[0]
                        ? listTutorials[0].lessonInfo.length
                        : "Loading..."}
                      phần
                    </p>
                    <p className="detail__text">
                      •
                      {listTutorials[0]
                        ? listTutorials[0].lessonInfo.length
                        : "Loading..."}{" "}
                      bài học
                    </p>
                    <p className="detail__text">
                      • 6 giờ 19 phút tổng thời lượng
                    </p>
                  </div>
                  <div className="detail__info--right">
                    <button
                      onClick={() => setToggle(!toggle)}
                      className="detail__extend--button"
                    >
                      Mở rộng tất cả các phần
                    </button>
                  </div>
                </div>
                <div className="detail__list">
                  {listTutorials[0]
                    ? listTutorials[0].lessonInfo.map((item) => {
                        return (
                          <div
                            onClick={() => handleToggle(item._id)}
                            key={item._id}
                            className="detail__component"
                          >
                            <button className="detail__item--info">
                              <div className="detail__item--wrap">
                                <img
                                  src={`${process.env.PUBLIC_URL}/images/icon/${
                                    toggle ? "arrow-up.svg" : "arrow-down.svg"
                                  }`}
                                  alt=""
                                  srcSet=""
                                  className="detail__icon icon"
                                />
                                <p className="detail__item-text">
                                  {item.title}
                                </p>
                              </div>
                              <NavLink to="/admincodelab/lesson/form">
                                <button
                                  onClick={() => {
                                    setAction("U");
                                    setTargetLessonID(item._id);
                                  }}
                                  className="detail__edit"
                                >
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icon/edit1.svg`}
                                    alt=""
                                    srcSet=""
                                    className="detail__icon icon"
                                  />
                                  <p className="detail__item--desc">
                                    Chỉnh sửa
                                  </p>
                                </button>
                              </NavLink>
                            </button>

                            {activeSection === item._id || toggle === true ? (
                              <div className="detail__lecture--wrap">
                                <div className="detail__action">
                                  <NavLink to="/admincodelab/lesson/formEx">
                                    <button
                                      onClick={() => {
                                        setTargetLessonID(item._id);
                                        setAction("C");
                                      }}
                                      className="detail__add"
                                    >
                                      <img
                                        src={`${process.env.PUBLIC_URL}/images/icon/plus.svg`}
                                        alt=""
                                        srcSet=""
                                        className="detail__icon icon"
                                      />
                                      Thêm bài tập
                                    </button>
                                  </NavLink>
                                  <NavLink to="/admincodelab/lesson/formEx">
                                    <button
                                      onClick={() => {
                                        setTargetLessonID(item._id);
                                        setAction("U");
                                      }}
                                      className="detail__add"
                                    >
                                      <img
                                        src={`${process.env.PUBLIC_URL}/images/icon/pen1.svg`}
                                        alt=""
                                        srcSet=""
                                        className="detail__icon icon"
                                      />
                                      Sửa bài tập
                                    </button>
                                  </NavLink>
                                </div>
                                <button
                                  onClick={async () => {
                                    deleteLesson(targetCourseID, item._id);
                                  }}
                                  className="detail__delete"
                                >
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icon/trash1.svg`}
                                    alt=""
                                    srcSet=""
                                    className="detail__icon icon"
                                  />
                                  Xóa bài học
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })
                    : ""}
                  <NavLink to="/admincodelab/lesson/form">
                    <button
                      onClick={() => setAction("C")}
                      className="detail__add"
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon/plus.svg`}
                        alt=""
                        srcSet=""
                        className="detail__icon icon"
                      />
                      Thêm bài học
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-4 d-lg-none">
              <div className="detail__wrap">
                <div className="detail__background d-xl-none">
                  <img
                    src={
                      listTutorials[0]
                        ? listTutorials[0].courseImage
                        : "Loading..."
                    }
                    alt=""
                    srcSet=""
                    className="detail__img"
                  />
                </div>
                <div className="detail__includes">
                  <p className="detail__includes--heading">
                    Khóa học này cung cấp
                  </p>

                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/level.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">Trình độ cơ bản</p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/file1.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">12 tài liệu</p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/lesson1.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">Bài tập luyện tập mỗi bài</p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/star.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon"
                    />
                    <p className="detail__text">Tổng số 100 ⭐</p>
                  </div>
                  <div className="detail__item">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon/certify.svg`}
                      alt=""
                      srcSet=""
                      className="detail__icon icon"
                    />
                    <p className="detail__text">Có chứng nhận khi hoàn thành</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
