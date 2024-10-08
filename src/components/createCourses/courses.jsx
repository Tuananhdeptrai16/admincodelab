import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./courses.scss";
import { Pagination } from "antd";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";
import { ToastSuccess } from "../toast/toastsuccess";
const CourseCreation = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [getCoursesId, setGetCoursesId] = useState("");
  const { setAction, setTargetCourseID } = useContext(StoreContext);
  const [toastSuccess, setToastSuccess] = useState(false);
  const handlePageChange = async (page) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses?limit=5&page=${page}`
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
      handlePageChange(); // Cập nhật lại danh sách sau khi xóa
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
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    const newCheckedItems = {};
    listTutorials.data.forEach((item) => {
      newCheckedItems[item._id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const updatedItems = {
        ...prev,
        [id]: !prev[id],
      };
      return updatedItems;
    });
  };
  useEffect(() => {
    handlePageChange(1);
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
        <div className="courses__separate"></div>
        <div className="user__search">
          <input
            type="text"
            name=""
            placeholder="Tìm kiếm khóa học..."
            id=""
            className="courses__search--input"
          />
          <button className="courses__search--btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/search.svg`}
              className="courses__adding--icon"
              alt=""
            />
          </button>
        </div>
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
                  <th className="courses__border--left">
                    <div className="checkbox-wrapper-43">
                      <input
                        onChange={handleCheckAllChange}
                        checked={checkAll}
                        type="checkbox"
                        id="checkall"
                      />
                      <label htmlFor="checkall" className="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                    </div>
                  </th>
                  <th>Khóa học</th>
                  <th>Người tạo</th>
                  <th>Ngày tạo</th>
                  <th>Ngày sửa</th>
                  <th>Danh mục</th>
                  <th className="courses__border--right">Hành động </th>
                </tr>
              </thead>
              <tbody>
                {listTutorials.data.length > 0 ? (
                  listTutorials.data.map((item, index) => {
                    return (
                      <tr key={`${index}-tutorials`}>
                        <td>
                          <div className="checkbox-wrapper-43">
                            <input
                              checked={!!checkedItems[item._id]}
                              onChange={() => handleCheckboxChange(item._id)}
                              type="checkbox"
                              id={`input_${item._id}`}
                            />
                            <label
                              htmlFor={`input_${item._id}`}
                              className="check"
                            >
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 18 18"
                              >
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="courses__avatar">
                            <img
                              src={
                                item.background
                                  ? `${item.background}`
                                  : `${process.env.PUBLIC_URL}/images/avatarLesson.jpg`
                              }
                              alt=""
                              className="courses__img"
                            />
                            <p className="courses__name">{item.title}</p>
                          </div>
                        </td>
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
                                className="courses__icon"
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
                    <td colSpan="7">No courses found</td>
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
                className="courses__icon  icon-svg"
              />
              Thêm Khóa Học
            </button>
          </NavLink>
        </div>
        <Pagination
          align="center"
          defaultCurrent={1}
          total={50}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CourseCreation;
