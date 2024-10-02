import React, { useState, useContext, useEffect } from "react";
import "./blog.scss";
import StoreContext from "../../context/context";
import axios from "axios";
import { ToastSuccess } from "../toast/toastsuccess";
import { Toast } from "../toast/toasterror";
import { NavLink } from "react-router-dom";
const BlogForm = () => {
  const { action, targetBlogID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    urlImage: "",
    description: "",
    duration: "",
    lessons: [
      {
        title: "",
        content: [],
      },
    ],
    rating: 0,
    studentsEnrolled: 0,
  });

  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/blog`
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
        console.log(">>listTutorials data", listTutorials.data);
        if (listTutorials.data && listTutorials.errorCode === 0) {
          const foundBlog = listTutorials.data.find(
            (blog) => blog._id === targetBlogID
          );
          if (foundBlog) {
            setBlogData({
              title: foundBlog.title,
              author: foundBlog.author,
              urlImage: foundBlog.urlImage,
              description: foundBlog.description,
              duration: foundBlog.duration,
              lessons: foundBlog.blogItems || [],
              rating: foundBlog.rating,
              studentsEnrolled: foundBlog.studentsEnrolled || 0,
            });
          }
        }
      } else {
        resetForm();
      }
    };
    renderUpdateUser();
  }, [action, targetBlogID, listTutorials]); // Bỏ listTutorials ra khỏi dependencies
  const resetForm = () => {
    setBlogData({
      title: "",
      author: "",
      urlImage: "",
      description: "",
      duration: "",
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
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLessonTitleChange = (index, e) => {
    const { value } = e.target;
    setBlogData((prevData) => {
      const updatedLessons = [...prevData.lessons]; // Thay đổi ở đây
      updatedLessons[index].title = value;
      return {
        ...prevData,
        lessons: updatedLessons, // Thay đổi ở đây
      };
    });
  };

  const handleAddParagraph = (blogIndex) => {
    setBlogData((prevData) => {
      const updatedLessons = [...prevData.lessons]; // Tạo bản sao của mảng lessons
      // Kiểm tra xem blogIndex có hợp lệ không
      if (updatedLessons[blogIndex]) {
        updatedLessons[blogIndex].content.push({
          // Thêm đoạn văn mới vào nội dung của bài học
          text: "",
          imageUrl: "",
          descImage: "",
        });
      }
      return {
        ...prevData,
        lessons: updatedLessons, // Cập nhật lại mảng lessons
      };
    });
  };

  const handleParagraphChange = (blogIndex, paragraphIndex, e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => {
      const updatedLessons = [...prevData.lessons];
      // Đảm bảo cập nhật đúng thuộc tính trong content
      if (
        updatedLessons[blogIndex] &&
        updatedLessons[blogIndex].content[paragraphIndex]
      ) {
        updatedLessons[blogIndex].content[paragraphIndex][name] = value; // Cập nhật đúng thuộc tính
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
      const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/blog`;
      if (action === "C") {
        await axios.post(apiUrl, { ...blogData });
      } else {
        await axios.put(`${apiUrl}/${targetBlogID}`, {
          ...blogData,
        });
      }
      resetForm();
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          window.location.href = "/blog"; // Chuyển hướng sau khi toast thành công
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
      <div className="blog-creation">
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
            <NavLink to="/blog" className="breadcrumb__item">
              <p className="breadcrumb__name">Blog</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">
                Update Blog
              </p>
            </NavLink>
          </div>
        </div>
        <h1 className="blog-creation__title">Thông tin Blog</h1>
        <div className="blog__seperate"></div>
        <form className="blog-creation__form" onSubmit={handleSubmit}>
          <div className="row row-cols-2">
            <div className="col gx-2">
              <div className="blog-creation__field">
                <label htmlFor="title" className="blog-creation__label">
                  Tiêu đề blog
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="blog-creation__input"
                  placeholder="Nhập tiêu đề khóa học"
                  value={blogData.title || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col gx-2">
              <div className="blog-creation__field">
                <label htmlFor="title" className="blog-creation__label">
                  Tác giả
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="blog-creation__input"
                  placeholder="Nhập tên tác giả"
                  value={blogData.author || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-2">
            <div className="col gx-2">
              <div className="blog-creation__field">
                <label htmlFor="duration" className="blog-creation__label">
                  Thời gian đọc (phút)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  className="blog-creation__input"
                  placeholder="Nhập thời gian"
                  min="0"
                  value={blogData.duration || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col gx-2">
              <div className="blog-creation__field">
                <label htmlFor="urlImage" className="blog-creation__label">
                  URL ảnh nền
                </label>
                <input
                  type="text"
                  id="urlImage"
                  name="urlImage"
                  className="blog-creation__input"
                  placeholder="Nhập link hình ảnh"
                  value={blogData.urlImage || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col gx-2">
              <div className="blog-creation__field">
                <label htmlFor="description" className="blog-creation__label">
                  Mô tả blog
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="blog-creation__textarea"
                  placeholder="Nhập mô tả blog"
                  value={blogData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <h2 className="blog-creation__subtitle">Chi tiết</h2>
          <div className="blog__seperate"></div>

          <div className="blog-creation__lessons">
            {blogData.lessons.map((lesson, blogIndex) => (
              <div key={blogIndex} className="blog-creation__lesson">
                <h3 className="blog-creation__lesson-title">Tiêu đề</h3>
                <div className="blog-creation__field">
                  <label
                    htmlFor={`lesson-title-${blogIndex}`}
                    className="blog-creation__label"
                  >
                    Tiêu đề blog
                  </label>
                  <input
                    type="text"
                    id={`lesson-title-${blogIndex}`}
                    className="blog-creation__input"
                    placeholder="Nhập tiêu đề blog"
                    value={lesson.title || ""}
                    onChange={(e) => handleLessonTitleChange(blogIndex, e)}
                  />
                </div>
                {Array.isArray(lesson.content) &&
                  lesson.content.map((paragraph, paragraphIndex) => (
                    <div
                      key={paragraphIndex}
                      className="blog-creation__paragraph"
                    >
                      <div className="blog-creation__field">
                        <label
                          htmlFor={`lesson-text-${blogIndex}-${paragraphIndex}`}
                          className="blog-creation__label"
                        >
                          Nội dung đoạn văn {paragraphIndex + 1}
                        </label>
                        <textarea
                          id={`lesson-text-${blogIndex}-${paragraphIndex}`}
                          className="blog-creation__textarea"
                          placeholder="Nhập nội dung đoạn văn"
                          name="text"
                          value={paragraph.text}
                          onChange={(e) =>
                            handleParagraphChange(blogIndex, paragraphIndex, e)
                          }
                        />
                      </div>
                      <div className="row row-cols-2">
                        <div className="col gx-1 ">
                          <div className="blog-creation__field">
                            <label
                              htmlFor={`lesson-image-${blogIndex}-${paragraphIndex}`}
                              className="blog-creation__label"
                            >
                              Hình {paragraphIndex + 1}
                            </label>
                            <input
                              type="text"
                              id={`lesson-image-${blogIndex}-${paragraphIndex}`}
                              className="blog-creation__input"
                              placeholder="Nhập URL hình ảnh"
                              name="imageUrl"
                              value={paragraph.imageUrl || ""}
                              onChange={(e) =>
                                handleParagraphChange(
                                  blogIndex,
                                  paragraphIndex,
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col gx-1">
                          <div className="blog-creation__field">
                            <label
                              htmlFor={`desc-image-${blogIndex}-${paragraphIndex}`}
                              className="blog-creation__label"
                            >
                              Hình {paragraphIndex + 1}
                            </label>
                            <input
                              type="text"
                              id={`desc-image-${blogIndex}-${paragraphIndex}`}
                              className="blog-creation__input"
                              placeholder="Chú thích hình ảnh"
                              name="descImage"
                              value={paragraph.descImage || ""}
                              onChange={(e) =>
                                handleParagraphChange(
                                  blogIndex,
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
                  className="blog-creation__button"
                  onClick={() => handleAddParagraph(blogIndex)}
                >
                  Thêm nội dung
                </button>
              </div>
            ))}
          </div>

          <div className="blog-creation__submit">
            <button
              type="submit"
              className="  blog-creation__button blog-creation__submit--btn"
            >
              {action === "C" ? "Tạo" : "Cập nhật"} Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogForm;
