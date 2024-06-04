import { useEffect } from 'react';
import { Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_CURRENTUSER } from './store/actions';
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/ChatPage";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";

const router = createBrowserRouter( 
  createRoutesFromElements( 
    <> 
      {/* Главная страница */}
      <Route 
        index element={<MainPage />}
      />

      {/* Страница регистрации */}
      <Route 
        path="registration" 
        element={<Registration />} 
      />

      {/* Страница авторизации */}
      <Route 
        path="login" 
        element={<Login />} 
      />

      {/* Cтраница с чатом */}
      <Route
        path="chat" 
        element={<ChatPage />} 
      />
    </>
  )
);

function App() {

  const dispatch = useDispatch();
  const nagitation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user'); 
    if (user) { 
        const userData = JSON.parse(user); 
        if (userData.token) { 
          dispatch({ type: SET_CURRENTUSER, payload: userData }); 
          nagitation('/chat');
        }
    }

  }, [dispatch, nagitation]);

  <Router>
    <RouterProvider router={router} />
  </Router>
}

export default App;
