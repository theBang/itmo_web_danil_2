import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import moment from 'moment';

const App = () => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  const socket = useRef();

  const onSubmit = e => {
    e.preventDefault();

    const message = text.trim();
    let username = name.trim();

    if (!message) {
      return;
    }

    if (!username) {
      username = "Unassigned";
    }

    socket.current.emit('messages', username, message);
    setText('');
    document.querySelector('form').scrollIntoView(false);
  }

  useEffect(() => {
    socket.current = io(window.location.host, { transports: ['websocket'] });

    socket.current.on('messages', messages => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      
      setMessages(prevMessage => prevMessage.concat(messages));
      document.querySelector('form').scrollIntoView(false);
    })
  }, []);

  useEffect(() => {
    const listener = () => {
      const messageId = messages.length ? messages[messages.length - 1].id : null;

      socket.current.emit('getMessages', messageId);
    }

    socket.current.on('connect', listener);

    return () => socket.current.removeListener('connect', listener);
  }, [messages]);

  return (
    <div>
      <input type="radio" id="contactChoice1"
       name="contact" value="email"/>
      <label for="contactChoice1">Комната 1</label>

      <input type="radio" id="contactChoice2"
       name="contact" value="phone"/>
      <label for="contactChoice2">Комната 2</label>

      <input type="radio" id="contactChoice3"
       name="contact" value="room2"/>
      <label for="contactChoice3">Комната 3</label>
      <form onSubmit={onSubmit}>
        {messages.map(({ id, username, text, createdAt }) => (
          <div className="message" key={id}>
            <div>
              <strong>{username}: </strong>
              {text}
              <span className="timestamp">{moment(createdAt).format('hh:mm')}</span>
            </div>
          </div>
        ))}
        <input class="form-message" value={text} placeholder="Введите сообщение и Enter" onChange={e => setText(e.target.value)} />      
      </form>
      <input value={name} placeholder="Введите Имя" onChange={e => setName(e.target.value)} class="name"/>
    </div>
  )
}

export default App;
