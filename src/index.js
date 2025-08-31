import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Commn/Home';
import Student_Res from './Commn/Student_Res';
import BookHostel from './Commn/BookHostel';
import Login from './Commn/Login';
import User from './Commn/User';
import PaymentPage from "./Commn/PaymentPage";
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageRooms from './admin/ManageRooms';
import ManageStudents from './admin/ManageStudents';


const root = ReactDOM.createRoot(document.getElementById('root'));
let allroutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Student_Res />,
      },
      {
        path: '/studentregistration',
        element: <Student_Res />
      },
      {
        path: '/bookhostel',
        element: <BookHostel />
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user",
        element: <User />
      },
      {
        path: "/payment",
        element: <PaymentPage />
      },
      {
        path: "/adminlogin",
        element: <AdminLogin />
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />
      }, 
      {
        path:"/manage-rooms",
        element:<ManageRooms/>
      },
      {
        path:"/manage-student",
        element:<ManageStudents/>
      }
    ]
  }
])
root.render(<RouterProvider router={allroutes} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
