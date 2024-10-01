import React, { useState, useContext, useEffect } from "react";
import "./courses.scss";
import StoreContext from "../../context/context";
import axios from "axios";
import { ToastSuccess } from "../toast/toastsuccess";
import { Toast } from "../toast/toasterror";

const CourseForm = () => {
  const { action, targetCourseID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    author: "",
    description: "",
    category: "Web Development",
    price: "",
    duration: "",
    level: "beginner",
    lessons: [
      {
        title: "",
        content: [], // Đảm bảo content là một mảng
      },
    ],
    rating: 0,
    studentsEnrolled: 0,
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

        if (listTutorials.data && listTutorials.errorCode === 0) {
          const foundCourses = listTutorials.data.find(
            (courses) => courses._id === targetCourseID
          );
          if (foundCourses) {
            setCourseData({
              title: foundCourses.title,
              author: foundCourses.author,
              description: foundCourses.description,
              category: foundCourses.category,
              price: foundCourses.price,
              duration: foundCourses.duration,
              level: foundCourses.level,
              lessons: foundCourses.content || [],
              rating: foundCourses.rating,
              studentsEnrolled: foundCourses.studentsEnrolled || 0,
            });
          }
        }
      } else {
        resetForm();
      }
    };
    renderUpdateUser();
  }, [action, targetCourseID, listTutorials]); // Bỏ listTutorials ra khỏi dependencies

  const resetForm = () => {
    setCourseData({
      title: "",
      author: "",
      description: "",
      category: "Web Development",
      price: "",
      duration: "",
      level: "beginner",
      lessons: [
        {
          title: "",
          content: [],
        },
      ],
      rating: 0,
      studentsEnrolled: 0,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddLesson = () => {
    setCourseData((prevData) => ({
      ...prevData,
      lessons: [
        ...prevData.lessons,
        { title: "", content: [] }, // Đảm bảo rằng cấu trúc này đúng
      ],
    }));
  };
  const handleLessonTitleChange = (index, e) => {
    const { value } = e.target;
    setCourseData((prevData) => {
      const updatedLessons = [...prevData.lessons]; // Thay đổi ở đây
      updatedLessons[index].title = value;
      return {
        ...prevData,
        lessons: updatedLessons, // Thay đổi ở đây
      };
    });
  };

  const handleAddParagraph = (lessonIndex) => {
    setCourseData((prevData) => {
      const updatedLessons = [...prevData.lessons]; // Tạo bản sao của mảng lessons
      // Kiểm tra xem lessonIndex có hợp lệ không
      if (updatedLessons[lessonIndex]) {
        updatedLessons[lessonIndex].content.push({
          // Thêm đoạn văn mới vào nội dung của bài học
          text: "",
          imageUrl: "",
        });
      }
      return {
        ...prevData,
        lessons: updatedLessons, // Cập nhật lại mảng lessons
      };
    });
  };

  const handleParagraphChange = (lessonIndex, paragraphIndex, e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => {
      const updatedLessons = [...prevData.lessons];
      // Đảm bảo cập nhật đúng thuộc tính trong content
      if (
        updatedLessons[lessonIndex] &&
        updatedLessons[lessonIndex].content[paragraphIndex]
      ) {
        updatedLessons[lessonIndex].content[paragraphIndex][name] = value; // Cập nhật đúng thuộc tính
      }
      return {
        ...prevData,
        lessons: updatedLessons,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/courses`;
      if (action === "C") {
        await axios.post(apiUrl, { ...courseData });
      } else {
        await axios.put(`${apiUrl}/${targetCourseID}`, {
          ...courseData,
        });
      }
      resetForm();
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          window.location.href = "/page"; // Chuyển hướng sau khi toast thành công
        }, 1000); // Đợi 1 giây sau khi toast thành công
      }, 1000); // Thời gian hiển thị toast
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
        <h1 className="course-creation__title">Thông tin khóa học</h1>
        <div className="courses__seperate"></div>
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
                  id="author"
                  name="author"
                  className="course-creation__input"
                  placeholder="Nhập tiêu đề khóa học"
                  value={courseData.author}
                  onChange={handleChange}
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
                  value={courseData.price}
                  onChange={handleChange}
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
          <h2 className="course-creation__subtitle">Thông tin bài học</h2>
          <div className="courses__seperate"></div>

          <div className="course-creation__lessons">
            {courseData.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="course-creation__lesson">
                <h3 className="course-creation__lesson-title">
                  Bài Học {lessonIndex + 1}
                </h3>
                <div className="course-creation__field">
                  <label
                    htmlFor={`lesson-title-${lessonIndex}`}
                    className="course-creation__label"
                  >
                    Tiêu đề bài học
                  </label>
                  <input
                    type="text"
                    id={`lesson-title-${lessonIndex}`}
                    className="course-creation__input"
                    placeholder="Nhập tiêu đề bài học"
                    value={lesson.title}
                    onChange={(e) => handleLessonTitleChange(lessonIndex, e)}
                  />
                </div>
                {Array.isArray(lesson.content) &&
                  lesson.content.map((paragraph, paragraphIndex) => (
                    <div
                      key={paragraphIndex}
                      className="course-creation__paragraph"
                    >
                      <div className="row row-cols-2">
                        <div className="col gx-1">
                          <div className="course-creation__field">
                            <label
                              htmlFor={`lesson-text-${lessonIndex}-${paragraphIndex}`}
                              className="course-creation__label"
                            >
                              Nội dung đoạn văn {paragraphIndex + 1}
                            </label>
                            <textarea
                              id={`lesson-text-${lessonIndex}-${paragraphIndex}`}
                              className="course-creation__textarea"
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
                        </div>
                        <div className="col gx-1 ">
                          <div className="course-creation__field">
                            <label
                              htmlFor={`lesson-image-${lessonIndex}-${paragraphIndex}`}
                              className="course-creation__label"
                            >
                              Hình {paragraphIndex + 1}
                            </label>
                            <input
                              type="text"
                              id={`lesson-image-${lessonIndex}-${paragraphIndex}`}
                              className="course-creation__input"
                              placeholder="Nhập URL hình ảnh"
                              name="imageUrl"
                              value={paragraph.imageUrl}
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
                  className="course-creation__button"
                  onClick={() => handleAddParagraph(lessonIndex)}
                >
                  Thêm nội dung
                </button>
              </div>
            ))}
            <button
              type="button"
              className="course-creation__button"
              onClick={handleAddLesson}
            >
              Thêm bài học
            </button>
          </div>

          <div className="course-creation__submit">
            <button
              type="submit"
              className="  course-creation__button course-creation__submit--btn"
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
