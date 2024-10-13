import React, { useState, useContext, useEffect } from "react";
import "./courses.scss";
import StoreContext from "../../context/context";
import axios from "axios";
import { ToastSuccess } from "../toast/toastsuccess";
import { Toast } from "../toast/toasterror";
import { NavLink } from "react-router-dom";
const CourseForm = () => {
  const { action, targetCourseID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  console.log(targetCourseID);
  const [courseData, setCourseData] = useState({
    type: "EMPTY_COURSES",
    title: "",
    instructor: {
      name: "",
      profileImage:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fheyyitsmyaa%2Fcapybara%2F&psig=AOvVaw1BQdT9qwKZeoWFyZska2zr&ust=1728909528778000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCD5Yawi4kDFQAAAAAdAAAAABAh",
    },
    description: "",
    duration: "",
    level: "beginner",
    category: "Web Development",
    price: {
      amount: 0,
      currency: "VND",
      discount: {
        percentage: 0,
      },
    },
    star: 0,
    courseImage: "",
  });

  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses`
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
        console.log("Updated listTutorials:", listTutorials);

        if (listTutorials.data) {
          const foundCourses = listTutorials.data.find(
            (courses) => courses._id === targetCourseID
          );
          console.log(foundCourses.courseImage);
          if (foundCourses) {
            setCourseData({
              id: targetCourseID,
              title: foundCourses.title,
              instructor: foundCourses.instructor,
              description: foundCourses.description,
              category: foundCourses.category,
              price: foundCourses.price,
              courseImage: foundCourses.courseImage,
              duration: foundCourses.duration,
              level: foundCourses.level,
              star: foundCourses.star,
            });
          }
          console.log(foundCourses.lessons);
        }
      } else {
        resetForm();
      }
    };
    renderUpdateUser();
  }, [action, targetCourseID, listTutorials]); // Bỏ listTutorials ra khỏi dependencies
  const handleInstructorChange = (e) => {
    const { value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      instructor: {
        ...prevData.instructor,
        name: value, // Luôn cập nhật name
      },
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      price: {
        ...prevData.price,
        amount: value, // Luôn cập nhật amount
      },
    }));
  };

  const resetForm = () => {
    setCourseData({
      type: "EMPTY_COURSES",
      title: "",
      instructor: {
        name: "",
        profileImage:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fheyyitsmyaa%2Fcapybara%2F&psig=AOvVaw1BQdT9qwKZeoWFyZska2zr&ust=1728909528778000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCD5Yawi4kDFQAAAAAdAAAAABAh",
      },
      description: "",
      duration: "",
      level: "beginner",
      category: "Web Development",
      price: {
        amount: 0,
        currency: "VND",
        discount: {
          percentage: 0,
        },
      },
      star: 0,
      courseImage: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(courseData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/courses`;
      if (action === "C") {
        await axios.post(apiUrl, { ...courseData });
      } else {
        await axios.put(apiUrl, {
          ...courseData,
        });
      }
      resetForm();
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          window.location.href = "/course";
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setToastError(true);
    }
  };
  return (
    <>
      {toastSuccess === true ? (
        <ToastSuccess></ToastSuccess>
      ) : toastError === true ? (
        <Toast></Toast>
      ) : (
        ""
      )}
      <div className="course-creation">
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
            <NavLink to="/course" className="breadcrumb__item">
              <p className="breadcrumb__name">Khóa học</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">DashBoard</p>
            </NavLink>
          </div>
        </div>
        <h1 className="course-creation__title">Thông tin khóa học</h1>
        <div className="courses__separate"></div>
        <form className="course-creation__form" onSubmit={handleSubmit}>
          <div className="row row-cols-2">
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="title" className="course-creation__label">
                  Tiêu đề khóa học
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="course-creation__input"
                  placeholder="Nhập tiêu đề khóa học"
                  value={courseData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="title" className="course-creation__label">
                  Người hướng dẫn
                </label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  className="course-creation__input"
                  placeholder="Người hướng dẫn"
                  value={courseData.instructor.name}
                  onChange={handleInstructorChange}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-3">
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="price" className="course-creation__label">
                  Giá khóa học
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="course-creation__input"
                  placeholder="Nhập giá khóa học"
                  min="0"
                  value={courseData.price.amount}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="duration" className="course-creation__label">
                  Thời gian (phút)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  className="course-creation__input"
                  placeholder="Nhập thời gian"
                  min="0"
                  value={courseData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="level" className="course-creation__label">
                  Cấp độ
                </label>
                <select
                  id="level"
                  name="level"
                  className="course-creation__select"
                  value={courseData.level}
                  onChange={handleChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="category" className="course-creation__label">
                  Danh mục
                </label>
                <select
                  id="category"
                  name="category"
                  className="course-creation__select"
                  value={courseData.category}
                  onChange={handleChange}
                >
                  <option value="web-development">Web Development</option>
                  <option value="mobile-development">Mobile Development</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>
            </div>
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="courseImage" className="course-creation__label">
                  URL ảnh nền
                </label>
                <input
                  type="text"
                  id="courseImage"
                  name="courseImage"
                  className="course-creation__input"
                  placeholder="Nhập link hình ảnh"
                  value={courseData.courseImage}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="star" className="course-creation__label">
                  Tổng sao
                </label>
                <input
                  type="number"
                  id="star"
                  name="star"
                  className="course-creation__input"
                  placeholder="Nhập số sao thưởng cho khóa học"
                  min="0"
                  value={courseData.star}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col gx-2">
              <div className="course-creation__field">
                <label htmlFor="description" className="course-creation__label">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="course-creation__textarea"
                  placeholder="Nhập mô tả khóa học"
                  value={courseData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="course-creation__submit">
            <button
              type="submit"
              onClick={handleSubmit}
              className="course-creation__button course-creation__submit--btn"
            >
              {action === "C" ? "Tạo" : "Cập nhật"} khóa học
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseForm;
