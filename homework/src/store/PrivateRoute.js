// С помощью этого компонента защищаем маршрут, чтобы обеспечить доступ к странице чата только авторизованным пользователям
import React from "react";
import { useSelector } from "react-redux"; // Хук для доступа к состоянию Redux.
import { Route, Navigate } from "react-router-dom"; // Компоненты для управления маршрутизацией.

export const PrivateRoute = ({ children, ...rest }) => { 
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Route 
      {...rest} // Любые другие пропы, которые передаются в `PrivateRoute`. 
      render={(props) => // Функция, которая определяет, что будет отображаться в зависимости от `currentUser`:
        currentUser ? children : <Navigate to="/login" /> // Если пользователь найден, то переходим к чату, иначе на страницу авторизации
      } 
    />
  );
};
   
