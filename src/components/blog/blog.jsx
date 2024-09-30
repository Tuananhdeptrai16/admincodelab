import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./blog.scss";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";
const Blog = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [getblogId, setGetblogId] = useState("");
  const { setAction, setTargetCourseID } = useContext(StoreContext);
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
  const deleteblog = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/blog`,
        { data: { _id: getblogId } } // Truyền ID blog trong body
      );
      getListTutorials(); // Cập nhật lại danh sách sau khi xóa
      setShowModel(false);
    } catch (error) {
      console.error("Error deleting course: ", error); // Bắt lỗi nếu xảy ra
    }
  };

  useEffect(() => {
    getListTutorials();
  }, []);
  if (!listTutorials || !listTutorials.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="blog">
      <h1 className="blog__heading">Blog đã tạo</h1>
      {showModel && (
        <>
          <div className="blog__delete">
            <h1 className="blog__delete--notification">Bạn muốn xóa blog ?</h1>
            <div className="blog__delete--action">
              <button
                onClick={() => setShowModel(!showModel)}
                className=" blog__delete--btn blog__delete--cancel"
              >
                Hủy
              </button>
              <button
                onClick={() => deleteblog()}
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
                <th className="blog__id">id</th>
                <th>Title</th>
                <th>Ngày tạo</th>
                <th>Ngày sửa</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listTutorials.data.length > 0 ? (
                listTutorials.data.map((item, index) => {
                  return (
                    <tr key={`${index}-tutorials`}>
                      <td>{item._id}</td>
                      <td>{item.title}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(item.updatedAt).toLocaleDateString()}</td>

                      <td>
                        <button
                          onClick={() => {
                            setAction("U");
                            setTargetCourseID(item._id);
                          }}
                          className="btn btn-warning mx-3 d-inline-block"
                        >
                          <NavLink to="/page/create_blog">Sửa</NavLink>
                        </button>
                        <button
                          onClick={() => {
                            setGetblogId(item._id);
                            setShowModel(!showModel);
                          }}
                          className="btn btn-danger"
                        >
                          Xóa
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
        <button onClick={() => setAction("C")} className="blog__create--btn">
          <NavLink to="/page/create_blog" className={"blog__create--link"}>
            Thêm blog
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Blog;
