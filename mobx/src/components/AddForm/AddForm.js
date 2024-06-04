import React, {useContext} from 'react';
import './AddForm.css';
import {Start} from '../Start/Start';
import {disableError} from '../helpers';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../../App';
import {postItem} from '../../services/api';

export const AddForm = observer(() => {
  const {voteStore} = useContext(StoresContext);
  const isStarted = voteStore.isVoteStarted;
  const inputValue = voteStore.addVoteFormValue;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue) {
      disableError((v) => voteStore.setAddVoteFormError(v));
      return;
    }

    const votes = await postItem(inputValue);

    voteStore.setVotes(votes);
    voteStore.setAddVoteFormValue('');
  };

  return (
    <div className="add-form__wrapper">
      {!isStarted && (
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            className={`input ${voteStore.addVoteFormError}`}
            type="text"
            value={inputValue}
            onChange={({target}) => voteStore.setAddVoteFormValue(target.value.trim())}
          />

          <button className="button" type="submit">
            Добавить на голосование
          </button>
        </form>
      )}

      <Start />
    </div>
  );
});
