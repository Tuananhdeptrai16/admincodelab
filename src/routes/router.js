import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../components/layout/layout";
import CourseCreation from "../components/createCourses/courses"; // Uncomment khi cần sử dụng
import CourseForm from "../components/createCourses/create";
import { User } from "../components/user/user";
import { Exercise } from "../components/exersise/excersise";
import Blog from "../components/blog/blog";
import { Tools } from "../components/tools/tools";
import { Comment } from "../components/comment/comment";
import { Home } from "../components/home/home";
import BlogForm from "../components/blog/create_bog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/page" element={<CourseCreation />} />
        <Route path="/page/create_courses" element={<CourseForm />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/page/create_blog" element={<BlogForm />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/comment" element={<Comment />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
