// С помощью этого компонента защищаем маршрут, чтобы обеспечить доступ к странице чата только авторизованным пользователям
import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};