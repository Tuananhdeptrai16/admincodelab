import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./lesson.scss";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";
export const Exercise = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const { setTargetCourseID } = useContext(StoreContext);
  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };

  useEffect(() => {
    getListTutorials();
  }, []);
  if (!listTutorials || !listTutorials.data) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <h1 className="loader__text">Loading....</h1>
      </div>
    );
  }

  return (
    <>
      <div className="Lesson">
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
            <NavLink to="/exercise" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">Bài tập</p>
            </NavLink>
          </div>
        </div>
        <h1 className="Lesson__heading">Quản lý bài tập</h1>
        <p className="Lesson__desc">
          Vui lòng chọn một khóa học bạn muốn thêm bài học để tiếp tục !
        </p>
        <div className="Lesson__separate"></div>
        <div className="Lesson__search">
          <input
            type="text"
            name=""
            placeholder="Tìm kiếm khóa học..."
            id=""
            className="Lesson__search--input"
          />
          <button className="Lesson__search--btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/search.svg`}
              className="Lesson__adding--icon"
              alt=""
            />
          </button>
        </div>

        <div className="Lesson__list">
          <div className="Lesson__item">
            <table>
              <thead>
                <tr>
                  <th className="Lesson__id Lesson__border--left">
                    Tên khóa học
                  </th>
                  <th>Khóa học</th>
                  <th>Người tạo</th>
                  <th>Ngày tạo</th>
                  <th>Số bài học</th>
                  <th>Danh mục</th>
                  <th className="Lesson__border--right"> Chỉnh sửa</th>
                </tr>
              </thead>
              <tbody>
                {listTutorials.data.length > 0 ? (
                  listTutorials.data.map((item, index) => {
                    return (
                      <tr key={`${index}-tutorials`}>
                        <td>
                          <div className="Lesson__avatar">
                            <img
                              src={
                                item.background
                                  ? `${item.background}`
                                  : `${process.env.PUBLIC_URL}/images/avatarLesson.jpg`
                              }
                              alt=""
                              className="Lesson__img"
                            />
                            <p className="Lesson__name">{item.title}</p>
                          </div>
                        </td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                          {item.lessons.length <= 10
                            ? `0${item.lessons.length}`
                            : item.lessons.length}
                        </td>
                        <td>{item.category}</td>
                        <td className="Lesson__action">
                          <button
                            onClick={() => {
                              setTargetCourseID(item._id);
                            }}
                            className="btn btn-warning mx-3 d-inline-block"
                          >
                            <NavLink to="/page/edit_Lesson">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                alt=""
                                className="user__icon"
                              />
                            </NavLink>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">No Lesson found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
