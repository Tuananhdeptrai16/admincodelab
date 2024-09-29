import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; // Import Outlet
import "./reset.scss";
import "./grid.scss";
import "./layout.scss";
import "./base.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "../logo/logo";
import { LogoOnly } from "../logo/logo_only";

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
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
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
              key: "2",
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
              key: "3",
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
              key: "4",
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
              key: "5",
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
              key: "6",
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
              key: "7",
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
        {/* Header với nút toggle */}
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
        </Header>

        {/* Content chính */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> {/* Render route con ở đây */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
