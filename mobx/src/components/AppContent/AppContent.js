import {observer} from 'mobx-react-lite';
import {useContext} from 'react';
import {EntryForm} from '../EntryForm/EntryForm';
import {VoteContent} from '../VoteContent/VoteContent';
import {StoresContext} from '../../App';
import {Introduce} from '../Introduce/Introduce';

export const AppContent = observer(() => {
  const {userStore} = useContext(StoresContext);

  return userStore.user ? (
    <VoteContent />
  ) : (
    <>
      <Introduce />

      <EntryForm />
    </>
  );
});
