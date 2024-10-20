import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./details.scss";
import axios from "axios";
import StoreContext from "../../context/context";
export const DetailsCourse = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { targetCourseID } = useContext(StoreContext);
  const [activeSection, setActiveSection] = useState(null);
  const handleToggle = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // Ẩn nếu đã hiển thị
    } else {
      setActiveSection(section); // Hiển thị phần tử được chọn
    }
  };
  console.log("active", activeSection);
  useEffect(() => {
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
  }, [targetCourseID]);
  console.log(">>listTutorials", listTutorials[0]);
  return (
    <div>
      <div className="container">
        <div className="detail">
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
              <NavLink to="/lesson" className="breadcrumb__item">
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
                              <NavLink to="/lesson/form">
                                <button className="detail__edit">
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
                                {item.contentLesson.map((content) => {
                                  return (
                                    <div
                                      key={content._id}
                                      className="detail__lecture"
                                    >
                                      <img
                                        src={`${process.env.PUBLIC_URL}/images/icon/file1.svg`}
                                        alt=""
                                        srcSet=""
                                        className="detail__icon icon"
                                      />
                                      <p className="detail__text">
                                        {content.title}
                                      </p>
                                    </div>
                                  );
                                })}
                                <div className="detail__lecture">
                                  <img
                                    src={`${process.env.PUBLIC_URL}/images/icon/pen.svg`}
                                    alt=""
                                    srcSet=""
                                    className="detail__icon icon"
                                  />
                                  <p className="detail__text">
                                    3. Cài đặt VS Code, Page Ruler extension
                                  </p>
                                </div>
                                <NavLink to="/lesson/formEx">
                                  <button className="detail__add">
                                    <img
                                      src={`${process.env.PUBLIC_URL}/images/icon/pen1.svg`}
                                      alt=""
                                      srcSet=""
                                      className="detail__icon icon"
                                    />
                                    Thêm bài tập
                                  </button>
                                </NavLink>
                                <button className="detail__delete">
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
                  <NavLink to="/lesson/form">
                    <button className="detail__add">
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
