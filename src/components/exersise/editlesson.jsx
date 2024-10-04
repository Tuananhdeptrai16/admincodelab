import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./lesson.scss";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";
import { ToastSuccess } from "../toast/toastsuccess";
export const EditLesson = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [getLessonId, setGetLessonId] = useState("");

  const { targetCourseID, setTargetLessonID } = useContext(StoreContext);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [listLesson, setListLesson] = useState("");
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

  const deleteLesson = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/Lesson`,
        { data: { _id: getLessonId } } // Truyền ID khóa học trong body
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
  const findLessonByCourseId = () => {
    const listLessonByCourseId =
      Array.isArray(listTutorials.data) &&
      listTutorials.data.find((item) => item._id === targetCourseID);
    setListLesson(listLessonByCourseId);
  };

  useEffect(() => {
    getListTutorials();
  }, []);

  useEffect(() => {
    if (listTutorials && listTutorials.data) {
      findLessonByCourseId(); // Gọi tìm kiếm mỗi khi listTutorials thay đổi
    }
  }, [listTutorials, targetCourseID]); // Thêm phụ thuộc vào mảng

  if (!listTutorials || !listTutorials.data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {toastSuccess === true ? <ToastSuccess></ToastSuccess> : ""}
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
              <p className="breadcrumb__name  ">Bài tập</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">
                {listLesson.title}
              </p>
            </NavLink>
          </div>
        </div>
        <h1 className="Lesson__heading">Quản lý bài tập</h1>
        <p className="Lesson__desc">
          Hãy chọn một bài học rồi thêm bải tập mới vào đó nhé ! ❤️👌
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
        {showModel && (
          <>
            <div className="Lesson__delete">
              <h1 className="Lesson__delete--notification">
                Bạn muốn xóa khóa học ?
              </h1>
              <div className="Lesson__delete--action">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className=" Lesson__delete--btn Lesson__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => deleteLesson()}
                  className="Lesson__delete--btn Lesson__delete--sure"
                >
                  Xóa
                </button>
              </div>
            </div>
            <div
              onClick={() => setShowModel(!showModel)}
              className="Lesson__overlay"
            ></div>
          </>
        )}

        <div className="Lesson__list">
          <div className="Lesson__item">
            <table>
              <thead>
                <tr>
                  <th className="Lesson__id Lesson__border--left">
                    List bài học
                  </th>
                  <th>Khóa học</th>
                  <th>Số câu hỏi</th>
                  <th>Danh mục</th>
                  <th className="Lesson__border--right">Thêm bài tập</th>
                </tr>
              </thead>
              <tbody>
                {listLesson && listLesson.lessons.length > 0
                  ? listLesson.lessons.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.title}</td>
                          <td>{listLesson.title}</td>
                          <td>01 câu hỏi</td>
                          <td>{listLesson.category}</td>
                          <td className="Lesson__action">
                            <button
                              onClick={() => {
                                setTargetLessonID(item._id);
                              }}
                              className="btn btn-warning mx-3 d-inline-block"
                            >
                              <NavLink to={`/page/new_exercise/${item._id}`}>
                                <img
                                  src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                  alt=""
                                  className="user__icon"
                                />
                              </NavLink>
                            </button>
                            <button
                              onClick={() => {
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
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
