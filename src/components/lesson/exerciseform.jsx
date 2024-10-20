import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./excersise.scss";
import { NavLink } from "react-router-dom";
import { ToastSuccess } from "../toast/toastsuccess";
import StoreContext from "../../context/context";
export const ExerciseForm = () => {
  const [listTutorials, setListTutorials] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [getExerciseId] = useState("");
  const { targetExerciseId } = useContext(StoreContext);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [questionData, setQuestionData] = useState({
    coursesId: targetExerciseId,
    questions: [
      {
        questionName: "",
        correctAnswer: "",
        optionsSelect: [], // Đảm bảo content là một mảng
        answersCorrect: "",
      },
    ],
  });
  const handleAddQuestion = () => {
    setQuestionData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          questionName: "",
          correctAnswer: "",
          optionsSelect: [],
          answersCorrect: "",
        },
      ],
    }));
  };

  const getListTutorials = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/quiz`
      );
      setListTutorials(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
    }
  };
  const deleteExercise = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BACKEND_URL}/quiz`,
        { data: { _id: getExerciseId } } // Truyền ID khóa học trong body
      );
      getListTutorials(); // Cập nhật lại danh sách sau khi xóa
      setShowModel(false);
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          setToastSuccess(false);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error("Error deleting course: ", error); // Bắt lỗi nếu xảy ra
    }
  };
  const handleAddOption = (questionIndex) => {
    setQuestionData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].optionsSelect.push({
        option: "",
      });
      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };
  const handleQuestionChange = (e, questionIndex) => {
    const updatedQuestions = [...questionData.questions];
    updatedQuestions[questionIndex].title = e.target.value;
    setQuestionData({
      ...questionData,
      questions: updatedQuestions,
    });
  };
  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const updatedOptionsSelect = [
      ...questionData.questions[questionIndex].optionsSelect,
    ];
    updatedOptionsSelect[optionIndex].option = e.target.value;
    const updatedQuestions = [...questionData.questions];
    updatedQuestions[questionIndex].optionsSelect = updatedOptionsSelect;
    setQuestionData({
      ...questionData,
      questions: updatedQuestions,
    });
  };
  const handleCorrectAnswerChange = (e, questionIndex) => {
    const updatedQuestions = [...questionData.questions];
    updatedQuestions[questionIndex].correctAnswer = e.target.value;
    setQuestionData({
      ...questionData,
      questions: updatedQuestions,
    });
  };

  useEffect(() => {
    getListTutorials();
  }, []);

  if (!listTutorials || !listTutorials.data) {
    return (
      <div className="loader__wrap">
        <div className="loader"></div>
        <h1 className="loader__text">Loading....</h1>
      </div>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/exercise`;
    try {
      await axios.post(`${apiUrl}`, questionData);
      setTimeout(() => {
        setToastSuccess(true);
        setTimeout(() => {
          window.location.href = "/exercise"; // Chuyển hướng sau khi toast thành công
        }, 1000); // Đợi 1 giây sau khi toast thành công
      }, 1000); // Thời gian hiển thị toast
    } catch (error) {
      console.error("Error submitting data: ", error); // Bắt lỗi khi gửi dữ liệu
    }
  };

  return (
    <>
      {toastSuccess === true ? <ToastSuccess></ToastSuccess> : ""}
      <div className="exercise">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <NavLink to="/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="/lesson" className="breadcrumb__item">
              <p className="breadcrumb__name  ">Bài tập</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="#!" className="breadcrumb__item">
              <p className="breadcrumb__name  breadcrumb__active">
                Thêm câu hỏi
              </p>
            </NavLink>
          </div>
        </div>
        <h1 className="exercise__heading">Thêm bài tập</h1>
        <p className="exercise__desc">Hãy thêm bài tập mới của bạn ! ❤️👌</p>
        <div className="exercise__separate"></div>

        {showModel && (
          <>
            <div className="exercise__delete">
              <h1 className="exercise__delete--notification">
                Bạn muốn xóa khóa học ?
              </h1>
              <div className="exercise__delete--action">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className=" exercise__delete--btn exercise__delete--cancel"
                >
                  Hủy
                </button>
                <button
                  onClick={() => deleteExercise()}
                  className="exercise__delete--btn exercise__delete--sure"
                >
                  Xóa
                </button>
              </div>
            </div>
            <div
              onClick={() => setShowModel(!showModel)}
              className="exercise__overlay"
            ></div>
          </>
        )}
        <button onClick={handleAddQuestion} className="exercise__add">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
            alt=""
            className="exercise__add--icon"
          />
          Thêm câu hỏi mới
        </button>
        {questionData.questions.map((question, questionIndex) => (
          <div key={`question-${questionIndex}`} className="exercise__wrap">
            <h2 className="exercise__title--new">Câu hỏi mới</h2>
            <div key={questionIndex} className="exercise__question">
              <label
                htmlFor={`question-${questionIndex}`}
                className="exercise__title"
              >
                Nhập câu hỏi {questionIndex + 1} :
              </label>
              <input
                type="text"
                name={`question-${questionIndex}`}
                id={`question-${questionIndex}`}
                placeholder="Nhập câu hỏi"
                value={question.title}
                onChange={(e) => handleQuestionChange(e, questionIndex)}
                className="exercise__input"
              />
              {question.optionsSelect.map((option, optionIndex) => (
                <div key={optionIndex} className="exercise__option">
                  <label
                    htmlFor="answer"
                    className="exercise__title--optionsSelect"
                  >{`Nhập đáp án ${optionIndex + 1}`}</label>
                  <input
                    type="text"
                    className="exercise__input"
                    name="answer"
                    id="answer"
                    placeholder={`Nhập đáp án ${optionIndex + 1}`}
                    value={option.option}
                    onChange={(e) => {
                      handleOptionChange(e, questionIndex, optionIndex);
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() => handleAddOption(questionIndex)}
                className="exercise__add-optionsSelect"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
                  alt=""
                  className="exercise__add--icon-optionsSelect"
                />
                Thêm lựa trọn
              </button>
              <label
                htmlFor={`correct__answer-${questionIndex}`}
                className="exercise__title"
              >
                Đáp án đúng là ?
              </label>
              <input
                type="text"
                name={`correct__answer-${questionIndex}`}
                id={`correct__answer-${questionIndex}`}
                placeholder="Nhập câu trả lời"
                value={question.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(e, questionIndex)}
                className="exercise__input"
              />
            </div>
          </div>
        ))}
        <div className="exercise__action-btn">
          <button
            onClick={(e) => handleSubmit(e)}
            className="exercise__btn exercise__action--save"
          >
            Save
          </button>
          <button className="exercise__btn exercise__action--cancel">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
