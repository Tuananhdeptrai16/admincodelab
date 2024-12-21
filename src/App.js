import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Router"; // Nhớ import AppRoutes
import StoreContext from "./context/Context";
import { useState, useEffect } from "react";
import DesktopNotice from "./components/admin/Desktopnotice";
function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1224) {
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
  const [action, setAction] = useState("C");
  const [targetCourseID, setTargetCourseID] = useState("");
  const [targetBlogID, setTargetBlogID] = useState("");
  const [targetProductID, setTargetProductID] = useState("");
  const [targetLessonID, setTargetLessonID] = useState("");
  const [targetIdEdit, setTargetIdEdit] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [Logined, setLogined] = useState(false);
  return (
    <StoreContext.Provider
      value={{
        targetProductID,
        setTargetProductID,
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
        {isSmallScreen === true ? <DesktopNotice /> : <AppRoutes />}
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
