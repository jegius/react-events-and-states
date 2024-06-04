import {observer} from 'mobx-react-lite';
import {AddForm} from '../AddForm/AddForm';
import {VoteItems} from '../VoteItems/VoteItems';
import React, {useContext, useEffect} from 'react';
import {fetchData} from '../../services/api';
import {StoresContext} from '../../App';

export const VoteContent = observer(() => {
  const {userStore, voteStore} = useContext(StoresContext);

  useEffect(() => {
    const fetchContent = async () => {
      const [votes, isStarted, canVote] = await fetchData(userStore.user);
      voteStore.setVotes(votes);
      voteStore.setIsVoteStarted(isStarted);
      userStore.setCanUserVote(canVote);
    };

    const intervalId = window.setInterval(() => {
      fetchContent();
    }, 500);

    return () => {
      return window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="vote-root">
      <AddForm />

      <VoteItems />
    </div>
  );
});
