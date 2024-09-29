import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./courses.scss";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";
const CourseCreation = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [getCoursesId, setGetCoursesId] = useState("");
  const { setAction, setTargetCourseID } = useContext(StoreContext);
  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };
  const deleteCourses = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses`,
        { data: { _id: getCoursesId } } // Truyền ID khóa học trong body
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
    <div className="courses">
      <h1 className="courses__heading">Khóa học đã tạo</h1>
      {showModel && (
        <>
          <div className="courses__delete">
            <h1 className="courses__delete--notification">
              Bạn muốn xóa khóa học ?
            </h1>
            <div className="courses__delete--action">
              <button
                onClick={() => setShowModel(!showModel)}
                className=" courses__delete--btn courses__delete--cancel"
              >
                Hủy
              </button>
              <button
                onClick={() => deleteCourses()}
                className="courses__delete--btn courses__delete--sure"
              >
                Xóa
              </button>
            </div>
          </div>
          <div
            onClick={() => setShowModel(!showModel)}
            className="courses__overlay"
          ></div>
        </>
      )}
      <div className="courses__list">
        <div className="courses__item">
          <table>
            <thead>
              <tr>
                <th className="courses__id">id</th>
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
                          <NavLink to="/page/create_courses">Sửa</NavLink>
                        </button>
                        <button
                          onClick={() => {
                            setGetCoursesId(item._id);
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
                  <td colSpan="5">No courses found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="courses__create">
        <button onClick={() => setAction("C")} className="courses__create--btn">
          <NavLink
            to="/page/create_courses"
            className={"courses__create--link"}
          >
            Thêm Khóa Học
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default CourseCreation;
