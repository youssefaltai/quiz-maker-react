import { useNavigate, useParams } from "react-router-dom";
import useQuizzes from "../hooks/quizzesHook";
import Quiz from "../models/quiz";
import { useEffect, useRef, useState } from "react";
import { exportAsImage } from "../utils";


export default function QuizPage() {
  const { quizId } = useParams();
  const { answerQuiz, getQuiz } = useQuizzes();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();
  const [currentAnswer, setCurrentAnswer] = useState<number | null>();
  const exportRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getQuiz(
      quizId || "",
      (message) => alert(message)
    ).then((quiz) => {
      if (quiz) {
        setCurrentQuiz(quiz);
      } else {
        alert("Quiz not found");
        navigate('/quizzes');
      }
    });
  }, [quizId, getQuiz]);

  return (
    <div className="page quiz-page" ref={exportRef}>
      <h1>{currentQuiz?.name}</h1>
      <img
        src={`
        data:image/jpeg;base64,${currentQuiz?.question}`}
        alt={"Question image"}
      />
      <div className="answer-list">
        {currentQuiz?.answers.map((answer, index) => (
          <div
            className="answer-list-item"
            key={index}>
            <label
              htmlFor={`${answer.order}`}
              className="answer-list-item-label"
            >
              <img
                src={`
              data:image/jpeg;base64,${answer.answer}`}
                alt={"Answer image"}
                style={{
                  border: currentAnswer === answer.order ? "5px solid #2563EB" : "none"
                }}
              />
            </label>
            <input
              hidden
              type="radio"
              name="answer"
              id={`${answer.order}`}
              value={answer.order}
              onChange={(e) => {
                setCurrentAnswer(Number(e.target.value));
              }}
            />
          </div>
        ))}
      </div>
      <button
        className="big-button"
        disabled={!currentAnswer}
        onClick={() => {
          if (!currentQuiz) return;
          exportAsImage(exportRef.current!).then((screenshot) => {
            answerQuiz(
              currentQuiz.id ?? "",
              currentAnswer ? currentAnswer : 0,
              screenshot,
              (message) => alert(message)
            ).then(() => {
              navigate('/quizzes');
            });
          });
        }}
      >
        Submit
      </button>
    </div>
  );
}
