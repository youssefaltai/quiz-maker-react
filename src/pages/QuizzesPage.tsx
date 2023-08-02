import QuizList from "../components/QuizList";
import QuizListItem from "../components/QuizListItem";
import useQuizzes from "../hooks/quizzesHook";

export default function QuizzesPage() {
  const { quizzes } = useQuizzes();

  return (
    <div className="page quizzes-page">
      <h1>Exams</h1>
      <QuizList>
        {
          quizzes.length === 0 && (
            <p>No quizzes found</p>
          )
        }
        {quizzes.map((quiz) => (
          <QuizListItem key={quiz.id} quiz={quiz} admin={false} />
        ))}
      </QuizList>
    </div>
  );

}
