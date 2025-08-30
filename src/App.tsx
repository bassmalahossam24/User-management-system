
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'
import UsersList from './Components/UsersList/UsersList'
import AddUser from './Components/AddUser/AddUser'
import { ToastContainer } from 'react-toastify'

function App() {
 
   const routes = createBrowserRouter([
    {path : '/' , element:<AuthLayout/> ,
      errorElement : <NotFound/> ,
    children :[
      {index : true , element:<Login/>},
      {path : 'login' , element:<Login/>}
    ]
     } ,
     {path : 'dashboard', element: <MasterLayout/>  ,
      errorElement : <NotFound/> ,
      children : [
        {index : true , element:<Home/>},
        {path : 'home' , element:<Home/>},
        {path : 'profile' , element:<Profile/>},
        {path : 'users-list' , element:<UsersList/>},
        {path : 'add-user' , element: <AddUser/>}
      ]



     }
     ,
   ])
  return (
    <>
    <ToastContainer position="top-center" />
      <RouterProvider router={routes} >

      </RouterProvider>
    </>
  )
}

export default App
