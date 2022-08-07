import React, { useEffect, useCallback, useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const socket = new WebSocket('wss://elbrus-state.herokuapp.com/');

function Chat() {
  const [val, setVal] = useState('');
  const [mess, setMess] = useState([]);
  const [connect, setConnect] = useState(true);
  const { authuser } = useSelector((s) => s);

  useEffect(() => {
    socket.onopen = (e) => {
      console.log('connection');
      console.log(authuser);
    };

    socket.onmessage = (event) => {
      console.log(event, '====');
      const comment = JSON.parse(event.data);
      console.log(comment);
      setMess((prev) => [...prev, comment]);
    };

    socket.onclose = function (event) {
      console.log('closed');
    };
    // return () => {} close connection
  }, []);


if (connect) {
    if (authuser.name) {
      socket.send(
        JSON.stringify({ type: 'join', payload: ['подключается к чату', authuser.name] })
      );
      setConnect(false)
    }
}

const chatref = useRef()
useEffect(() => {
  chatref.current.scrollTop =chatref.current.scrollHeight;
},[mess])

  return (
    <div  className="chat">
      <div ref={chatref} className="messcontainer">
      {mess.map((el) => (
        <div className="messItem">
          <div className="userMess" id={el[0].includes('подключается к чату') ? 'newuser' : 'usernam'}>{el[1]}{el[0].includes('подключается к чату') ? '_' : ':'}</div>
          <div className="messMess" id={el[0].includes('подключается к чату') ? 'newuser' : 'usermsg'}>{el[0]}</div>
        </div>
      ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.send(
            JSON.stringify({ type: 'formData', payload: [val, authuser.name] })
          );
          console.log('submit');
          setVal('');
        }}
      >
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Chat;
