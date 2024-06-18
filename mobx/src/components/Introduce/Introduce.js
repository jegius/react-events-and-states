import React, {useContext} from 'react';
import {cyrillicToLatin, disableError} from '../helpers';
import './Introduce.css';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../../App';

export const Introduce = observer(() => {
  const {loginStore, userStore} = useContext(StoresContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userStore.userNameInputValue) {
      disableError((v) => loginStore.setLoginError(v));
      return;
    }

    userStore.setUser(cyrillicToLatin(userStore.userNameInputValue));
    loginStore.setIsShowRegistration(false);
    userStore.setUserNameInputValue('');
  };

  return (
    <>
      {!userStore.user && loginStore.isShowRegistration && (
        <div className="wrapper">
          <form className="introduce-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="input__label">
              Ваше имя:
              <input
                className={`input ${loginStore.loginError}`}
                name="user"
                type="text"
                value={userStore.userNameInputValue}
                onChange={({target}) => userStore.setUserNameInputValue(target.value.trim())}
              />
            </label>

            <div className="introduce-form__controls">
              <button className="button" type="submit">
                Представиться
              </button>

              <button className="button cancel" onClick={() => loginStore.setIsShowRegistration(false)}>
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
});
