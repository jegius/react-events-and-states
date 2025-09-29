import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/auth/authSlice';

export default function AuthPage() {
  const dispatch = useDispatch();
  const { status } = useSelector(s=>s.auth);
  const [mode, setMode] = useState('login');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [uiError, setUiError] = useState('');
  const [okMsg, setOkMsg] = useState('');

  const disabled = status === 'loading';

  const handleLogin = async () => {
    setUiError(''); setOkMsg('');
    try { await dispatch(loginUser({ login, password })).unwrap(); }
    catch (e) { setUiError(`Error: ${e?.message || 'Login failed'}`); }
  };

  const handleRegister = async () => {
    setUiError(''); setOkMsg('');
    try {
      await dispatch(registerUser({ login, password })).unwrap();
      setOkMsg('Successful registration!');
      localStorage.setItem('regOK','1');
    } catch (e) {
      if (e?.status === 400) setUiError('Error: The user exists. Enter a new name.');
      else setUiError(`Error: ${e?.message || 'Registration failed'}`);
    }
  };

  const onSubmit = () => mode === 'login' ? handleLogin() : handleRegister();

  return (
    <>
      <div className="nav">
        <div className="nav-inner">
          <div className="brand">Global Chat</div>
          <div className="badge">React + RTK</div>
        </div>
      </div>

      <div className="container">
        <div className="card panel" style={{maxWidth:520, margin:'40px auto'}}>
          <div className="row" style={{marginBottom:12}}>
            <button className={`btn-ghost btn`} style={{opacity: mode==='login'?1:.7}} onClick={()=>{setMode('login'); setUiError(''); setOkMsg('');}}>Вход</button>
            <button className={`btn-ghost btn`} style={{opacity: mode==='register'?1:.7}} onClick={()=>{setMode('register'); setUiError(''); setOkMsg('');}}>Регистрация</button>
          </div>

          <h2 style={{margin:'0 0 14px'}}> {mode==='login' ? 'Вход' : 'Регистрация'} </h2>

          <label>Логин</label>
          <input className="input" value={login} onChange={e=>setLogin(e.target.value)} placeholder="login" style={{margin:'6px 0 12px'}}/>
          <label>Пароль</label>
          <input className="input" value={password} type="password" onChange={e=>setPassword(e.target.value)} placeholder="password" style={{margin:'6px 0 16px'}}/>

          <div className="row">
            <button className="btn" disabled={disabled} onClick={onSubmit}>
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </div>

          {!!uiError && <div style={{color:'#ff3b30', marginTop:12}}>{uiError}</div>}
          {!!okMsg && <div className="banner-ok">{okMsg}</div>}
          {disabled && <div style={{opacity:.8, marginTop:12}}>Загрузка…</div>}
        </div>
      </div>
    </>
  );
}
