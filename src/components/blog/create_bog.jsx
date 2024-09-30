import React, { useState, useContext, useEffect } from "react";
import "./blog.scss";
import StoreContext from "../../context/context";
import axios from "axios";

const BlogForm = () => {
  const { action, targetblogID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [blogData, setblogData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "beginner",
    blogItems: [
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

        console.log("Updated listTutorials:", listTutorials);

        if (listTutorials.data && listTutorials.errorCode === 0) {
          const foundblogs = listTutorials.data.find(
            (blogs) => blogs._id === targetblogID
          );
          if (foundblogs) {
            setblogData({
              title: foundblogs.title,
              description: foundblogs.description,
              owner: foundblogs.owner,
              duration: foundblogs.duration,
              level: foundblogs.level,
              blogItems: foundblogs.blogItems || [],
              rating: foundblogs.rating,
              studentsEnrolled: foundblogs.studentsEnrolled || 0,
            });
          }
        }
      } else {
        resetForm();
      }
    };
    renderUpdateUser();
  }, [action, targetblogID, listTutorials]); // Bỏ listTutorials ra khỏi dependencies

  const resetForm = () => {
    setblogData({
      title: "",
      description: "",
      duration: "",
      level: "beginner",
      blogItems: [
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
    setblogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddLesson = () => {
    setblogData((prevData) => ({
      ...prevData,
      blogItems: [
        ...prevData.blogItems,
        { title: "", content: [] }, // Đảm bảo rằng cấu trúc này đúng
      ],
    }));
  };
  const handleLessonTitleChange = (index, e) => {
    const { value } = e.target;
    setblogData((prevData) => {
      const updatedblogItems = [...prevData.blogItems]; // Thay đổi ở đây
      updatedblogItems[index].title = value;
      return {
        ...prevData,
        blogItems: updatedblogItems, // Thay đổi ở đây
      };
    });
  };

  const handleAddParagraph = (blogIndex) => {
    setblogData((prevData) => {
      const updatedblogItems = [...prevData.blogItems]; // Tạo bản sao của mảng blogItems
      // Kiểm tra xem blogIndex có hợp lệ không
      if (updatedblogItems[blogIndex]) {
        updatedblogItems[blogIndex].content.push({
          // Thêm đoạn văn mới vào nội dung của bài học
          text: "",
          imageUrl: "",
        });
      }
      return {
        ...prevData,
        blogItems: updatedblogItems, // Cập nhật lại mảng blogItems
      };
    });
  };

  const handleParagraphChange = (blogIndex, paragraphIndex, e) => {
    const { name, value } = e.target;
    setblogData((prevData) => {
      const updatedblogItems = [...prevData.blogItems];
      // Đảm bảo cập nhật đúng thuộc tính trong content
      if (
        updatedblogItems[blogIndex] &&
        updatedblogItems[blogIndex].content[paragraphIndex]
      ) {
        updatedblogItems[blogIndex].content[paragraphIndex][name] = value; // Cập nhật đúng thuộc tính
      }
      return {
        ...prevData,
        blogItems: updatedblogItems,
      };
    });
  };
  console.log(">>>targetblogID", targetblogID);
  console.log(">>>>blogs data", JSON.stringify(blogData));
  console.log(`${process.env.REACT_APP_API_BACKEND_URL}/blogs`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/blogs`;
      if (action === "C") {
        await axios.post(apiUrl, { ...blogData });
      } else {
        await axios.put(`${apiUrl}/${targetblogID}`, {
          ...blogData,
        });
      }
      resetForm();
      window.location.href = "/page"; // Chuyển hướng sau khi gửi
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="blog-creation">
      <h1 className="blog-creation__title">
        {action === "C" ? "Tạo" : "Sửa"} Blog Mới
      </h1>
      <form className="blog-creation__form" onSubmit={handleSubmit}>
        <div className="blog-creation__field">
          <label htmlFor="title" className="blog-creation__label">
            Tiêu đề blog
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="blog-creation__input"
            placeholder="Nhập tiêu đề blog"
            value={blogData.title}
            onChange={handleChange}
          />
        </div>
        <div className="blog-creation__field">
          <label htmlFor="description" className="blog-creation__label">
            Mô tả
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
        <div className="blog-creation__field">
          <label htmlFor="owner" className="blog-creation__label">
            Tên tác giả
          </label>
          <input
            type="text"
            id="owner"
            name="owner"
            className="blog-creation__input"
            placeholder="Tên tác giả"
            min="0"
            value={blogData.owner}
            onChange={handleChange}
          />
        </div>
        <div className="blog-creation__field">
          <label htmlFor="duration" className="blog-creation__label">
            Thời gian (phút)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="blog-creation__input"
            placeholder="Nhập thời gian"
            min="0"
            value={blogData.duration}
            onChange={handleChange}
          />
        </div>
        <div className="blog-creation__field">
          <label htmlFor="level" className="blog-creation__label">
            Cấp độ
          </label>
          <select
            id="level"
            name="level"
            className="blog-creation__select"
            value={blogData.level}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <h2 className="blog-creation__subtitle">Thêm Nội Dung</h2>
        <div className="blog-creation__blogItems">
          {blogData.blogItems.map((lesson, blogIndex) => (
            <div key={blogIndex} className="blog-creation__lesson">
              <h3 className="blog-creation__lesson-title">
                Nội dung 1 {blogIndex + 1}
              </h3>
              <div className="blog-creation__field">
                <label
                  htmlFor={`lesson-title-${blogIndex}`}
                  className="blog-creation__label"
                >
                  Tiêu đề nội dung
                </label>
                <input
                  type="text"
                  id={`lesson-title-${blogIndex}`}
                  className="blog-creation__input"
                  placeholder="Nhập tiêu đề bài học"
                  value={lesson.title}
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
                    <div className="blog-creation__field">
                      <label
                        htmlFor={`lesson-image-${blogIndex}-${paragraphIndex}`}
                        className="blog-creation__label"
                      >
                        URL hình ảnh {paragraphIndex + 1}
                      </label>
                      <input
                        type="text"
                        id={`lesson-image-${blogIndex}-${paragraphIndex}`}
                        className="blog-creation__input"
                        placeholder="Nhập URL hình ảnh"
                        name="imageUrl"
                        value={paragraph.imageUrl}
                        onChange={(e) =>
                          handleParagraphChange(blogIndex, paragraphIndex, e)
                        }
                      />
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
          <button
            type="button"
            className="blog-creation__button"
            onClick={handleAddLesson}
          >
            Thêm bài học
          </button>
        </div>

        <div className="blog-creation__submit">
          <button
            type="submit"
            className="  blog-creation__button blog-creation__submit--btn"
          >
            {action === "C" ? "Tạo" : "Cập nhật"} blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
