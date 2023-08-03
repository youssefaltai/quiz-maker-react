import { Outlet, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditQuizPage from "./pages/EditQuizPage";
import QuizPage from "./pages/QuizPage";
import AdminPage from "./pages/AdminPage";
import QuizzesPage from "./pages/QuizzesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAuthPage from "./pages/AdminAuthPage";
import App from "./App";
import QuizListPage from "./pages/QuizListPage";

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
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <AdminPage />
          },
          {
            path: '/admin/statics',
            element: <QuizListPage isAdmin={true} category={'statics'} />
          },
          {
            path: '/admin/dynamics',
            element: <QuizListPage isAdmin={true} category={'dynamics'} />
          },
        ]
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
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <QuizzesPage />
          },
          {
            path: '/quizzes/statics',
            element: <QuizListPage isAdmin={false} category={'statics'} />
          },
          {
            path: '/quizzes/dynamics',
            element: <QuizListPage isAdmin={false} category={'dynamics'} />
          },
        ]
      },
      {
        path: "/quiz/:quizId",
        element: <QuizPage />,
      },
    ]
  },
]);

