import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, sendMessage, resetChat } from '../features/chat/chatSlice';
import { logout } from '../features/auth/authSlice';
import { VirtualConfigContext } from '../virtual/VirtualContext';
import VirtualList from '../virtual/VirtualList';

export default function ChatPage() {
  const dispatch = useDispatch();
  const { messages } = useSelector(s => s.chat);
  const { login } = useSelector(s => s.auth);
  const [text, setText] = useState('');
  const [banner, setBanner] = useState('');

  useEffect(() => {
    if (localStorage.getItem('regOK')) {
      setBanner('Successful registration!');
      localStorage.removeItem('regOK');
      setTimeout(()=>setBanner(''), 2500);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchChats());
    const id = setInterval(() => dispatch(fetchChats()), 3000);
    return () => clearInterval(id);
  }, [dispatch]);

  const renderLine = useCallback((m, i) => {
    const name = m.user ?? m.login ?? m.author ?? m.username ?? m.userName ?? m.sender ?? m.owner ?? m.name ?? login;
    const body = m.message ?? m.body ?? m.text ?? m.content ?? '';
    return (
      <div key={i} className="msg-line">
        <span className="msg-author">{name}:</span>
        <span className="msg-text">{String(body)}</span>
      </div>
    );
  }, [login]);

  const send = async () => {
    const msg = text.trim();
    if (!msg) return;
    await dispatch(sendMessage(msg));
    setText('');
  };

  return (
    <>
      <div className="nav">
        <div className="nav-inner">
          <div className="brand">Global Chat</div>
          <div className="row">
            <div className="badge">Вы: <b>{login}</b></div>
            <button className="btn btn-ghost" onClick={() => { dispatch(logout()); dispatch(resetChat()); }}>
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="card panel">
          {banner && <div className="banner-ok">{banner}</div>}

          <h3 className="list-title">Глобальный чат</h3>

          <VirtualConfigContext.Provider value={{ itemHeight: 28, overscan: 6 }}>
            <VirtualList items={messages} renderItem={renderLine} height={420} />
          </VirtualConfigContext.Provider>

          <div className="row" style={{marginTop:12}}>
            <input
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Сообщение…"
              onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
              style={{flex:1}}
            />
            <button className="btn" onClick={send}>Отправить</button>
          </div>
        </div>
      </div>
    </>
  );
}
