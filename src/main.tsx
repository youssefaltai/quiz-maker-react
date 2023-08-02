import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import QuizzesProvider from './providers/QuizzesProvider'
import AuthProvider from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QuizzesProvider>
      <RouterProvider router={router} />
    </QuizzesProvider>
  </AuthProvider>
)
