import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import App from './screens/App.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UserProvider from './context/UserProvider.jsx'
import NotFound from './screens/NotFound.jsx'
import Authentication, {AuthenticationMode} from './screens/Authentication.jsx'

const router = createBrowserRouter([
  {
    errorElement: <NotFound/>,
    children:  [
      {
        path: "/signin",
        element: <Authentication authenticationMode={AuthenticationMode.SignIn}/>
      },
      {
        path: "/signup",
        element: <Authentication authenticationMode={AuthenticationMode.SignUp}/>
      },
      {
        element: <ProtectedRoute/>,
        children: [
          {
            path: "/",
            element: <App/>
          }
        ]
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router = {router}/>
    </UserProvider>
  </StrictMode>,
)
