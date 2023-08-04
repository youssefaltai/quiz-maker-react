import QuizList from "../components/QuizList";
import QuizListItem from "../components/QuizListItem";
import useQuizzes from "../hooks/quizzesHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/authHook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type QuizListPageProps = {
  isAdmin: boolean;
  category: 'statics' | 'dynamics';
}

export default function QuizListPage({ isAdmin, category }: QuizListPageProps) {
  const { admin } = useAuth();
  const { quizzes, pageLimit, quizzesCount, fetchQuizzes, deleteMultipleQuizzes } = useQuizzes();
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes(page, category, (message) => {
      alert(message);
    });
  }, [page]);

  return (
    <div className="page admin-page">
      {
        admin && isAdmin && <h1>Manage Exams</h1>
      }
      <div className="header">
        <h1>
          {category === 'statics' ? " Statics" : " Dynamics"}
        </h1>
        {
          admin && isAdmin && (
            <>
              <div
                style={{
                  flexGrow: 1,
                }}
              />
              <button
                className="big-button"
                onClick={() => {
                  navigate("/new", { state: { category } });
                }}
              >
                <FontAwesomeIcon icon={faAdd} />
                <p>Create</p>
              </button>
              <button
                className="big-button red"
                onClick={() => {
                  if (selectedQuizzes.length > 0) {
                    if (window.confirm("Are you sure you want to delete these exams?")) {
                      deleteMultipleQuizzes(selectedQuizzes, (message) => {
                        alert(message);
                      }).then(() => {
                        setSelectedQuizzes([]);
                        fetchQuizzes(page, category, (message) => {
                          alert(message);
                        });
                      });
                    }
                  } else {
                    alert("No exams selected");
                  }
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
                Delete selected
              </button>

            </>
          )
        }
      </div>
      <QuizList>
        {
          quizzes.length === 0 && (
            <p>You have no exams</p>
          )
        }
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-list-item-container">
            {
              admin && isAdmin &&
              <label className="container">
                <input type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedQuizzes([...selectedQuizzes, quiz.id]);
                    } else {
                      setSelectedQuizzes(selectedQuizzes.filter((id) => id !== quiz.id));
                    }
                  }}
                />
                <span className="checkmark"></span>
              </label>
            }
            <QuizListItem quiz={quiz} admin={true && isAdmin} onDelete={() => {
              fetchQuizzes(page, category, (message) => {
                alert(message);
              });
            }} />
          </div>
        ))}
      </QuizList>
      <div className="pagination">
        <button
          className="big-button"
          disabled={page == 1}
          onClick={() => {
            if (page > 1) {
              setPage((prev) => prev - 1);
            }
          }} >
          <p>Previous</p>
        </button>
        <div className="page-number">
          <p>{page}</p>
        </div>
        <button
          className="big-button"
          disabled={quizzesCount / pageLimit <= page}
          onClick={() => {
            if (quizzesCount / pageLimit > page) {
              setPage((prev) => prev + 1);
            }
          }}
        >
          <p>Next</p>
        </button>
      </div>
    </div>
  );
}
