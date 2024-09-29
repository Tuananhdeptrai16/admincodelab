import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../components/layout/layout";
import CourseCreation from "../components/createCourses/courses"; // Uncomment khi cần sử dụng
import CourseForm from "../components/createCourses/create";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutAdmin />}>
        <Route path="/user" element={<CourseCreation />} />
        <Route path="/page" element={<CourseCreation />} />
        <Route path="/page/create_courses" element={<CourseForm />} />
        <Route path="/post" element={<CourseCreation />} />
        <Route path="/uploads" element={<CourseCreation />} />
        <Route path="/tools" element={<CourseCreation />} />
        <Route path="/comment" element={<CourseCreation />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
