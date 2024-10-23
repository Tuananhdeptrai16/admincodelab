import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/router"; // Nhớ import AppRoutes
import StoreContext from "./context/context";
import { useState } from "react";
function App() {
  const [action, setAction] = useState("C");
  const [targetCourseID, setTargetCourseID] = useState("");
  const [targetBlogID, setTargetBlogID] = useState("");
  const [targetLessonID, setTargetLessonID] = useState("");
  const [targetIdEdit, setTargetIdEdit] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [Logined, setLogined] = useState(true);
  return (
    <StoreContext.Provider
      value={{
        action,
        setAction,
        targetCourseID,
        setTargetCourseID,
        targetBlogID,
        setTargetBlogID,
        targetLessonID,
        setTargetLessonID,
        Logined,
        setLogined,
        targetIdEdit,
        setTargetIdEdit,
        setUserLogin,
        userLogin,
      }}
    >
      <Router>
        <AppRoutes />
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
