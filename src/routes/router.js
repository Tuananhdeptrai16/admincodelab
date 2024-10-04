import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../components/layout/layout";
import CourseCreation from "../components/createCourses/courses";
import CourseForm from "../components/createCourses/create";
import { Exercise } from "../components/exersise/excersise";
import Blog from "../components/blog/blog";
import Users from "../components/user/user";
import { Tools } from "../components/tools/tools";
import { Comment } from "../components/comment/comment";
import BlogForm from "../components/blog/create_bog";
import { Dashboard } from "../components/dashboard/dashboard";
import { Help } from "../components/help/help";
import Calendar from "../components/calendar/calendar";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/user" element={<Users />} />
        <Route path="/page" element={<CourseCreation />} />
        <Route path="/page/create_courses" element={<CourseForm />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/page/create_blog" element={<BlogForm />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
