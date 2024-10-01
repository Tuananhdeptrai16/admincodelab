import React from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.scss";
export const Dashboard = () => {
  return (
    <div className="dashboard">
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
            <p className="breadcrumb__name  breadcrumb__active">DashBoard</p>
          </NavLink>
        </div>
      </div>

      <div className="dashboard__wrap">
        <div className="dashboard__total">
          <h1 className="dashboard__heading">DashBoard</h1>
          <div className="row row-cols-3">
            <div className="col">
              <div className="dashboard__item dashboard__courses">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/page.svg`}
                  alt=""
                  className="dashboard__icon"
                />
                <span className="dashboard__number">01</span>
                <p className="dashboard__desc">khóa học đã tạo</p>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__lesson">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/lesson.svg`}
                  alt="svg"
                  className="dashboard__icon"
                />
                <span className="dashboard__number">02</span>
                <p className="dashboard__desc">bài học đã tạo</p>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__blog">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/blog.svg`}
                  alt="svg"
                  className="dashboard__icon"
                />
                <span className="dashboard__number">54</span>
                <p className="dashboard__desc">blog đã tạo</p>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__comment">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/comment.svg`}
                  alt="svg"
                  className="dashboard__icon"
                />
                <span className="dashboard__number">33</span>
                <p className="dashboard__desc">Bình luận </p>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__members">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/user_group.svg`}
                  alt="svg"
                  className="dashboard__icon"
                />
                <span className="dashboard__number">22</span>
                <p className="dashboard__desc">thành viên</p>
              </div>
            </div>
            <div className="col">
              <div className="dashboard__item dashboard__admin-total">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/user_admin.svg`}
                  alt="svg"
                  className="dashboard__icon"
                />
                <span className="dashboard__number">01</span>
                <p className="dashboard__desc">Số Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__admin">
        <h1 className="dashboard__heading">Quản lý admin</h1>
        <div className="row ">
          <div className="col-8">
            <table>
              <thead>
                <tr>
                  <th>avatar</th>
                  <th>Tên</th>
                  <th>Thông tin</th>
                  <th>Lĩnh vực</th>
                  <th>Sửa / Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>item</td>
                  <td>item</td>
                  <td>Chưa có người yêu</td>
                  <td>item</td>
                  <td>
                    <button className="btn btn-warning mx-3 d-inline-block">
                      <NavLink to="/page/create_courses">Sửa</NavLink>
                    </button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <div className="dashboard__background">
              <img
                src={`${process.env.PUBLIC_URL}/images/money.svg`}
                alt=""
                className="dashboard__money--icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
