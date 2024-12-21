import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import Logo from "../logo/Logo";
import StoreContext from "../../context/Context";
import { ToastSuccess } from "../toast/Toast-Success";
import { Toast } from "../toast/Toast-Error";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import CSS để hiển thị thanh loading

export const Login = () => {
  const [showModel, setShowModel] = useState(false);
  const [showError, setShowError] = useState(false);
  const { setLogined, setUserLogin } = useContext(StoreContext);
  const [password, setPassWord] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogin = async () => {
    try {
      NProgress.start();
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
          }),
        }
      );
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (response.ok && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Data.user", data.user);
        setUserLogin(data.user);
        setLogined(true);
        setShowModel(true);
      } else {
        setShowError(true); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      setShowError(true); // Hiển thị thông báo lỗi
    } finally {
      NProgress.done(); // Kết thúc thanh loading
    }
  };
  // Hàm xử lý sự kiện khi submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động gửi biểu mẫu
    handleLogin(); // Gọi hàm đăng nhập
  };
  return (
    <>
      {showModel && <ToastSuccess />}
      {showError && <Toast />}
      <div className="main-content">
        <div className="login">
          <div className="form-container animationLogin">
            <div className="login__logo">
              <Logo />
            </div>
            <p className="title">Đăng nhập</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  autoComplete="current-username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
                <div className="forgot">
                  <Link rel="noopener noreferrer" to="#">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <button type="submit" className="sign">
                Sign in
              </button>
            </form>
            <div className="social-message">
              <div className="line-form"></div>
              <p className="message">Login with social accounts</p>
              <div className="line-form"></div>
            </div>
            <div className="social-icons">
              {/* Thêm các nút đăng nhập với Google, Twitter, GitHub */}
              {/* Giữ lại đoạn SVG như cũ */}
            </div>
            <p className="signup">
              Don't have an account?
              <button onClick={() => handleSubmit()}>Sign up</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
