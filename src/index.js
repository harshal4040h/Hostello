import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Commn/Home';
import Student_Res from './Commn/Student_Res';
import BookHostel from './Commn/BookHostel';
import H from './Commn/H';


const root = ReactDOM.createRoot(document.getElementById('root'));
let allroutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children  : [
      {
        path :'/',
        element: <Home/>,
      },
      {
        path: '/studentregistration',
        element:<Student_Res/>
      },
      {
        path: '/bookhostel',
        element: <BookHostel/>
      }
    ]
  }
])
root.render(<RouterProvider router={allroutes} />);
<H/>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
