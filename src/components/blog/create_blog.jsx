import React, { useState, useContext, useEffect } from "react";
import "./blog.scss";
import StoreContext from "../../context/context";
import axios from "axios";
import { NavLink } from "react-router-dom";
const BlogForm = () => {
  const { action, targetBlogID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState("");
  const [toastError, setToastError] = useState(false);
  const [blogData, setBlogData] = useState({
    type: "EMPTY_BLOG",
    title: "",
    author: "",
    urlImage: "",
    description: "",
    duration: "",
    blogItems: [
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
        if (listTutorials.data) {
          const foundBlog = listTutorials.data.find(
            (blog) => blog._id === targetBlogID
          );
          if (foundBlog) {
            console.log(foundBlog.blogItems);
            setBlogData({
              id: targetBlogID,
              title: foundBlog.title,
              author: foundBlog.author,
              urlImage: foundBlog.urlImage,
              description: foundBlog.description,
              duration: foundBlog.duration,
              blogItems: foundBlog.blogItems || [],
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
      type: "EMPTY_BLOG",
      title: "",
      author: "",
      urlImage: "",
      description: "",
      duration: "",
      blogItems: [
        {
          title: "",
          content: [],
        },
      ],
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
      const updatedBlog = [...prevData.blogItems]; // Thay đổi ở đây
      updatedBlog[index].title = value;
      return {
        ...prevData,
        blogItems: updatedBlog, // Thay đổi ở đây
      };
    });
  };

  const handleAddParagraph = (blogIndex) => {
    setBlogData((prevData) => {
      const updatedBlog = [...prevData.blogItems]; // Tạo bản sao của mảng lessons
      // Kiểm tra xem blogIndex có hợp lệ không
      if (updatedBlog[blogIndex]) {
        updatedBlog[blogIndex].content.push({
          // Thêm đoạn văn mới vào nội dung của bài học
          text: "",
          imageUrl: "",
          descImage: "",
        });
      }
      return {
        ...prevData,
        blogItems: updatedBlog, // Cập nhật lại mảng lessons
      };
    });
  };
  const handleAddSection = () => {
    setBlogData((prevData) => {
      const updatedBlog = [...prevData.blogItems]; // Tạo bản sao của mảng blogItems
      updatedBlog.push({
        // Thêm phần mới
        title: "", // Khởi tạo title trống cho phần mới
        content: [], // Khởi tạo mảng content trống cho phần mới
      });
      return {
        ...prevData,
        blogItems: updatedBlog, // Cập nhật lại mảng blogItems
      };
    });
  };

  const handleParagraphChange = (blogIndex, paragraphIndex, e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => {
      const updatedBlog = [...prevData.blogItems];
      // Đảm bảo cập nhật đúng thuộc tính trong content
      if (
        updatedBlog[blogIndex] &&
        updatedBlog[blogIndex].content[paragraphIndex]
      ) {
        updatedBlog[blogIndex].content[paragraphIndex][name] = value; // Cập nhật đúng thuộc tính
      }
      return {
        ...prevData,
        blogItems: updatedBlog,
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
        await axios.put(apiUrl, {
          ...blogData,
        });
      }
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
        <div className="blog__separate"></div>
        <form className="blog-creation__form" onSubmit={handleSubmit}>
          <div className="row row-cols-2">
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="title" className="control__label">
                  Tiêu đề blog
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form__control"
                  placeholder="Nhập tiêu đề khóa học"
                  value={blogData.title || ""}
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
                  value={blogData.author || ""}
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
                  value={blogData.duration || ""}
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
                  value={blogData.urlImage || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col g-2">
              <div className="form__group">
                <label htmlFor="description" className="control__label">
                  Mô tả blog
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form__control"
                  placeholder="Nhập mô tả blog"
                  value={blogData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <h2 className="blog-creation__subtitle">Chi tiết</h2>
          <div className="blog__separate"></div>

          <div className="blog-creation__lessons">
            {blogData.blogItems.map((blogItem, blogIndex) => (
              <div key={blogIndex} className="blog-creation__lesson">
                <h3 className="blog-creation__lesson-title">Tiêu đề</h3>
                <div className="form__group ">
                  <label
                    htmlFor={`lesson-title-${blogIndex}`}
                    className="control__label"
                  >
                    Tiêu đề blog
                  </label>
                  <input
                    type="text"
                    id={`lesson-title-${blogIndex}`}
                    className="form__control"
                    placeholder="Nhập tiêu đề blog"
                    value={blogItem.title || ""}
                    onChange={(e) => handleLessonTitleChange(blogIndex, e)}
                  />
                </div>
                {Array.isArray(blogItem.content) &&
                  blogItem.content.map((paragraph, paragraphIndex) => (
                    <div
                      key={paragraphIndex}
                      className="blog-creation__paragraph"
                    >
                      <div className="form__group ">
                        <label
                          htmlFor={`lesson-text-${blogIndex}-${paragraphIndex}`}
                          className="control__label"
                        >
                          Nội dung đoạn văn {paragraphIndex + 1}
                        </label>
                        <textarea
                          id={`lesson-text-${blogIndex}-${paragraphIndex}`}
                          className="form__control"
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
                          <div className="form__group ">
                            <label
                              htmlFor={`lesson-image-${blogIndex}-${paragraphIndex}`}
                              className="control__label"
                            >
                              Hình {paragraphIndex + 1}
                            </label>
                            <input
                              type="text"
                              id={`lesson-image-${blogIndex}-${paragraphIndex}`}
                              className="form__control"
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
                          <div className="form__group ">
                            <label
                              htmlFor={`desc-image-${blogIndex}-${paragraphIndex}`}
                              className="control__label"
                            >
                              Chú thích hình ảnh
                            </label>
                            <input
                              type="text"
                              id={`desc-image-${blogIndex}-${paragraphIndex}`}
                              className="form__control"
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
              type="button"
              className="blog-creation__button"
              onClick={() => handleAddSection()}
            >
              Thêm phần mới
            </button>
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
