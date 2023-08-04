import { useLocation, useNavigate, useParams } from "react-router-dom";
import useQuizzes from "../hooks/quizzesHook";
import { useEffect, useState } from "react";
import Quiz from "../models/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "../components/ImageUpload";

type EditQuizPageProps = {
  create: boolean;
};


export default function EditQuizPage({ create }: EditQuizPageProps) {
  const { quizId } = useParams<{ quizId: string }>();
  const { getQuiz, createQuiz, fetchQuizzes, updateQuiz } = useQuizzes();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();

  useEffect(() => {
    if (create) {
      const newQuiz: Quiz = {
        id: "",
        name: "",
        question: "",
        answers: [],
        correctAnswer: 1,
        category: location.state?.category || "dynamics",
      }
      setCurrentQuiz(newQuiz);
    } else {
      getQuiz(
        quizId || "",
        (message) => alert(message)
      ).then((quiz) => {
        setCurrentQuiz({
          ...quiz!,
          question: `${quiz?.question}`
        });
      });
    }
  }, []);

  const onSave = async () => {
    var res: Quiz | null = null;
    if (create) {
      res = await createQuiz(currentQuiz!, (message) => alert(message));
    }
    else {
      res = await updateQuiz(currentQuiz!, (message) => alert(message));
    }
    if (res) {
      await fetchQuizzes(1, res.category, (message) => alert(message));
      navigate(`/admin/${res.category}`);
    }
  }

  return (
    <div className="page edit-quiz-page">
      <div className="quiz-header">
        <h1>
          {create ? "Create a new " : "Edit "}
          Exam
        </h1>
        <button className="big-button"
          onClick={onSave}
        >
          <FontAwesomeIcon icon={faSave} size="lg" />
          <p>Save</p>
        </button>
      </div>
      <div className="row quiz-details-row">
        <div>
          <label htmlFor="quizName">Exam name</label>
          <input
            type="text"
            name="quizName"
            id="quizName"
            placeholder="Exam name"
            value={currentQuiz?.name || ""}
            onChange={(e) => setCurrentQuiz({
              ...currentQuiz!,
              name: e.target.value
            })} />
        </div>
        <div>
          <label htmlFor="quizCategory">Exam type</label>
          <select
            name="quizCategory"
            id="quizCategory"
            value={currentQuiz?.category}
            onChange={(e) => {
              setCurrentQuiz({
                ...currentQuiz!,
                category: (e.target.value as "statics" | "dynamics")
              })
            }}
          >
            <option value={"statics"}>
              Statics
            </option>
            <option value={"dynamics"}>
              Dynamics
            </option>
          </select>
        </div>
      </div>
      <h2>Question</h2>
      <ImageUpload
        image={currentQuiz?.question}
        uploadImage={() => {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/jpeg';
          fileInput.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            const file: File = (target.files as FileList)[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setCurrentQuiz({
                ...currentQuiz!,
                question: (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, "")
              });
            };
          };
          fileInput.click();
        }}
      />
      <div className="row">
        <h2>Answers</h2>
      </div>
      <div className="answer-list">
        {
          currentQuiz?.answers.length === 0 && (
            <p>You have not added any answers</p>
          )
        }
        {currentQuiz?.answers.map((answer, index) => (
          <div className="answer-list-item" key={index}>
            <button
              className="icon-button"
              onClick={() => {
                if (index === 0) return;
                setCurrentQuiz({
                  ...currentQuiz!,
                  answers: currentQuiz!.answers.map((a, i) => {
                    if (i === index - 1) {
                      return {
                        ...currentQuiz!.answers[index],
                        order: currentQuiz!.answers[index - 1].order
                      }
                    } else if (i === index) {
                      return {
                        ...currentQuiz!.answers[index - 1],
                        order: currentQuiz!.answers[index].order
                      }
                    } else {
                      return a;
                    }
                  })
                });
              }}
            >
              <FontAwesomeIcon icon={faArrowUp} size="lg" />
            </button>
            <button
              className="icon-button"
              onClick={() => {
                if (index === currentQuiz!.answers.length - 1) return;
                setCurrentQuiz({
                  ...currentQuiz!,
                  answers: currentQuiz!.answers.map((a, i) => {
                    if (i === index + 1) {
                      return {
                        ...currentQuiz!.answers[index],
                        order: currentQuiz!.answers[index + 1].order
                      }
                    } else if (i === index) {
                      return {
                        ...currentQuiz!.answers[index + 1],
                        order: currentQuiz!.answers[index].order
                      }
                    } else {
                      return a;
                    }
                  })
                });
              }}
            >
              <FontAwesomeIcon icon={faArrowDown} size="lg" />
            </button>
            <ImageUpload
              image={answer.answer}
              uploadImage={() => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/jpeg';
                fileInput.onchange = (e) => {
                  const target = e.target as HTMLInputElement;
                  const file: File = (target.files as FileList)[0];
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setCurrentQuiz({
                      ...currentQuiz!,
                      answers: currentQuiz!.answers.map((a, i) => {
                        if (i === index) {
                          return {
                            ...a,
                            answer: (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, "")
                          };
                        }
                        return a;
                      })
                    });
                  };
                };
                fileInput.click();
              }}
            />
            <div key={index}>
              <label
                className="container"
                htmlFor={`quizAnswer${index}`}
              >
                <input
                  type="radio"
                  name="quizAnswer"
                  value={index + 1}
                  id={`quizAnswer${index}`}
                  checked={currentQuiz!.correctAnswer === index + 1}
                  onChange={() => {
                    setCurrentQuiz({
                      ...currentQuiz!,
                      correctAnswer: index + 1
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <button
              className="icon-button"
              onClick={() => setCurrentQuiz({
                ...currentQuiz!,
                answers: currentQuiz!.answers.filter((_, i) => i !== index)
              })}
            >
              <FontAwesomeIcon icon={faTrash} color="red" size="lg" />
            </button>
          </div>
        ))}
      </div>
      <button className="big-button"
        onClick={() => setCurrentQuiz({
          ...currentQuiz!,
          answers: [
            ...currentQuiz!.answers,
            {
              order: currentQuiz!.answers.length + 1,
              answer: "",
            }
          ]
        })}
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
        <p>Add answer</p>
      </button>
    </div>
  );
}

