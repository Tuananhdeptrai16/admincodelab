import React from "react";
import { Routes, Route } from "react-router-dom";
import LayoutAdmin from "../components/layout/layout";
import CourseCreation from "../components/createCourses/courses";
import CourseForm from "../components/createCourses/create_courses";
import Blog from "../components/blog/blog";
import Users from "../components/user/user";
import { Comment } from "../components/comment/comment";
import BlogForm from "../components/blog/create_blog";
import { Dashboard } from "../components/dashboard/dashboard";
import { Help } from "../components/help/help";
import Calendar from "../components/calendar/calendar";
import { FormAddUser } from "../components/user/form_add_admin";
import { Lesson } from "../components/lesson/lesson";
import { DetailsCourse } from "../components/lesson/detail";
import LessonForm from "../components/lesson/lessonform";
import { ExerciseForm } from "../components/lesson/exerciseform";
import Admins from "../components/user/admin";
import ProductCreation from "../components/link/link";
import ProductForm from "../components/link/linkform";

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
        \
        <Route path="/admincodelab/comment" element={<Comment />} />
        <Route path="/admincodelab/help" element={<Help />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
