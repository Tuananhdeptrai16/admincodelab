import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./courses.scss";
import { Pagination } from "antd";
import { NavLink } from "react-router-dom";
import StoreContext from "../../context/context";

const CourseCreation = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showManyDelete, setShowManyDelete] = useState(false);
  const { setAction, setTargetCourseID } = useContext(StoreContext);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState("");
  const [toastError, setToastError] = useState(false);
  const [deleteData, setDeleteData] = useState({
    dataDelete: {
      _id: {
        $in: [],
      },
    },
  });
  const handlePageChange = async (page) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/courses?limit=5&page=${page}`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };

  const deleteManyCourses = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/manycourses`,
        { data: deleteData }
      );
      handlePageChange();
      setShowManyDelete(false);
      setDeleteData({
        dataDelete: {
          _id: {
            $in: [],
          },
        },
      });
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          setToastSuccess(false);
        }, 2000);
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
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [listCheckItem, setListCheckItem] = useState([]);
  const updateCheckedItems = () => {
    const checkedItemsArray = Object.keys(checkedItems);

    const trueCheckedItems = checkedItemsArray.filter(
      (key) => checkedItems[key] === true
    );
    setListCheckItem(trueCheckedItems);
  };
  useEffect(() => {
    updateCheckedItems();
  }, [checkedItems]);
  useEffect(() => {
    setDeleteData({
      dataDelete: {
        _id: {
          $in: listCheckItem,
        },
      },
    });
  }, [checkedItems, listCheckItem]); // Chạy mỗi khi listCheckItem thay đổi
  useEffect(() => {
    handlePageChange(1);
  }, []);
  const isDisabled = deleteData.dataDelete._id.$in.length === 0;
  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    const newCheckedItems = {};
    listTutorials.data.forEach((item) => {
      newCheckedItems[item._id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const updatedItems = {
        ...prev,
        [id]: !prev[id],
      };
      return updatedItems;
    });
  };
  const [getInfoSearch, setGetInfoSearch] = useState("");
  const [arrInfoSearch, setArrInfoSearch] = useState([]);
  const [displayInfoArr, setDisplayInfoArr] = useState([]);
  const handleGetSearchInfo = async () => {
    let arr = await listTutorials.data;
    const targetIds = arr
      .filter((item) => {
        return item.title
          .toLocaleLowerCase()
          .trim()
          .includes(getInfoSearch.toLocaleLowerCase().trim());
      })
      .map((item) => item._id);
    setArrInfoSearch(targetIds);
    let TargetCourse = arrInfoSearch.map((id) => {
      let result = listTutorials.data.find((item1) => item1._id === id);
      return result;
    });
    if (getInfoSearch.trim() === "") {
      setArrInfoSearch([]);
      setDisplayInfoArr([]);
      return; // Thoát khỏi hàm
    }
    setDisplayInfoArr(TargetCourse);
  };
  if (!listTutorials || !listTutorials.data) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <h1 className="loader__text">Loading....</h1>
      </div>
    );
  }
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
      <div className="courses">
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
              <p className="breadcrumb__name  breadcrumb__active">Khóa học</p>
            </NavLink>
          </div>
        </div>
        <h1 className="courses__heading">Quản lý khóa học</h1>
        <div className="courses__separate"></div>
        <div className="user__search">
          <input
            type="text"
            name=""
            placeholder="Tìm kiếm khóa học..."
            id=""
            value={getInfoSearch}
            onChange={(e) => {
              handleGetSearchInfo();
              setGetInfoSearch(e.target.value);
            }}
            className="courses__search--input"
          />
          <button
            onClick={() => {
              handleGetSearchInfo();
            }}
            className="courses__search--btn"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/search.svg`}
              className="courses__adding--icon"
              alt=""
            />
          </button>
        </div>

        {showManyDelete && (
          <>
            <div className="courses__delete">
              <h1 className="courses__delete--notification">
                Bạn muốn tất cả các khóa học đã chọn ?
              </h1>
              <div className="courses__delete--action">
                <button
                  onClick={() => setShowManyDelete(!showManyDelete)}
                  className=" courses__delete--btn courses__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => deleteManyCourses()}
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
                  <th className="courses__border--left">
                    <div className="checkbox-wrapper-43">
                      <input
                        onChange={handleCheckAllChange}
                        checked={checkAll}
                        type="checkbox"
                        id="checkall"
                      />
                      <label htmlFor="checkall" className="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                          <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                      </label>
                    </div>
                  </th>
                  <th>Thông tin khóa học</th>
                  <th>Hướng dẫn</th>
                  <th>Ngày tạo</th>
                  <th>Ngày sửa</th>
                  <th>Danh mục</th>
                  <th className="courses__border--right">Sửa</th>
                </tr>
              </thead>
              <tbody>
                {displayInfoArr.length > 0 ? (
                  displayInfoArr.map((item, index) => {
                    return (
                      <tr key={`${index}-tutorials`}>
                        <td>
                          <div className="checkbox-wrapper-43">
                            <input
                              checked={!!checkedItems[item._id]}
                              onChange={() => handleCheckboxChange(item._id)}
                              type="checkbox"
                              id={`input_${item._id}`}
                            />
                            <label
                              htmlFor={`input_${item._id}`}
                              className="check"
                            >
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 18 18"
                              >
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="courses__avatar">
                            <img
                              src={
                                item.courseImage
                                  ? `${item.courseImage}`
                                  : `${process.env.PUBLIC_URL}/images/avatarLesson.jpg`
                              }
                              alt=""
                              className="courses__img"
                            />
                            <p className="courses__name line-clamp">
                              {item.title}
                            </p>
                          </div>
                        </td>
                        <td>
                          <span className="courses__name-author">
                            {item.instructor.name}
                          </span>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                        <td>{item.category}</td>
                        <td className="courses__action">
                          <button
                            onClick={() => {
                              setAction("U");
                              setTargetCourseID(item._id);
                            }}
                            className="btn btn-warning mx-3 d-inline-block"
                          >
                            <NavLink to="/course/create_courses">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                alt=""
                                className="courses__icon"
                              />
                            </NavLink>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : listTutorials.data.length > 0 ? (
                  listTutorials.data.map((item, index) => {
                    return (
                      <tr key={`${index}-tutorials`}>
                        <td>
                          <div className="checkbox-wrapper-43">
                            <input
                              checked={!!checkedItems[item._id]}
                              onChange={() => handleCheckboxChange(item._id)}
                              type="checkbox"
                              id={`input_${item._id}`}
                            />
                            <label
                              htmlFor={`input_${item._id}`}
                              className="check"
                            >
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 18 18"
                              >
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                              </svg>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="courses__avatar">
                            <img
                              src={
                                item.courseImage
                                  ? `${item.courseImage}`
                                  : `${process.env.PUBLIC_URL}/images/avatarLesson.jpg`
                              }
                              alt=""
                              className="courses__img"
                            />
                            <p className="courses__name line-clamp">
                              {item.title}
                            </p>
                          </div>
                        </td>
                        <td>
                          <span className="courses__name-author">
                            {item.instructor.name}
                          </span>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                        <td>{item.category}</td>
                        <td className="courses__action">
                          <button
                            onClick={() => {
                              setAction("U");
                              setTargetCourseID(item._id);
                            }}
                            className="btn btn-warning mx-3 d-inline-block"
                          >
                            <NavLink to="/course/create_courses">
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                alt=""
                                className="courses__icon"
                              />
                            </NavLink>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7">No courses found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="courses__btn-wrap">
          <button
            style={{
              pointerEvents: isDisabled ? "none" : "auto", // Nếu mảng rỗng thì vô hiệu hóa
              opacity: isDisabled ? 0.5 : 1, // Giảm độ mờ khi bị vô hiệu hóa
            }}
            onClick={() => setShowManyDelete(!showManyDelete)}
            className="courses__btn-delete"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/trash.svg`}
              alt=""
              className="courses__icon "
            />
            Xóa
          </button>
          <div className="courses__create">
            <NavLink
              to="/course/create_courses"
              className={"courses__create--link"}
            >
              <button
                onClick={() => setAction("C")}
                className="courses__create--btn"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
                  alt=""
                  className="courses__icon  icon-svg"
                />
                Thêm Khóa Học
              </button>
            </NavLink>
          </div>
        </div>
        <Pagination
          align="center"
          defaultCurrent={1}
          total={50}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CourseCreation;
