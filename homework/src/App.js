import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/userSlice";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      // Если есть сохраненный токен, то сразу логиним пользователя
      dispatch(login(JSON.parse(cachedUser)));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;