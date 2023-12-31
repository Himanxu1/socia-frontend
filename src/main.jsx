import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Bookmarks from './components/Bookmarks.jsx'
import { Provider } from 'react-redux'
import store from './utils/store.js'
import Profile from './components/Profile.jsx'
import Explore from './pages/Explore.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Notification from './pages/Notification.jsx'


const appRouter = createBrowserRouter([

  {
    path:'/',
    element:<Login/>,

  },
  {
    path:'/signup',
    element:<SignUp/>
  },
  {
    path:'/app',
    element:<App/>,
    children:[
     
      {
        path:'/app/home',
        element: <Home/> 
      },
      {
        path:'/app/bookmarks',
        element:<Bookmarks/>
      },
      {
        path:'/app/profile',
        element:<Profile/>
      },
      {
        path:'/app/explore',
        element:<Explore/>
      },
      {
        path:'/app/profile/:id',
        element:<UserProfile/>
      },
      {
        path:'/app/notification',
        element:<Notification/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>,
)
