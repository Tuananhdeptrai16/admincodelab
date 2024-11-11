import React, { useState, useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./reset.scss";
import "./grid.scss";
import "./layout.scss";
import "./base.scss";
import "./breadcrumbs.scss";
import "./checkbox.scss";
import "./keyframe.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "../logo/logo";
import { LogoOnly } from "../logo/logo_only";
import { Footer } from "./footer";
import StoreContext from "../../context/context";
import { Login } from "../login/login";
import axios from "axios";
import DesktopNotice from "../admin/desktopnotice";
const { Header, Sider, Content } = Layout;
const LayoutAdmin = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const { userLogin, Logined } = useContext(StoreContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [listTutorials, setListTutorials] = useState([]);
  console.log(process.env.REACT_APP_API_BACKEND_URL);
  useEffect(() => {
    try {
      const getUserAdmin = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BACKEND_URL}/admins`
        );
        const foundAdmin = await res.data.filter((item) => {
          return item._id === userLogin;
        });
        setListTutorials(foundAdmin);
      };
      getUserAdmin();
    } catch (error) {}
  }, [userLogin]);
  return (
    <>
      {isSmallScreen === true ? (
        DesktopNotice
      ) : (
        <div>
          {Logined ? (
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                  {collapsed ? <LogoOnly /> : <Logo />}
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  items={[
                    {
                      key: "1",
                      icon: (
                        <NavLink to="/admincodelab/dashboard">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/dashboard.png`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/dashboard">
                          Trang chủ
                        </NavLink>
                      ),
                    },
                    {
                      key: "2",
                      icon: (
                        <NavLink to="/admincodelab/course">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/page.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/course">Khóa học</NavLink>
                      ),
                    },
                    {
                      key: "3",
                      icon: (
                        <NavLink to="/admincodelab/lesson">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/file.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/lesson">Bài học</NavLink>
                      ),
                    },
                    {
                      key: "4",
                      icon: (
                        <NavLink to="/users">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/users.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/user">Người dùng</NavLink>
                      ),
                    },

                    {
                      key: "5",
                      icon: (
                        <NavLink to="/admincodelab/admin">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/user_admin.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/admincodelab/admin">Nội bộ</NavLink>,
                    },

                    {
                      key: "6",
                      icon: (
                        <NavLink to="/admincodelab/blog">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/blog.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/admincodelab/blog">Blog</NavLink>,
                    },
                    {
                      key: "7",
                      icon: (
                        <NavLink to="/admincodelab/product">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/link.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/product">
                          Sản phẩm người dùng
                        </NavLink>
                      ),
                    },
                    {
                      key: "8",
                      icon: (
                        <NavLink to="/admincodelab/comment">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/comment.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/comment">Bình luận</NavLink>
                      ),
                    },
                    {
                      key: "8",
                      icon: (
                        <NavLink to="/admincodelab/calendar">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/calendar.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/calendar">Lịch</NavLink>
                      ),
                    },
                    {
                      key: "9",
                      icon: (
                        <NavLink to="/admincodelab/help">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/help.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/admincodelab/help">Giúp đỡ</NavLink>,
                    },
                  ]}
                />
              </Sider>
              <Layout>
                <Header
                  style={{
                    padding: 0,
                    background: colorBgContainer,
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />

                  <div className="header__wrap">
                    <div className="notification">
                      <button className="notification__action">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/notification.svg`}
                          alt=""
                          className="notification__img"
                        />
                      </button>
                    </div>
                    <div className="country">
                      <button className="country__action">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/vietnam.png`}
                          alt=""
                          className="country__img"
                        />
                      </button>
                    </div>
                    <div className="avatar">
                      <button className="avatar__action">
                        <img
                          src={
                            listTutorials.length > 0
                              ? listTutorials[0].image
                              : "loading"
                          }
                          alt=""
                          className="avatar__img"
                        />
                      </button>
                      <div className="avatar__user">
                        <p className="avatar__user--name">
                          {listTutorials.length > 0
                            ? listTutorials[0].username
                            : "loading"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Header>

                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Outlet />
                  {Logined === false ? <Login></Login> : ""}
                </Content>
                <Footer></Footer>
              </Layout>
            </Layout>
          ) : (
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                  {collapsed ? <LogoOnly /> : <Logo />}
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  items={[
                    {
                      key: "1",
                      icon: (
                        <NavLink to="/admincodelab/dashboard">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/dashboard.png`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/dashboard">
                          Dashboard
                        </NavLink>
                      ),
                    },

                    {
                      key: "2",
                      icon: (
                        <NavLink to="/admincodelab/user">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/user.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/admincodelab/user">Members</NavLink>,
                    },

                    {
                      key: "3",
                      icon: (
                        <NavLink to="/exercise">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/lesson.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/exercise">Exercise</NavLink>,
                    },

                    {
                      key: "4",
                      icon: (
                        <NavLink to="/admincodelab/course">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/page.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/course">Courses</NavLink>
                      ),
                    },
                    {
                      key: "5",
                      icon: (
                        <NavLink to="/admincodelab/blog">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/blog.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/admincodelab/blog">Blog</NavLink>,
                    },
                    {
                      key: "6",
                      icon: (
                        <NavLink to="/admincodelab/comment">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/comment.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/comment">Comment</NavLink>
                      ),
                    },
                    {
                      key: "7",
                      icon: (
                        <NavLink to="/admincodelab/calendar">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/calendar.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: (
                        <NavLink to="/admincodelab/calendar">Calendar</NavLink>
                      ),
                    },
                    {
                      key: "8",
                      icon: (
                        <NavLink to="/tools">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/tools.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/tools">Tools</NavLink>,
                    },
                    {
                      key: "9",
                      icon: (
                        <NavLink to="/admincodelab/help">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/icon/help.svg`}
                            alt="svg"
                            className="nav__icon icon"
                          />
                        </NavLink>
                      ),
                      label: <NavLink to="/admincodelab/help">Help</NavLink>,
                    },
                  ]}
                />
              </Sider>
              <Layout>
                <Header
                  style={{
                    padding: 0,
                    background: colorBgContainer,
                  }}
                >
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                  <div className="login__action">
                    <button className="login__btn">Đăng nhập</button>
                  </div>
                </Header>
                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Outlet />
                  {Logined === false ? <Login></Login> : ""}
                </Content>
                <Footer></Footer>
              </Layout>
            </Layout>
          )}
        </div>
      )}
    </>
  );
};

export default LayoutAdmin;
