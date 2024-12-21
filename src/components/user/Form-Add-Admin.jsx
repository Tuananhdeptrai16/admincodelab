import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./form.scss";
import { useContext } from "react";
import StoreContext from "../../context/Context";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import CSS để hiển thị thanh loading
export const FormAddUser = () => {
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState("");
  const { targetIdEdit, action } = useContext(StoreContext);
  const [toastError, setToastError] = useState(false);
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    address: "",
    password: "",
    phone: "",
    dob: "",
    placeOfBirth: "",
    idNumber: "",
    idDate: "",
    idPlace: "",
    gender: "",
    position: "",
    image: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    NProgress.start();
    if (action === "U") {
      const getUserAdmin = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_BACKEND_URL}/admins`
          );
          const foundAdmin = res.data.filter(
            (item) => item._id === targetIdEdit
          );
          console.log(foundAdmin[0]);
          if (foundAdmin[0]) {
            const idDate = foundAdmin[0]?.idDate;
            const dob = foundAdmin[0]?.dob;
            // Chuyển đổi idDate sang đối tượng Date
            const dateObject = idDate ? new Date(idDate) : null;
            const dateDob = dob ? new Date(dob) : null;
            // Định dạng lại ngày tháng thành 'yyyy-MM-dd'
            const formattedIdDate = dateObject
              ? `${dateObject.getFullYear()}-${String(
                  dateObject.getMonth() + 1
                ).padStart(2, "0")}-${String(dateObject.getDate()).padStart(
                  2,
                  "0"
                )}`
              : null; // Nếu không có idDate, trả về null
            const formattedDob = dateDob
              ? `${dateDob.getFullYear()}-${String(
                  dateDob.getMonth() + 1
                ).padStart(2, "0")}-${String(dateDob.getDate()).padStart(
                  2,
                  "0"
                )}`
              : null; // Nếu không có idDate, trả về null
            setUser({
              id: foundAdmin[0]._id,
              fullname: foundAdmin[0].fullname,
              username: foundAdmin[0].username,
              email: foundAdmin[0].email,
              address: foundAdmin[0].address,
              password: foundAdmin[0].password,
              phone: foundAdmin[0].phone.toString(),
              dob: formattedDob,
              placeOfBirth: foundAdmin[0].placeOfBirth,
              idNumber: foundAdmin[0].idNumber.toString(),
              idDate: formattedIdDate, // Sử dụng ngày đã định dạng
              idPlace: foundAdmin[0].idPlace,
              gender: foundAdmin[0].gender,
              position: foundAdmin[0].position,
              image: foundAdmin[0].image,
            });
          } else {
            // Xử lý trường hợp không tìm thấy admin
            console.error("Admin not found");
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUserAdmin();
    }
    NProgress.done();
  }, [targetIdEdit, action]);
  const handelData = async () => {
    NProgress.start();
    try {
      if (action === "C") {
        await axios.post(
          `${process.env.REACT_APP_API_BACKEND_URL}/admin`,
          user
        );
        setToastSuccess(true);
        setTimeout(() => {
          setToastSuccess(false);
        }, 3000);
        resetForm();
      }
      if (action === "U") {
        await axios.put(`${process.env.REACT_APP_API_BACKEND_URL}/admin`, user);
        setToastSuccess(true);
        setTimeout(() => {
          setToastSuccess(false);
        }, 3000);
        resetForm();
      }
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
  const resetForm = () => {
    setUser({
      fullname: "",
      username: "",
      email: "",
      address: "",
      password: "",
      phone: "",
      dob: "",
      placeOfBirth: "",
      idNumber: "",
      idDate: "",
      idPlace: "",
      gender: "",
      position: "",
      image: "",
    });
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
      <div className="app-content">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <Link to="/admincodelab/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </Link>
            <Link to="/admincodelab/user" className="breadcrumb__item">
              <p className="breadcrumb__name ">Admin</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </Link>
            <Link to="/admincodelab/user/add_user" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">Thêm Admin</p>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="title__title">
                {action === "U" ? "Chỉnh sửa" : "Tạo mới"} admin
              </h3>
              <div className="title__body">
                <form className="row" onSubmit={handleSubmit}>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Username tài khoản</label>
                    <input
                      className="form__control"
                      type="text"
                      name="username"
                      placeholder="username"
                      value={user.username || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4 g-2">
                    <label className="control__label">Mật khẩu</label>
                    <input
                      className="form__control"
                      type="password"
                      name="password"
                      placeholder="password"
                      value={user.password || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2 ">
                    <label className="control__label">Họ và tên</label>
                    <input
                      className="form__control"
                      type="text"
                      name="fullname"
                      placeholder="fullname"
                      value={user.fullname || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Địa chỉ email</label>
                    <input
                      className="form__control"
                      type="email"
                      name="email"
                      placeholder="email"
                      value={user.email || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2">
                    <label className="control__label">Địa chỉ thường trú</label>
                    <input
                      className="form__control"
                      type="text"
                      name="address"
                      placeholder="address"
                      value={user.address || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Số điện thoại</label>
                    <input
                      className="form__control"
                      type="tel"
                      name="phone"
                      placeholder="phone number"
                      value={user.phone || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Ngày sinh</label>
                    <input
                      className="form__control"
                      type="date"
                      name="dob"
                      value={user.dob || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Nơi sinh</label>
                    <input
                      className="form__control"
                      type="text"
                      name="placeOfBirth"
                      placeholder="placeOfBirth"
                      value={user.placeOfBirth || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Số CMND</label>
                    <input
                      className="form__control"
                      type="number"
                      name="idNumber"
                      placeholder="idNumber"
                      value={user.idNumber || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Ngày cấp</label>
                    <input
                      className="form__control"
                      type="date"
                      name="idDate"
                      placeholder="idDate"
                      value={user.idDate || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Nơi cấp</label>
                    <input
                      className="form__control"
                      type="text"
                      name="idPlace"
                      placeholder="idPlace"
                      value={user.idPlace || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Giới tính</label>
                    <select
                      className="form__control"
                      name="gender"
                      value={user.gender || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn giới tính --</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="form__group col-4 g-2">
                    <label className="control__label">Chức vụ</label>
                    <select
                      className="form__control"
                      name="position"
                      value={user.position || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn chức vụ --</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="form__group col-4  g-2  ">
                    <label className="control__label">Link hình ảnh</label>
                    <input
                      className="form__control"
                      type="text"
                      name="image"
                      placeholder="url.."
                      value={user.image || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
                <div className="form__action col-md-12">
                  {action === "U" ? (
                    <>
                      <button
                        onClick={() => handelData()}
                        className="btn btn-save"
                        type="submit"
                      >
                        Lưu lại
                      </button>
                      <Link
                        className="btn btn-cancel"
                        href="/doc/table-data-table.html"
                      >
                        Hủy bỏ
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handelData()}
                        className="btn btn-save"
                        type="submit"
                      >
                        Tạo mới
                      </button>
                      <Link
                        className="btn btn-cancel"
                        href="/doc/table-data-table.html"
                      >
                        Hủy bỏ
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
