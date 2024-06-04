import {observer} from 'mobx-react-lite';
import {useContext} from 'react';
import {StoresContext} from '../../App';
import {VoteItem} from '../VoteItem/VoteItem';

export const VoteItems = observer(() => {
  const {voteStore} = useContext(StoresContext);

  return (
    <>
      <div className="vote-root__full-counter">Всего голосов: {voteStore.allVotesCount}</div>

      <div className="vote-root__items">
        {voteStore.mappedVotes.map((item) => (
          <VoteItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
});
