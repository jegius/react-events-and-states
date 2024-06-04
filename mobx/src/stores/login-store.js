import {action, makeObservable, observable} from 'mobx';

export class LoginStore {
  isShowRegistration = false;
  loginError = undefined;

  constructor() {
    makeObservable(this, {
      isShowRegistration: observable,
      loginError: observable,
      setIsShowRegistration: action,
      setLoginError: action,
    });
  }

  setIsShowRegistration(isShowRegistration) {
    this.isShowRegistration = isShowRegistration;
  }

  setLoginError(loginError) {
    this.loginError = loginError;
  }
}
