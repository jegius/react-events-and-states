import {observer} from 'mobx-react-lite';
import React, {useContext} from 'react';
import {StoresContext} from '../../App';

export const EntryForm = observer(() => {
  const {loginStore} = useContext(StoresContext);

  return (
    <div className="registration-error">
      Невозможно принять участие без регистрации!
      <button className="button" onClick={() => loginStore.setIsShowRegistration(true)}>
        Зарегистрироваться
      </button>
    </div>
  );
});
