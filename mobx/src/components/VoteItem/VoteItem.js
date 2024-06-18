import React, {useContext} from 'react';
import './VoteItem.css';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../../App';
import {removeItem, voteItem} from '../../services/api';

export const VoteItem = observer(({item}) => {
  const {userStore, voteStore} = useContext(StoresContext);
  const isStarted = voteStore.isVoteStarted;
  const isCanVote = userStore.canUserVote;
  const user = userStore.user;
  const selected = item.voteUsersSet.has(user);

  const remove = async () => {
    const votes = await removeItem(item.id);
    voteStore.setVotes(votes);
  };

  const vote = async () => {
    const {data, ok} = await voteItem(item.id, user);

    if (ok) {
      voteStore.setVotes(data);
    }

    userStore.setCanUserVote(false);
  };

  return (
    <div className={`vote ${selected ? '_selected' : ''}`}>
      <div className="vote__back-line" style={{right: `${-100 + item.percent}%`}}></div>

      {!isStarted && <span className="vote__counter">{item.voteCount}</span>}

      <div className="vote__bubble">{item.name}</div>

      <button
        className={`button ${isStarted ? '' : 'remove'}`}
        onClick={isStarted ? vote : remove}
        disabled={!isCanVote && isStarted}
      >
        {isStarted ? 'Проголосовать' : 'Удалить'}
      </button>
    </div>
  );
});
