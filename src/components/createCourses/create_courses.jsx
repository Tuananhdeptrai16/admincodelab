import React, { useState, useContext, useEffect } from "react";
import "./courses.scss";
import StoreContext from "../../context/context";
import axios from "axios";
import { NavLink } from "react-router-dom";
const CourseForm = () => {
  const { action, targetCourseID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState("");
  const [toastError, setToastError] = useState(false);
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
    category: "",
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
      category: "",
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
      }, 1000);
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
      <div className="course-creation">
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
            <NavLink to="/admincodelab/course" className="breadcrumb__item">
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
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="title" className="control__label">
                  Tiêu đề khóa học
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form__control"
                  placeholder="Nhập tiêu đề khóa học"
                  value={courseData.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="title" className="control__label">
                  Người hướng dẫn
                </label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  className="form__control"
                  placeholder="Người hướng dẫn"
                  value={courseData.instructor.name}
                  onChange={handleInstructorChange}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-3">
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="price" className="control__label">
                  Giá khóa học
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form__control"
                  placeholder="Nhập giá khóa học"
                  min="0"
                  value={courseData.price.amount}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="duration" className="control__label">
                  Thời gian (phút)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  className="form__control"
                  placeholder="Nhập thời gian"
                  min="0"
                  required
                  value={courseData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="level" className="control__label">
                  Cấp độ
                </label>
                <select
                  id="level"
                  name="level"
                  className="form__control"
                  value={courseData.level}
                  onChange={handleChange}
                >
                  <option value="beginner">Cơ bản</option>
                  <option value="intermediate">Trung Cấp</option>
                  <option value="advanced">Nâng cao</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="category" className="control__label">
                  Danh mục
                </label>
                <select
                  id="category"
                  name="category"
                  className="form__control"
                  value={courseData.category}
                  onChange={handleChange}
                >
                  <option value="FrontEnd">FrontEnd</option>
                  <option value="BackEnd">BackEnd</option>
                </select>
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="courseImage" className="control__label">
                  URL ảnh nền
                </label>
                <input
                  type="text"
                  id="courseImage"
                  name="courseImage"
                  className="form__control"
                  placeholder="Nhập link hình ảnh"
                  required
                  value={courseData.courseImage}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="star" className="control__label">
                  Tổng sao
                </label>
                <input
                  type="number"
                  id="star"
                  name="star"
                  className="form__control"
                  placeholder="Nhập số sao thưởng cho khóa học"
                  required
                  min="0"
                  value={courseData.star}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="description" className="control__label">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form__control"
                  placeholder="Nhập mô tả khóa học"
                  value={courseData.description}
                  required
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
