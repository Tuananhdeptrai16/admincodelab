import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../../context/context";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const LessonForm = () => {
  const { action, targetLessonID, targetCourseID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState("");
  const [toastError, setToastError] = useState(false);
  const [lessonData, setLessonData] = useState({
    type: "EMPTY_LESSON",
    courseId: targetCourseID,
    title: "",
    description: "",
    duration: "",
    author: "",
    urlImage: "",
    content: " ",
    comments: [],
    rating: 0,
    studentsEnrolled: 0,
  });
  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/lesson`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    const renderUpdateUser = async () => {
      if (action === "U") {
        if (listTutorials.length === 0) {
          await getListTutorials();
        }
        if (listTutorials.data) {
          const foundLesson = listTutorials.data.find(
            (lesson) => lesson._id === targetLessonID
          );
          if (foundLesson) {
            setLessonData({
              lessonId: foundLesson._id,
              type: "EMPTY_LESSON",
              title: foundLesson.title,
              description: foundLesson.description,
              duration: foundLesson.duration,
              author: foundLesson.author,
              urlImage: foundLesson.urlImage,
              content: foundLesson.content,
              comments: [],
              rating: 0,
              studentsEnrolled: 0,
            });
          }
        }
      } else {
        const resetForm = () => {
          setLessonData({
            courseId: targetCourseID,
            type: "EMPTY_LESSON",
            title: "",
            description: "",
            duration: "",
            author: "",
            urlImage: "",
            content: "",
            comments: [],
            rating: 0,
            studentsEnrolled: 0,
          });
        };
        resetForm();
      }
    };
    renderUpdateUser();
  }, [action, targetLessonID, listTutorials, targetCourseID]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleContentChange = (value) => {
    setLessonData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };
  console.log("lessonData", lessonData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/lesson`;
      if (action === "C") {
        await axios.post(apiUrl, { ...lessonData });
      } else {
        await axios.put(apiUrl, {
          ...lessonData,
        });
      }
      const resetForm = () => {
        setLessonData({
          courseId: targetCourseID,
          type: "EMPTY_LESSON",
          title: "",
          description: "",
          duration: "",
          author: "",
          urlImage: "",
          content: "",
          comments: [],
          rating: 0,
          studentsEnrolled: 0,
        });
      };
      resetForm();
      setToastSuccess(true);
      setTimeout(() => {
        setToastSuccess(false);
      }, 1000); // Đợi 1 giây sau khi toast thành công
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Có lỗi xảy ra";
        setError(errorMessage);
      } else {
        setError("Có lỗi không xác định");
      }
      setToastError(true); // Hiển thị thông báo lỗi

      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setToastError(false); // Ẩn thông báo sau 3 giây
      }, 3000);
    }
  };

  return (
    <>
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
      <div className="lesson-creation">
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
              <p className="breadcrumb__name">Quản lý bài học</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">
                Sửa bài học
              </p>
            </NavLink>
          </div>
        </div>
        <h1 className="lesson-creation__title">Thông tin lesson</h1>
        <div className="lesson__separate"></div>
        <form className="lesson-creation__form" onSubmit={handleSubmit}>
          <div className="row row-cols-2">
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="title" className="control__label">
                  Tiêu đề lesson
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form__control"
                  placeholder="Nhập tiêu đề khóa học"
                  value={lessonData.title || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="title" className="control__label">
                  Tác giả
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="form__control"
                  placeholder="Nhập tên tác giả"
                  value={lessonData.author || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-2">
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="duration" className="control__label">
                  Thời gian đọc (phút)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  className="form__control"
                  placeholder="Nhập thời gian"
                  min="0"
                  value={lessonData.duration || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="urlImage" className="control__label">
                  URL ảnh nền
                </label>
                <input
                  type="text"
                  id="urlImage"
                  name="urlImage"
                  className="form__control"
                  placeholder="Nhập link hình ảnh"
                  value={lessonData.urlImage || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col g-2">
              <div className="form__group">
                <label htmlFor="description" className="control__label">
                  Mô tả lesson
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form__control"
                  placeholder="Nhập mô tả lesson"
                  value={lessonData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <h2 className="lesson-creation__subtitle">Chi tiết</h2>
          <div className="lesson__separate"></div>

          <ReactQuill
            name="content"
            value={lessonData.content}
            onChange={handleContentChange}
          />

          <div className="lesson-creation__submit">
            <button
              type="submit"
              className="  lesson-creation__button lesson-creation__submit--btn"
            >
              {action === "C" ? "Tạo" : "Cập nhật"} lesson
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LessonForm;
