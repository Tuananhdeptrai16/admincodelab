// The code was written by programmer Truong Tuan Anh
// Thanks for watching and sharing

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/logo";
import "./footer.scss";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col col-3 col-xl-6 col-md-12">
            <div className="footer__logo">
              <Logo></Logo>
            </div>
            <p className="footer__desc">
              Cần trợ giúp cho sự nghiệp mơ ước của bạn? hãy tin tưởng chúng
              tôi. Với Bài học, việc học trở nên dễ dàng hơn rất nhiều đối với
              chúng ta.
            </p>
            <div className="footer__social">
              <div className="footer__icon">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/twitter.svg`}
                  alt=""
                  className="footer__icon--social icon"
                />
              </div>
              <div className="footer__icon">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/Facebook.svg`}
                  alt=""
                  className="footer__icon--social icon"
                />
              </div>
              <div className="footer__icon">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/Linkedin.svg`}
                  alt=""
                  className="footer__icon--social icon"
                />
              </div>
              <div className="footer__icon">
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/instagram.svg`}
                  alt=""
                  className="footer__icon--social icon"
                />
              </div>
            </div>
          </div>
          <div className="col col-xl-3 col-md-4 gy-md-4">
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="footer__link footer__link--active">
                  VỀ CODELAB
                </Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link">Giới Thiệu</Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link">Điều khoản </Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link">Bảo mật </Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link">Cơ hội </Link>
              </li>
            </ul>
          </div>
          <div className="col col-xl-3 gy-md-4 col-md-4 ">
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="footer__link footer__link--active">
                  SẢN PHẨM
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  target="_blank"
                  to="https://tuananhdeptrai16.github.io/todolist/"
                  className="footer__link"
                >
                  Todo List App
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  target="_blank"
                  to="https://tuananhdeptrai16.github.io/weatherapp/"
                  className="footer__link"
                >
                  Weather App
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  target="_blank"
                  to="https://tuananhdeptrai16.github.io/Grocery-Mart/"
                  className="footer__link"
                >
                  Grocery Mart
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  target="_blank"
                  to="https://tuananhdeptrai16.github.io/safetourbobo/"
                  className="footer__link"
                >
                  Safe Tour
                </Link>
              </li>
            </ul>
          </div>
          <div className="col gy-xl-4 col-md-4 ">
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="footer__link footer__link--active">
                  WEBSITE
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/codelab/home" className="footer__link">
                  Trang chủ
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/codelab/blog" className="footer__link">
                  Blog{" "}
                </Link>
              </li>
              <li className="footer__item">
                <Link to="https://zalo.me/0373696603" className="footer__link">
                  Liên hệ
                </Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link">Game</Link>
              </li>
            </ul>
          </div>
          <div className="col col-3 col-xl-9 gy-xl-4 col-md-12">
            <ul className="footer__list">
              <li className="footer__item">
                <Link className="footer__link footer__link--active">
                  THÀNH VIÊN
                </Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link">
                  <span>Founder :</span> Trương Tuấn Anh
                </Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link">
                  <span>Ngày thành lập :</span> 16/08/2024
                </Link>
              </li>
              <li className="footer__item">
                <Link className="footer__link footer__more">
                  <span>Lĩnh vực:</span> Giáo dục, công nghệ - lập trình. Chúng
                  tôi tập trung xây dựng và phát triển các sản phẩm mang lại giá
                  trị cho cộng đồng lập trình viên Việt Nam.
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__separate separate"></div>
        <div className="footer__copyright">
          <p className="footer__copyright--text">
            Copyright ©2024 Khoa Điện Từ - DHCNHN
          </p>
        </div>
      </div>
    </div>
  );
};
