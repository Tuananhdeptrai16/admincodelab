import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./blog.scss";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";
import { ToastSuccess } from "../toast/toastsuccess";
const CourseCreation = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [getBlogId, setGetBlogId] = useState("");
  const { setAction, setTargetBlogID } = useContext(StoreContext);
  const [toastSuccess, setToastSuccess] = useState(false);
  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/blog`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };
  const deleteBlog = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/blog`,
        { data: { _id: getBlogId } } // Truyền ID khóa học trong body
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

  useEffect(() => {
    getListTutorials();
  }, []);
  if (!listTutorials || !listTutorials.data) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      {toastSuccess === true ? <ToastSuccess></ToastSuccess> : ""}
      <div className="blog">
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
              <p className="breadcrumb__name  breadcrumb__active">Blog</p>
            </NavLink>
          </div>
        </div>
        <h1 className="blog__heading">Quản lý Blog</h1>
        <div className="blog__seperate"></div>
        {showModel && (
          <>
            <div className="blog__delete">
              <h1 className="blog__delete--notification">
                Bạn muốn xóa Blog ?
              </h1>
              <div className="blog__delete--action">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className=" blog__delete--btn blog__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => deleteBlog()}
                  className="blog__delete--btn blog__delete--sure"
                >
                  Xóa
                </button>
              </div>
            </div>
            <div
              onClick={() => setShowModel(!showModel)}
              className="blog__overlay"
            ></div>
          </>
        )}
        <div className="blog__list">
          <div className="blog__item">
            <table>
              <thead>
                <tr>
                  <th className="blog__id">Mã blog</th>
                  <th>Tiêu đề</th>
                  <th>Người tạo</th>
                  <th>Ngày tạo</th>
                  <th>Ngày sửa</th>
                  <th>Hành động </th>
                </tr>
              </thead>
              <tbody>
                {listTutorials.data.length > 0 ? (
                  listTutorials.data.map((item, index) => {
                    return (
                      <tr key={`${index}-tutorials`}>
                        <td>{item._id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                        <td>
                          <NavLink to="/page/create_blog">
                            <button
                              onClick={() => {
                                setAction("U");
                                setTargetBlogID(item._id);
                              }}
                              className="btn btn-warning mx-3 d-inline-block"
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                alt=""
                                className="user__icon"
                              />
                            </button>
                          </NavLink>
                          <button
                            onClick={() => {
                              setGetBlogId(item._id);
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
                    <td colSpan="5">No blog found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blog__create">
          <NavLink to="/page/create_blog" className={"blog__create--link"}>
            <button
              onClick={() => setAction("C")}
              className="blog__create--btn"
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
                alt=""
                className="user__icon"
              />
              Thêm Blog
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CourseCreation;
