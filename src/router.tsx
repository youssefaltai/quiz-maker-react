import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditQuizPage from "./pages/EditQuizPage";
import QuizPage from "./pages/QuizPage";
import AdminPage from "./pages/AdminPage";
import QuizzesPage from "./pages/QuizzesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAuthPage from "./pages/AdminAuthPage";
import App from "./App";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "/admin",
        element: <ProtectedRoute><AdminPage /></ProtectedRoute>,
      },
      {
        path: "/new",
        element: <ProtectedRoute><EditQuizPage create={true} /></ProtectedRoute>,
      },
      {
        path: "/edit/:quizId",
        element: <ProtectedRoute><EditQuizPage create={false} /></ProtectedRoute>,
      },
      {
        path: "/auth",
        element: <AdminAuthPage />,
      },
      {
        path: "/quizzes",
        element: <QuizzesPage />,
      },
      {
        path: "/quiz/:quizId",
        element: <QuizPage />,
      },
    ]
  },
]);

