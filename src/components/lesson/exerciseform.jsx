import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./excersise.scss";
import { NavLink } from "react-router-dom";
import { ToastSuccess } from "../toast/toastsuccess";
import StoreContext from "../../context/context";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export const ExerciseForm = () => {
  const [showModel, setShowModel] = useState(false);
  const { targetLessonID, action } = useContext(StoreContext);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [targetQuiz, setTargetQuiz] = useState("");
  const [questionData, setQuestionData] = useState({
    lessonId: targetLessonID,
    questions: [
      {
        questionName: "",
        optionsSelect: [], // Đảm bảo content là một mảng
        answersCorrect: "",
      },
    ],
  });
  const handleAddQuestion = () => {
    NProgress.start();
    setQuestionData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          questionName: "",
          optionsSelect: [],
          answersCorrect: "",
        },
      ],
    }));
    NProgress.done();
  };

  const deleteExercise = async () => {
    NProgress.start();
    try {
      const dataDelete = {
        quizId: targetQuiz,
        lessonId: targetLessonID,
      };
      await axios.delete(`${process.env.REACT_APP_API_BACKEND_URL}/quiz`, {
        data: dataDelete,
      });
      const res = await axios.get(
        `${process.env.REACT_APP_API_BACKEND_URL}/lesson?populate=quizInfo`
      );
      const foundLesson = res.data.data.filter(
        (item) => item._id === targetLessonID
      );
      setQuestionData(foundLesson[0].quizInfo);
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
    NProgress.done();
  };
  const handleAddOption = (questionIndex) => {
    NProgress.start();
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
    NProgress.done();
  };
  const handleQuestionChange = (e, questionIndex) => {
    NProgress.start();
    const updatedQuestions = [...questionData.questions];
    updatedQuestions[questionIndex].questionName = e.target.value;
    setQuestionData({
      ...questionData,
      questions: updatedQuestions,
    });
    NProgress.done();
  };
  const handleOptionChange = (e, questionIndex, optionIndex) => {
    NProgress.start();
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
    NProgress.done();
  };
  const handleCorrectAnswerChange = (e, questionIndex) => {
    NProgress.start();
    const updatedQuestions = [...questionData.questions];
    updatedQuestions[questionIndex].answersCorrect = e.target.value;
    setQuestionData({
      ...questionData,
      questions: updatedQuestions,
    });
    NProgress.done();
  };
  useEffect(() => {
    NProgress.start();
    if (action === "U") {
      const getListTutorials = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_BACKEND_URL}/lesson?populate=quizInfo`
          );
          const foundLesson = res.data.data.filter(
            (item) => item._id === targetLessonID
          );
          setQuestionData(foundLesson[0].quizInfo);
        } catch (error) {
          console.error("Error fetching data: ", error); // Bắt lỗi nếu xảy ra
        }
      };
      getListTutorials();
    }
    NProgress.done();
  }, [targetLessonID, action]);
  const handleSubmit = async (e) => {
    NProgress.start();
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_API_BACKEND_URL}/quiz`;
    try {
      if (action === "C") {
        await axios.post(`${apiUrl}`, questionData);
        setTimeout(() => {
          setToastSuccess(true);
        }, 1000); // Thời gian hiển thị toast
      }
      if (action === "U") {
        const updateData = {
          ...questionData,
          id: questionData._id,
        };
        console.log("updateData", updateData);
        await axios.put(`${apiUrl}`, updateData);
        setTimeout(() => {
          setToastSuccess(true);
        }, 1000); // Thời gian hiển thị toast
      }
    } catch (error) {
      console.error("Error submitting data: ", error); // Bắt lỗi khi gửi dữ liệu
    }
    NProgress.done();
  };

  return (
    <>
      {toastSuccess === true ? <ToastSuccess></ToastSuccess> : ""}
      <div className="exercise">
        <div className="breadcrumb">
          <div className="breadcrumb__wrap">
            <NavLink to="/admincodelab/home" className="breadcrumb__item">
              <p className="breadcrumb__name">Trang chủ</p>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/iconbread.svg`}
                alt=""
                className="breadcrumb__icon-arrow"
              />
            </NavLink>
            <NavLink to="/admincodelab/lesson" className="breadcrumb__item">
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
                Bạn muốn xóa câu hỏi này ?
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
        {action === "C" && (
          <button onClick={handleAddQuestion} className="exercise__add">
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/add.svg`}
              alt=""
              className="exercise__add--icon"
            />
            Thêm câu hỏi mới
          </button>
        )}
        {action === "C"
          ? questionData.questions.map((question, questionIndex) => (
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
                    value={question.questionName}
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
                    value={question.answersCorrect}
                    onChange={(e) =>
                      handleCorrectAnswerChange(e, questionIndex)
                    }
                    className="exercise__input"
                  />
                </div>
              </div>
            ))
          : action === "U" && questionData.length > 0
          ? questionData.map((item) => {
              return item.questions.map((question, questionIndex) => (
                <div
                  key={`question-${questionIndex}`}
                  className="exercise__wrap"
                >
                  <div key={questionIndex} className="exercise__question">
                    <label
                      htmlFor={`question-${questionIndex}`}
                      className="exercise__title"
                    >
                      Câu hỏi : {question.questionName}
                    </label>
                    <div className="exercise__action">
                      <button
                        onClick={() => {
                          setTargetQuiz(item._id);
                          setShowModel(true);
                        }}
                        className="exercise__button exercise__button--delete"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon/trash1.svg`}
                          alt=""
                          class="exercise__icon "
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ));
            })
          : "loading"}
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
