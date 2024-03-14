import { useRef, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import BaseButton from "../BaseButton/BaseButton";
import BaseInput from "../BaseInput/BaseInput";

async function registerUser(username, password) {
  try {
    const req = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (req.status === 400) {
      return { message: `Пользователь ${username} уже зарегистрирован` };
    }

    return { message: `Пользователь ${username} успешно зарегистрирован` };
  } catch (error) {
    console.error(`Error - ${error.name}: ${error.message}`);
  }
}

async function login(username, password) {
  try {
    const req = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (req.status === 400)
      throw new Error(`Пароль или логин написан некорректно!`);

    const answ = await req.json();
    return answ;
  } catch (error) {
    console.error(`Error - ${error.name}: ${error.message}`);
  }
}

function RegAuth() {
  const user_Ref = useRef();
  const passwordRef = useRef();
  const [tab, setTab] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleTab(currentTab) {
    setTab(currentTab);
  }

  async function handleReg(e) {
    e.preventDefault();
    setMessage("");
    const {
      current: { value: password },
    } = passwordRef;

    const {
      current: { value: user },
    } = user_Ref;
    if (!password || !user) return;
    const answer = await registerUser(user, password);

    setMessage(answer.message);
  }

  async function handleLog(e) {
    e.preventDefault();

    const {
      current: { value: password },
    } = passwordRef;

    const {
      current: { value: user },
    } = user_Ref;

    if (!user || !password) return;
    setMessage("");
    const key = await login(user, password);
    console.log(key);
    if (!key) {
      console.log("first");
      setMessage(`Пароль или логин написан некорректно!`);
      return;
    }
    dispatch(setToken(key.token));
    dispatch(setUser(user));
    navigate("/chat");
  }

  return (
    <div>
      {!tab && (
        <>
          <BaseButton
            onClickProp={handleTab.bind({}, "reg")}
            text={"Регистрация 👤"}
          />
          <BaseButton
            onClickProp={handleTab.bind({}, "log")}
            text={"Авторизация 💼"}
          />
        </>
      )}
      {tab === "reg" ? (
        <form onSubmit={handleReg} className="form-reg">
          <BaseButton
            onClickProp={handleTab.bind({}, "log")}
            text={"Авторизация ⬅️"}
          />

          <h2 className="title">Регистрация</h2>
          <BaseInput baseName={"Никнейм"} innerRef={user_Ref} />
          <BaseInput
            baseName={"Пароль"}
            innerRef={passwordRef}
            type="password"
          />
          <BaseButton baseType="submit" text={"Зарегистрироваться"} />
          <p className="form-message">{message}</p>
        </form>
      ) : tab === "log" ? (
        <form onSubmit={handleLog} className="form-reg">
          <BaseButton
            onClickProp={handleTab.bind({}, "reg")}
            text={"Регистрация ⬅️"}
          />
          <h2 className="title">Авторизация</h2>
          <BaseInput innerRef={user_Ref} baseName={"Никнейм"} />
          <BaseInput innerRef={passwordRef} baseName={"Пароль"} />
          <BaseButton baseType="submit" text={"Выполнить"} />
          <p className="form-message">{message}</p>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default RegAuth;
