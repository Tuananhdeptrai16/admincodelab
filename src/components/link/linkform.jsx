import React, { useState, useContext, useEffect } from "react";
import "./link.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import StoreContext from "../../context/context";
import axios from "axios";
import Select from "react-select";
import { NavLink } from "react-router-dom";
const ProductForm = () => {
  const { action, targetProductID } = useContext(StoreContext);
  const [listTutorials, setListTutorials] = useState([]);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState("");

  const [toastError, setToastError] = useState(false);
  const [productData, setProductData] = useState({
    type: "EMPTY_PRODUCT",
    title: "",
    author: "",
    urlImage: "",
    linkProduct: "",
    description: "",
    category: [],
    duration: "",
    content: "",
    rating: 0,
    studentsEnrolled: 0,
  });
  const categoryOptions = [
    { value: "ReactJs", label: "ReactJs" },
    { value: "HTML, CSS", label: "HTML, CSS" },
    { value: "JavaScript", label: "JavaScript" },
  ];
  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/product`
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
          const foundProduct = listTutorials.data.find(
            (blog) => blog._id === targetProductID
          );
          if (foundProduct) {
            setProductData({
              id: targetProductID,
              title: foundProduct.title,
              author: foundProduct.author,
              urlImage: foundProduct.urlImage,
              description: foundProduct.description,
              duration: foundProduct.duration,
              category: foundProduct.category || [],
              linkProduct: foundProduct.linkProduct,
              content: foundProduct.content || "",
              rating: foundProduct.rating,
              studentsEnrolled: foundProduct.studentsEnrolled || 0,
            });
          }
        }
      } else {
        resetForm();
      }
    };
    renderUpdateUser();
  }, [action, targetProductID, listTutorials]); // Bỏ listTutorials ra khỏi dependencies
  const resetForm = () => {
    setProductData({
      type: "EMPTY_PRODUCT",
      title: "",
      author: "",
      urlImage: "",
      linkProduct: "",
      category: [],
      description: "",
      duration: "",
      content: "", // Sửa content thành chuỗi rỗng
      studentsEnrolled: 0,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setProductData((prevData) => ({
      ...prevData,
      content: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/product`;
      if (action === "C") {
        await axios.post(apiUrl, { ...productData });
      } else {
        await axios.put(apiUrl, {
          ...productData,
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
      <div className="link-creation">
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
            <NavLink to="/admincodelab/product" className="breadcrumb__item">
              <p className="breadcrumb__name">Sản phẩm tham khảo</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">
                Update Product
              </p>
            </NavLink>
          </div>
        </div>
        <h1 className="link-creation__title">Thông tin Product</h1>
        <div className="link__separate"></div>
        <form className="link-creation__form" onSubmit={handleSubmit}>
          <div className="row row-cols-2">
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="title" className="control__label">
                  Tiêu đề sản phẩm
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form__control"
                  placeholder="Nhập tiêu đề khóa học"
                  value={productData.title || ""}
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
                  value={productData.author || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-3">
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
                  value={productData.duration || ""}
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
                  value={productData.urlImage || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="linkProduct" className="control__label">
                  Link tới sản phẩm
                </label>
                <input
                  type="text"
                  id="linkProduct"
                  name="linkProduct"
                  className="form__control"
                  placeholder="Nhập link dẫn tới sản phẩm"
                  value={productData.linkProduct || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row row-cols-2">
            <div className="col g-2">
              <div className="form__group">
                <label htmlFor="description" className="control__label">
                  Mô tả sản phẩm
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form__control"
                  placeholder="Nhập mô tả sản phẩm"
                  value={productData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col g-2">
              <div className="form__group ">
                <label htmlFor="category" className="control__label">
                  Danh mục
                </label>
                <Select
                  id="category"
                  name="category"
                  options={categoryOptions}
                  value={productData.category.map((cat) => ({
                    value: cat,
                    label: cat,
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [];
                    setProductData((prevData) => ({
                      ...prevData,
                      category: selectedValues,
                    }));
                  }}
                  isMulti // Để cho phép chọn nhiều mục
                  className="form__control"
                />
              </div>
            </div>
          </div>
          <h2 className="link-creation__subtitle">Chi tiết</h2>
          <div className="link__separate"></div>
          <ReactQuill
            name="content"
            value={productData.content}
            onChange={handleContentChange}
          />
          <div className="link-creation__lessons"></div>

          <div className="link-creation__submit">
            <button
              type="submit"
              className="  link-creation__button link-creation__submit--btn"
            >
              {action === "C" ? "Tạo" : "Cập nhật"} sản phẩm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
