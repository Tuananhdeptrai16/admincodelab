import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../components/layout/Layout";
import CourseCreation from "../components/createCourses/Courses";
import CourseForm from "../components/createCourses/Create-Courses";
import Blog from "../components/blog/Blog";
import Users from "../components/user/User";
import { Comment } from "../components/comment/Comment";
import BlogForm from "../components/blog/Create-blog";
import { Dashboard } from "../components/dashboard/Dashboard";
import { Help } from "../components/help/Help";
import Calendar from "../components/calendar/Calendar";
import { FormAddUser } from "../components/user/Form-Add-Admin";
import { Lesson } from "../components/lesson/lesson";
import { DetailsCourse } from "../components/lesson/detail";
import LessonForm from "../components/lesson/lessonform";
import { ExerciseForm } from "../components/lesson/exerciseform";
import Admins from "../components/user/Admin";
import ProductCreation from "../components/link/Link";
import ProductForm from "../components/link/Link-Form";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admincodelab/" element={<LayoutAdmin />}>
        <Route path="/admincodelab/" element={<Dashboard />} />
        <Route path="/admincodelab/home" element={<Dashboard />} />
        <Route path="/admincodelab/lesson" element={<Lesson />} />
        <Route
          path="/admincodelab/lesson/details"
          element={<DetailsCourse />}
        />
        <Route path="/admincodelab/lesson/form" element={<LessonForm />} />
        <Route path="/admincodelab/lesson/formEx" element={<ExerciseForm />} />
        <Route path="/admincodelab/dashboard" element={<Dashboard />} />
        <Route path="/admincodelab/calendar" element={<Calendar />} />
        <Route path="/admincodelab/admin" element={<Admins />} />
        <Route path="/admincodelab/user" element={<Users />} />
        <Route path="/admincodelab/user/add_user" element={<FormAddUser />} />
        <Route path="/admincodelab/course" element={<CourseCreation />} />
        <Route
          path="/admincodelab/course/create_courses"
          element={<CourseForm />}
        />
        <Route path="/admincodelab/blog" element={<Blog />} />
        <Route path="/admincodelab/blog/create_blog" element={<BlogForm />} />
        <Route path="/admincodelab/product" element={<ProductCreation />} />
        <Route
          path="/admincodelab/product/create_product"
          element={<ProductForm />}
        />

        <Route path="/admincodelab/comment" element={<Comment />} />
        <Route path="/admincodelab/help" element={<Help />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
