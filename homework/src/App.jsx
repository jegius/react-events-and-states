import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/ChatPage";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { Loader } from "./components/Loader";


  
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
        fallbackElement={<Loader />} 
      />
      
    </>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
