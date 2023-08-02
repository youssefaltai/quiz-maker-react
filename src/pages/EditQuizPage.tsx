import { useNavigate, useParams } from "react-router-dom";
import useQuizzes from "../hooks/quizzesHook";
import { useEffect, useState } from "react";
import Quiz from "../models/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

type EditQuizPageProps = {
  create: boolean;
};

type ImageUploadProps = {
  image?: string;
  uploadImage: () => void;
};

function ImageUpload({
  image,
  uploadImage,
}:
  ImageUploadProps) {
  return (
    <div
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      onClick={uploadImage}
    >
      <img
        src={
          image ?
            `data:image/jpg;base64,${image}` :
            "https://via.placeholder.com/200x100?text=Upload+Image"
        }
        alt="Uploaded Image"
        style={{ display: 'block', minHeight: '100px', minWidth: '100px', backgroundColor: 'lightgray' }}
      />
      <div
        className="image-upload-overlay"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
      </div>
    </div>
  );
}


export default function EditQuizPage({ create }: EditQuizPageProps) {
  const { quizId } = useParams<{ quizId: string }>();
  const { getQuiz, createQuiz, updateQuiz } = useQuizzes();
  const navigate = useNavigate();

  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();

  useEffect(() => {
    if (create) {
      const newQuiz = {
        id: "",
        name: "",
        question: "",
        answers: [],
        timer: 60,
        correctAnswer: 1
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
    if (res)
      navigate(`/admin`);
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
          <label htmlFor="quizTime">Time limit</label>
          <input
            type="number"
            name="quizTime"
            id="quizTime"
            placeholder="Time in seconds"
            value={currentQuiz?.timer || ""}
            onChange={(e) => setCurrentQuiz({
              ...currentQuiz!,
              timer: parseInt(e.target.value)
            })} />
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
                className="answer-list-item-correct"
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

