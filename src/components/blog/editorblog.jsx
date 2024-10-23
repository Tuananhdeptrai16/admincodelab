import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS
import "./blog.scss";
function BlogEditor() {
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    console.log("Nội dung blog:", content);
    // Xử lý logic gửi nội dung blog lên server tại đây
  };

  return (
    <div>
      <h2>Viết Blog của bạn</h2>
      <ReactQuill value={content} onChange={handleChange} />
      <button onClick={handleSubmit}>Đăng Blog</button>
    </div>
  );
}

export default BlogEditor;
