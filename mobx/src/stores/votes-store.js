import {action, computed, makeObservable, observable} from 'mobx';

export class VotesStore {
  votes = [];
  isVoteStarted = false;
  addVoteFormValue = '';
  addVoteFormError = '';

  constructor() {
    makeObservable(this, {
      votes: observable,
      isVoteStarted: observable,
      addVoteFormValue: observable,
      addVoteFormError: observable,
      allVotesCount: computed,
      mappedVotes: computed,
      setVotes: action,
      setIsVoteStarted: action,
      setAddVoteFormValue: action,
      setAddVoteFormError: action,
    });
  }

  get allVotesCount() {
    return this.votes.reduce((prev, curr) => prev + curr.voted.length, 0);
  }

  get mappedVotes() {
    return this.votes.map((vote) => {
      const voteUsersSet = new Set();

      vote.voted.forEach((user) => {
        voteUsersSet.add(user);
      });

      const voteCount = vote.voted.length;
      return {...vote, percent: vote.voted.length ? (voteCount / this.allVotesCount) * 100 : 0, voteCount, voteUsersSet};
    });
  }

  setVotes(votes) {
    this.votes = votes;
  }

  setIsVoteStarted(isVoteStarted) {
    this.isVoteStarted = isVoteStarted;
  }

  setAddVoteFormValue(value) {
    this.addVoteFormValue = value;
  }

  setAddVoteFormError(error) {
    this.addVoteFormError = error;
  }
}
