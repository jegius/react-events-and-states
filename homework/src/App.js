import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RegAuthPage from "./pages/RegAuthPage";
import BaseLayout from "./components/BaseLayout/BaseLayout";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<RegAuthPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
