import React, { useState, useEffect } from "react";
import axios from "axios";
export const Exercise = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/users`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };
  useEffect(() => {
    getListTutorials();
  }, []);
  console.log(listTutorials);
  return <div>Exercise</div>;
};
