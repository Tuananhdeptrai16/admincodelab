import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { NavLink } from "react-router-dom";

import { ToastSuccess } from "../toast/toastsuccess";
const Users = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showModelDelete, setShowModelDelete] = useState(false);
  const [getUserId, setGetUserId] = useState("");

  const [toastSuccess, setToastSuccess] = useState(false);
  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/users`
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
      getListTutorials();
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
      getListTutorials();
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

  useEffect(() => {
    getListTutorials();
  }, []);
  if (!listTutorials || !listTutorials.data) {
    return <div className="loading">Loading...</div>;
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
        <h1 className="user__heading">Quản lý người dùng</h1>
        <div className="user__seperate"></div>
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
                  <th className="user__id">Mã người dùng</th>
                  <th>Tên</th>
                  <th>Ngày tạo</th>
                  <th>Email</th>
                  <th>CTV </th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listTutorials.data.length > 0 ? (
                  listTutorials.data.map((item, index) => {
                    return (
                      <tr key={`${index}-tutorials`}>
                        <td>{item._id}</td>
                        <td>
                          <p>
                            {item.data.displayName
                              ? item.data.displayName
                              : item.data.email}
                          </p>
                        </td>

                        <td>
                          {new Date(
                            item.data.metadata.creationTime
                          ).toLocaleDateString()}
                        </td>
                        <td>{item.data.email}</td>
                        <td>
                          {item.admin === true ? (
                            <p className="user__admin">Admin</p>
                          ) : (
                            <p className="user__user">User</p>
                          )}
                        </td>
                        <td>
                          {item.admin === true ? (
                            <button
                              onClick={() => {
                                setGetUserId(item._id);
                                setShowModelDelete(!showModelDelete);
                              }}
                              className="btn btn-warning mx-3 d-inline-block"
                            >
                              Xóa Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setGetUserId(item._id);
                                setShowModel(!showModel);
                              }}
                              className="btn btn-danger"
                            >
                              Đề xuất Admin
                            </button>
                          )}
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
      </div>
    </>
  );
};

export default Users;
