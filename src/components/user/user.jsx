import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { NavLink } from "react-router-dom";
import { Pagination } from "antd";
import { ToastSuccess } from "../toast/toastsuccess";
const Users = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showModelDelete, setShowModelDelete] = useState(false);
  const [getUserId] = useState("");

  const [toastSuccess, setToastSuccess] = useState(false);
  const handlePageChange = async (page) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/admins`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };
  const deleteAdmin = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BACKEND_URL}/users/${getUserId}`,
        { admin: false }
      );
      handlePageChange();
      setShowModel(false);
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          setToastSuccess(false);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const updateAdmin = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BACKEND_URL}/users/${getUserId}`,
        { admin: true } // Truyền đối tượng trực tiếp, không cần bọc trong "data"
      );
      handlePageChange();
      setShowModel(false);
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          setToastSuccess(false);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    const newCheckedItems = {};
    listTutorials.forEach((item) => {
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
  useEffect(() => {
    handlePageChange();
  }, []);
  if (!listTutorials) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <h1 className="loader__text">Loading....</h1>
      </div>
    );
  }

  return (
    <>
      {toastSuccess === true ? <ToastSuccess></ToastSuccess> : ""}
      <div className="user">
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
              <p className="breadcrumb__name  breadcrumb__active">Người dùng</p>
            </NavLink>
          </div>
        </div>
        <div className="user__wrap">
          <h1 className="user__heading">Người dùng </h1>
        </div>
        <div className="user__separate"></div>
        <div className="user__search">
          <input
            type="text"
            name=""
            placeholder="Tìm kiếm người dùng..."
            id=""
            className="user__search--input"
          />
          <button className="user__search--btn">
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/search.svg`}
              className="user__icon-search"
              alt=""
            />
          </button>
        </div>
        {showModel && (
          <>
            <div className="user__delete">
              <h1 className="user__delete--notification">
                Bạn muốn đề xuất quản trị viên. Người này có thể đăng nhập vào
                trang Admin và trực tiếp quản lý trang CodeLab
              </h1>
              <div className="user__delete--action">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className=" user__delete--btn user__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => updateAdmin()}
                  className="user__delete--btn user__delete--sure"
                >
                  Đồng ý
                </button>
              </div>
            </div>
            <div
              onClick={() => setShowModel(!showModel)}
              className="user__overlay"
            ></div>
          </>
        )}
        {showModelDelete && (
          <>
            <div className="user__delete">
              <h1 className="user__delete--notification">
                Bạn muốn xóa quản trị viên này ?
              </h1>
              <div className="user__delete--action">
                <button
                  onClick={() => setShowModelDelete(!showModelDelete)}
                  className=" user__delete--btn user__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowModelDelete(!showModelDelete);
                    deleteAdmin();
                  }}
                  className="user__delete--btn user__delete--sure"
                >
                  Đồng ý
                </button>
              </div>
            </div>
            <div
              onClick={() => setShowModel(!showModel)}
              className="user__overlay"
            ></div>
          </>
        )}
        <div className="user__list">
          <div className="user__item">
            <table>
              <thead>
                <tr>
                  <th className="user__border--left">
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
                  <th>Thông tin người dùng</th>
                  <th>Email </th>
                  <th>Ngày tạo</th>
                  <th>Ngày sửa</th>
                  <th>Trạng thái</th>
                  <th className="user__border--right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listTutorials.length > 0 ? (
                  listTutorials.map((item, index) => {
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
                          <div className="user__avatar">
                            <img
                              src={
                                item.image
                                  ? `${item.image}`
                                  : `${process.env.PUBLIC_URL}/images/avataruser.jpg`
                              }
                              alt=""
                              className="user__img"
                            />
                            <p className="user__name">
                              {item.username ? item.username : "User"}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="user__email">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/gmail.png`}
                              className="user__icon-search"
                              alt=""
                            />
                            {item.email}
                          </div>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>

                        <td>
                          <p className="user__user">status</p>
                        </td>
                        <td className="user__action">
                          <NavLink to="/course/create_courses">
                            <button
                              onClick={() => {}}
                              className="btn btn-warning mx-3 d-inline-block user__btn"
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                alt=""
                                className="user__icon"
                              />
                            </button>
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">No user found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="user__btn-wrap">
          <button className="user__btn-delete">
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/trash.svg`}
              alt=""
              className="user__icon "
            />
            Xóa
          </button>
          <div className="user__create">
            <NavLink to="/user/add_user" className={"user__create--link"}>
              <button className="user__create--btn">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
                  alt=""
                  className="user__icon  icon-svg"
                />
                Thêm Admin
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

export default Users;
