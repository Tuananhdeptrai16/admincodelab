import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./courses.scss";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";
import { ToastSuccess } from "../toast/toastsuccess";
const CourseCreation = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [getCoursesId, setGetCoursesId] = useState("");
  const { setAction, setTargetCourseID } = useContext(StoreContext);
  const [toastSuccess, setToastSuccess] = useState(false);
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
  const deleteCourses = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses`,
        { data: { _id: getCoursesId } } // Truyền ID khóa học trong body
      );
      getListTutorials(); // Cập nhật lại danh sách sau khi xóa
      setShowModel(false);
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          setToastSuccess(false);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error("Error deleting course: ", error); // Bắt lỗi nếu xảy ra
    }
  };

  useEffect(() => {
    getListTutorials();
  }, []);
  if (!listTutorials || !listTutorials.data) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      {toastSuccess === true ? <ToastSuccess></ToastSuccess> : ""}
      <div className="courses">
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
              <p className="breadcrumb__name  breadcrumb__active">Khóa học</p>
            </NavLink>
          </div>
        </div>
        <h1 className="courses__heading">Quản lý khóa học</h1>
        <div className="courses__seperate"></div>
        {showModel && (
          <>
            <div className="courses__delete">
              <h1 className="courses__delete--notification">
                Bạn muốn xóa khóa học ?
              </h1>
              <div className="courses__delete--action">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className=" courses__delete--btn courses__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => deleteCourses()}
                  className="courses__delete--btn courses__delete--sure"
                >
                  Xóa
                </button>
              </div>
            </div>
            <div
              onClick={() => setShowModel(!showModel)}
              className="courses__overlay"
            ></div>
          </>
        )}
        <div className="courses__list">
          <div className="courses__item">
            <table>
              <thead>
                <tr>
                  <th className="courses__id">Mã khóa học</th>
                  <th>Khóa học</th>
                  <th>Người tạo</th>
                  <th>Ngày tạo</th>
                  <th>Ngày sửa</th>
                  <th>Danh mục</th>
                  <th>Hành động </th>
                </tr>
              </thead>
              <tbody>
                {listTutorials.data.length > 0 ? (
                  listTutorials.data.map((item, index) => {
                    return (
                      <tr key={`${index}-tutorials`}>
                        <td>{item._id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                        <td>{item.category}</td>
                        <td className="courses__action">
                          <button
                            onClick={() => {
                              setAction("U");
                              setTargetCourseID(item._id);
                            }}
                            className="btn btn-warning mx-3 d-inline-block"
                          >
                            <NavLink to="/page/create_courses">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                alt=""
                                className="user__icon"
                              />
                            </NavLink>
                          </button>
                          <button
                            onClick={() => {
                              setGetCoursesId(item._id);
                              setShowModel(!showModel);
                            }}
                            className="btn btn-danger"
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon/trash.svg`}
                              alt=""
                              className="user__icon"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">No courses found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="courses__create">
          <NavLink
            to="/page/create_courses"
            className={"courses__create--link"}
          >
            <button
              onClick={() => setAction("C")}
              className="courses__create--btn"
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
                alt=""
                className="user__icon"
              />
              Thêm Khóa Học
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CourseCreation;
