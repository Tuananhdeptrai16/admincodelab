import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; // Import Outlet
import "./reset.scss";
import "./grid.scss";
import "./layout.scss";
import "./base.scss";
import "./breadcrumbs.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "../logo/logo";
import { LogoOnly } from "../logo/logo_only";
import { Footer } from "./footer";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? <LogoOnly /> : <Logo />}</div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: (
                <NavLink to="/dashboard">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/dashboard.png`}
                    alt="svg"
                    className="nav__icon icon"
                  />
                </NavLink>
              ),
              label: <NavLink to="/dashboard">Dashboard</NavLink>,
            },

            {
              key: "2",
              icon: (
                <NavLink to="/user">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/user.svg`}
                    alt="svg"
                    className="nav__icon icon"
                  />
                </NavLink>
              ),
              label: <NavLink to="/user">User</NavLink>,
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
                <NavLink to="/page">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/page.svg`}
                    alt="svg"
                    className="nav__icon icon"
                  />
                </NavLink>
              ),
              label: <NavLink to="/page">Courses</NavLink>,
            },
            {
              key: "5",
              icon: (
                <NavLink to="/blog">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/blog.svg`}
                    alt="svg"
                    className="nav__icon icon"
                  />
                </NavLink>
              ),
              label: <NavLink to="/blog">Blog</NavLink>,
            },
            {
              key: "6",
              icon: (
                <NavLink to="/comment">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/comment.svg`}
                    alt="svg"
                    className="nav__icon icon"
                  />
                </NavLink>
              ),
              label: <NavLink to="/comment">Comment</NavLink>,
            },
            {
              key: "7",
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
              key: "8",
              icon: (
                <NavLink to="/tools">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon/logout.svg`}
                    alt="svg"
                    className="nav__icon icon"
                  />
                </NavLink>
              ),
              label: <NavLink to="/tools">Logout</NavLink>,
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
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
                  src={`${process.env.PUBLIC_URL}/images/avatar.jpg`}
                  alt=""
                  className="avatar__img"
                />
              </button>
              <div className="avatar__user">
                <p className="avatar__user--name">Truong Tuan Anh</p>
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
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
