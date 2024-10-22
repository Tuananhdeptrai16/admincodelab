import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./lesson.scss";
import axios from "axios";
import { useContext } from "react";
import StoreContext from "../../context/context";
export const Lesson = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const { setTargetCourseID } = useContext(StoreContext);
  useEffect(() => {
    const getListTutorials = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/courses?populate=lessonInfo`
        );
        setListTutorials(res.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getListTutorials();
  }, []);
  if (!listTutorials || !listTutorials.data) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <div className="loader-text-1"></div>
      </div>
    );
  }
  return (
    <div className="lesson">
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
            <p className="breadcrumb__name  breadcrumb__active">
              Quản lý bài học
            </p>
          </NavLink>
        </div>
      </div>
      <h1 className="lesson__heading">Quản lý bài học</h1>
      <p className="lesson__desc">Chọn khóa học cần thực hiện tiếp</p>
      <div className="lesson__separate"></div>
      <div className="lesson__list">
        <div className="row row-cols-4">
          {listTutorials.data.map((item) => {
            return (
              <div className="col gx-2" key={item._id}>
                <NavLink to="/lesson/details" className="lesson__link">
                  <div
                    onClick={() => setTargetCourseID(item._id)}
                    className="lesson__item"
                  >
                    <div className="lesson__img">
                      <img
                        src={item.courseImage}
                        alt=""
                        className="lesson__image"
                      />
                    </div>
                    <div className="lesson__content">
                      <p className="lesson__courses">{item.title}</p>
                      <p className="lesson__desc">
                        {item.lessonInfo.length} bài học đã tạo
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
