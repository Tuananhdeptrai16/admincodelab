import React, { useState, useContext, useEffect } from "react";
import StoreContext from "../../context/context";
import axios from "axios";
import { NavLink } from "react-router-dom";
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
    contentLesson: [
      {
        title: "",
        content: [],
      },
    ],
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
              contentLesson: foundLesson.contentLesson,
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
            contentLesson: [
              {
                title: "",
                content: [],
              },
            ],
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

  const handleLessonTitleChange = (index, e) => {
    const { value } = e.target;
    setLessonData((prevData) => {
      const updatedLesson = [...prevData.contentLesson]; // Thay đổi ở đây
      updatedLesson[index].title = value;
      return {
        ...prevData,
        contentLesson: updatedLesson, // Thay đổi ở đây
      };
    });
  };

  const handleAddParagraph = (lessonIndex) => {
    setLessonData((prevData) => {
      const updatedLesson = [...prevData.contentLesson]; // Tạo bản sao của mảng lessons
      // Kiểm tra xem lessonIndex có hợp lệ không
      if (updatedLesson[lessonIndex]) {
        updatedLesson[lessonIndex].content.push({
          text: "",
          imageUrl: "",
          descImage: "",
        });
      }
      return {
        ...prevData,
        contentLesson: updatedLesson, // Cập nhật lại mảng lessons
      };
    });
  };
  const handleAddSection = () => {
    setLessonData((prevData) => {
      const updatedLesson = [...prevData.contentLesson]; // Tạo bản sao của mảng lessons
      updatedLesson.push({
        title: "", // Khởi tạo title trống cho phần mới
        content: [], // Khởi tạo mảng content trống cho phần mới
      });
      return {
        ...prevData,
        contentLesson: updatedLesson, // Cập nhật lại mảng contentLesson
      };
    });
  };

  const handleParagraphChange = (lessonIndex, paragraphIndex, e) => {
    const { name, value } = e.target;
    setLessonData((prevData) => {
      const updatedLesson = [...prevData.contentLesson];
      // Đảm bảo cập nhật đúng thuộc tính trong content
      if (
        updatedLesson[lessonIndex] &&
        updatedLesson[lessonIndex].content[paragraphIndex]
      ) {
        updatedLesson[lessonIndex].content[paragraphIndex][name] = value; // Cập nhật đúng thuộc tính
      }
      return {
        ...prevData,
        contentLesson: updatedLesson,
      };
    });
  };
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
          contentLesson: [
            {
              title: "",
              content: [],
            },
          ],
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
            <NavLink to="/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="/lesson" className="breadcrumb__item">
              <p className="breadcrumb__name">Quản lý bài học</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">Form</p>
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

          <div className="lesson-creation__lessons">
            {lessonData.contentLesson.map((lessonItem, lessonIndex) => (
              <div key={lessonIndex} className="lesson-creation__lesson">
                <h3 className="lesson-creation__lesson-title">Tiêu đề</h3>
                <div className="form__group ">
                  <label
                    htmlFor={`lesson-title-${lessonIndex}`}
                    className="control__label"
                  >
                    Tiêu đề lesson
                  </label>
                  <input
                    type="text"
                    id={`lesson-title-${lessonIndex}`}
                    className="form__control"
                    placeholder="Nhập tiêu đề lesson"
                    value={lessonItem.title || ""}
                    onChange={(e) => handleLessonTitleChange(lessonIndex, e)}
                  />
                </div>
                {Array.isArray(lessonItem.content) &&
                  lessonItem.content.map((paragraph, paragraphIndex) => (
                    <div
                      key={paragraphIndex}
                      className="lesson-creation__paragraph"
                    >
                      <div className="form__group ">
                        <label
                          htmlFor={`lesson-text-${lessonIndex}-${paragraphIndex}`}
                          className="control__label"
                        >
                          Nội dung đoạn văn {paragraphIndex + 1}
                        </label>
                        <textarea
                          id={`lesson-text-${lessonIndex}-${paragraphIndex}`}
                          className="form__control"
                          placeholder="Nhập nội dung đoạn văn"
                          name="text"
                          value={paragraph.text}
                          onChange={(e) =>
                            handleParagraphChange(
                              lessonIndex,
                              paragraphIndex,
                              e
                            )
                          }
                        />
                      </div>
                      <div className="row row-cols-2">
                        <div className="col gx-1 ">
                          <div className="form__group ">
                            <label
                              htmlFor={`lesson-image-${lessonIndex}-${paragraphIndex}`}
                              className="control__label"
                            >
                              Hình {paragraphIndex + 1}
                            </label>
                            <input
                              type="text"
                              id={`lesson-image-${lessonIndex}-${paragraphIndex}`}
                              className="form__control"
                              placeholder="Nhập URL hình ảnh"
                              name="imageUrl"
                              value={paragraph.imageUrl || ""}
                              onChange={(e) =>
                                handleParagraphChange(
                                  lessonIndex,
                                  paragraphIndex,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col gx-1">
                          <div className="form__group ">
                            <label
                              htmlFor={`desc-image-${lessonIndex}-${paragraphIndex}`}
                              className="control__label"
                            >
                              Chú thích hình ảnh
                            </label>
                            <input
                              type="text"
                              id={`desc-image-${lessonIndex}-${paragraphIndex}`}
                              className="form__control"
                              placeholder="Chú thích hình ảnh"
                              name="descImage"
                              value={paragraph.descImage || ""}
                              onChange={(e) =>
                                handleParagraphChange(
                                  lessonIndex,
                                  paragraphIndex,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="lesson-creation__button"
                  onClick={() => handleAddParagraph(lessonIndex)}
                >
                  Thêm nội dung
                </button>
              </div>
            ))}
          </div>

          <div className="lesson-creation__submit">
            <button
              type="button"
              className="lesson-creation__button"
              onClick={() => handleAddSection()}
            >
              Thêm phần mới
            </button>
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
