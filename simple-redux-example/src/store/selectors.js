export const selectItems = store => store.items;
export const selectIsStarted = store => store.isStarted;
export const selectUser = store => store.user;
export const selectShowRegistration = store => store.isShowRegistration;
export const selectIsCanVote = store => store.isCanVote;
export const selectAllVotedForItem = (store, itemId) => store.items.find(({id}) => id === itemId)?.voted ?? [];
export const selectVotedCounterForItem = (store, itemId) => selectAllVotedForItem(store, itemId).length ?? 0;
export const isSelected = (store, itemId, user) => selectAllVotedForItem(store, itemId).includes(user);
export const allVotes = (store) => store?.items?.reduce((result, {voted}) => result + voted.length, 0) ?? 0;
export const selectPercentByAll = (store, {voted}) => voted.length ? (voted.length / allVotes(store)) * 100 : 0;