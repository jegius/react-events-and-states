import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { ChatPage } from "./pages/ChatPage";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { MessageForm } from "./components/MessageForm";
import { MessageList } from "./components/MessageList";
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
        // loader={chatLoader}
        fallbackElement={<Loader />} 
      >
          <Route element={<MessageList />}  /> {/* Компонент с историей чата */}
          <Route element={<MessageForm />}  /> {/* Компонент формой отправки сообщений */}
      </Route>
      
    </>
  )
);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
