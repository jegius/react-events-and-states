import './Start.css';
import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {StoresContext} from '../../App';
import {canUserVote, handleStartStop} from '../../services/api';

export const Start = observer(() => {
  const {voteStore, userStore} = useContext(StoresContext);
  const isStarted = voteStore.isVoteStarted;

  const handleSubmit = async () => {
    const votes = await handleStartStop(isStarted);
    const canVote = await canUserVote(userStore.user);

    voteStore.setVotes(votes);
    userStore.setCanUserVote(canVote);
    voteStore.setIsVoteStarted(!isStarted);
  };

  return (
    <button onClick={handleSubmit} className={`start-button ${isStarted ? 'stop' : 'start'}`}>
      {isStarted ? 'stop' : 'start'}
    </button>
  );
});
