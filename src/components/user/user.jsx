import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user.scss";
import { NavLink } from "react-router-dom";
import { Pagination } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import CSS để hiển thị thanh loading
// import { useContext } from "react";
// import StoreContext from "../../context/context";
const Users = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  // const { setTargetIdEdit, setAction } = useContext(StoreContext);
  const [showModelDelete, setShowModelDelete] = useState(false);
  const [error, setError] = useState("");
  const [toastError, setToastError] = useState(false);
  const [deleteData, setDeleteData] = useState({
    dataDelete: {
      _id: {
        $in: [],
      },
    },
  });
  const isDisabled = deleteData.dataDelete._id.$in.length === 0;
  const [toastSuccess, setToastSuccess] = useState(false);
  const handlePageChange = async (page) => {
    NProgress.start();
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/users?limit=5&page=${page}`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
    NProgress.done();
  };
  const deleteManyAdmin = async () => {
    NProgress.start();
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/many_users`,
        { data: deleteData }
      );
      handlePageChange();
      setShowModelDelete(false);
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
    NProgress.done();
  };
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [listCheckItem, setListCheckItem] = useState([]);

  useEffect(() => {
    NProgress.start();
    const updateCheckedItems = () => {
      const checkedItemsArray = Object.keys(checkedItems);

      const trueCheckedItems = checkedItemsArray.filter(
        (key) => checkedItems[key] === true
      );
      setListCheckItem(trueCheckedItems);
    };
    updateCheckedItems();
    NProgress.done();
  }, [checkedItems]);
  useEffect(() => {
    NProgress.start();
    setDeleteData({
      dataDelete: {
        _id: {
          $in: listCheckItem,
        },
      },
    });
    NProgress.done();
  }, [checkedItems, listCheckItem]);
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
        <div className="loader__text"></div>
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
      <div className="user">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <NavLink to="/admincodelab/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="/admincodelab/user" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">
                Quản lý người dùng
              </p>
            </NavLink>
          </div>
        </div>
        <div className="user__wrap">
          <h1 className="user__heading">Quản lý người dùng</h1>
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
                <button className="user__delete--btn user__delete--sure">
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
                Bạn muốn xóa người dùng này ?
              </h1>
              <div className="user__delete--action">
                <button
                  onClick={() => setShowModelDelete(!showModelDelete)}
                  className=" user__delete--btn user__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => deleteManyAdmin()}
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
                  <th>
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
                </tr>
              </thead>
              <tbody>
                {listTutorials &&
                listTutorials.data &&
                listTutorials.data.length > 0 ? (
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
                          <div className="user__avatar">
                            <img
                              src={
                                item.data.photoURL
                                  ? `${item.data.photoURL}`
                                  : `${process.env.PUBLIC_URL}/images/avataruser.jpg`
                              }
                              alt=""
                              className="user__img"
                            />
                            <p className="user__name">
                              {item.data.displayName
                                ? item.data.displayName
                                : item.data.email}
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
                            {item.data.email}
                          </div>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(item.updatedAt).toLocaleDateString()}</td>

                        <td>
                          <p className="user__user">status</p>
                        </td>
                        {/* <td className="user__action">
                          <NavLink to="/user/add_user">
                            <button
                              onClick={() => {
                                setAction("U");
                                setTargetIdEdit(item._id);
                              }}
                              className="btn btn-warning mx-3 d-inline-block user__btn"
                            >
                              <img
                                src={`${process.env.PUBLIC_URL}/images/icon/edit.svg`}
                                alt=""
                                className="user__icon"
                              />
                            </button>
                          </NavLink>
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="loader-text">
                      Loading
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="user__btn-wrap">
          <button
            style={{
              pointerEvents: isDisabled ? "none" : "auto", // Nếu mảng rỗng thì vô hiệu hóa
              opacity: isDisabled ? 0.5 : 1, // Giảm độ mờ khi bị vô hiệu hóa
            }}
            onClick={() => setShowModelDelete(true)}
            className="user__btn-delete"
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/trash.svg`}
              alt=""
              className="user__icon "
            />
            Xóa
          </button>
          {/* <div className="user__create">
            <NavLink to="/admincodelab/user/add_user" className={"user__create--link"}>
              <button
                onClick={() => setAction("C")}
                className="user__create--btn"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
                  alt=""
                  className="user__icon  icon-svg"
                />
                Thêm Admin
              </button>
            </NavLink>
          </div> */}
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
