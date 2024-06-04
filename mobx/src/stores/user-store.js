import {action, makeObservable, observable} from 'mobx';

export class UserStore {
  user = null;
  canUserVote = false;
  userNameInputValue = '';

  constructor() {
    makeObservable(this, {
      user: observable,
      canUserVote: observable,
      userNameInputValue: observable,
      setUser: action,
      setCanUserVote: action,
      setUserNameInputValue: action,
    });
  }

  setUser(user) {
    this.user = user;
  }

  setCanUserVote(canVote) {
    this.canUserVote = canVote;
  }

  setUserNameInputValue(value) {
    this.userNameInputValue = value;
  }
}
