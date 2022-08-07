import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { actionLogin, actionLogout, getAllBooks } from '../Redux/action';
import './main.css';
import '../index.css';
import Modal from './Modal';
import Profile from './Profile';
import Admin from './Admin';
import Room from './Room';
import Test from './Test';
import Chat from './Chat';

function Main() {
  const nav = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    fetch('/check')
      .then((res) => res.json())
      .then((res) => dispatch(actionLogin(res)));
  }, []);

  const [update, setUpdate] = useState(true);
  useEffect(() => {
    dispatch(getAllBooks());
  }, [update]);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const selector = (e) => {
    e.target.classList.toggle('selectedR');
    if (e.target.classList.contains('free')) {
      e.target.classList.add('freecb');
      e.target.classList.remove('free');
    } else if (e.target.classList.contains('freecb')) {
      e.target.classList.add('free');
      e.target.classList.remove('freecb');
    }
  };

  const { authuser } = useSelector((s) => s);

  const handleLogout = () => {
    fetch('/logout')
      .then(() => {
        dispatch(actionLogout());
        nav('/');
      })
      .catch(console.log);
  };

  const backgroundSmallText =
    '<div ref={disabledRoom} className={freeClasses.join()id={data.id} onClick={(e) => {console.log(e.target);selector(e); setOpen(prev => !prev); setDayId(daysArr.indexOf(getDay()))}}>{!open && <div onClick={(e) => e.stopPropagation()}><p onClick={(e) => e.stopPropagation()}> {data.name} </p></div>}{ open && <div className={openRoom}onClick={(e) => e.stopPropagation()}><h3 onClick={(e) => e.stopPropagation()}>{<} {data.name} {>}</h3><h4>{daysArr[dayId]}</h4>{booking.filter(el => (el.room_id == data.id) && (el.Day.day == daysArr[dayId]).map(el => <div className=allBooking> <div id={el.id} onClick={(e) => e.stopPropagation()}><img src=image/clock.svg/> <p>{el.time_start} - {el.time_end}</p><p>{el.Type.type}</p> {(el.User.name == authuser.name || authuser.role_id === 1) &&<button className=deleteBookonClick={(e) => {e.preventDefault();e.stopPropagation();deleteBooking(el.id);}}>отменить</button>}</div></div>)}';

  const backgroundText =
    'const ckecharr = booking.filter(el => el.day_id == form.day_id && el.room_id == form.room_id && (form.time_end >= el.time_start && form.time_end <= el.time_end || form.time_start >= el.time_start && form.time_start <= el.time_end || form.time_start >= el.time_start && form.time_end <= el.time_end || form.time_start < el.time_start && form.time_end > el.time_end)  )';

  const floor2a = [
    { class: 'teachersPhase3', name: 'TYPESCRIPT', id: '1' },
    { class: 'classroomPhase3', name: 'PHASE 3', id: '2' },
    { class: 'wardrobePhase3', name: 'ГАРДЕРОБ', id: '3' },
    { class: 'loungePhase1', name: 'ДИВАН', id: '4' },
    { class: 'meetingPhase3', name: 'RUST', id: '5' },
  ];
  const floor2b = [
    { class: 'wardrobePhase2', name: 'ГАРДЕРОБ', id: '6' },
    { class: 'classroomPhase2', name: 'PHASE 2', id: '7' },
    { class: 'kitchenPhase2', name: 'КУХНЯ', id: '8' },
    { class: 'loungePhase2', name: 'ДИВАН', id: '9' },
    { class: 'teachersPhase2', name: 'ШАБЛИ', id: '10' },
    { class: 'meetingPhase2', name: 'ПРЕПОДАВАТЕЛЬСКАЯ', id: '11' },
  ];
  const floor1 = [
    { class: 'classroom1', name: 'KOTLIN', id: '12' },
    { class: 'classroom2', name: 'PYTHON', id: '13' },
    { class: 'classroom3', name: 'ASSEMBLER', id: '14' },
    { class: 'kitchen1', name: 'КУХНЯ', id: '15' },
    { class: 'director', name: 'RUBY', id: '16' },
    { class: 'personal', name: 'GOLANG', id: '17' },
    { class: 'kitchen2', name: 'КУХНЯ', id: '18' },
  ];
  return (
    <div className="container">
      <Modal visible={modal} setVisible={setModal}>
        <Profile />
      </Modal>
      <Modal visible={modal2} setVisible={setModal2}>
        <Admin />
      </Modal>
      <Modal visible={modal3} setVisible={setModal3}>
        <Test setModal3={setModal3} setUpdate={setUpdate} />
      </Modal>
      <Modal visible={modal4} setVisible={setModal4}>
        <Chat setModal3={setModal4} />
      </Modal>

      <div className="navbar">
        <img src="https://my.elbrusboot.camp/logo.f88e8f75.svg" alt="logo" />
        <h1>Elbrus State</h1>
        {authuser && (
          <button className="logout" onClick={() => setModal4(true)}>
            Chat
          </button>
        )}
        {authuser && (
          // eslint-disable-next-line react/button-has-type
          <button className="profileName" onClick={() => setModal(true)}>
            {authuser.name}
          </button>
        )}
        {authuser && (
          <button className="logout" onClick={() => setModal3(true)}>
            Add Booking
          </button>
        )}
        {authuser?.role_id === 1 && (
          <button className="logout" onClick={() => setModal2(true)}>
            MANAGE USERS
          </button>
        )}
        {authuser && (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <div className="roomwrapper">
        <div className="phase3 floor">
          <h3>
            {'<'} 2 ЭТАЖ {'>'}
          </h3>
          {floor2a.map((el) => (
            <Room
              data={el}
              key={el.id}
              selector={selector}
              setModal4={setModal4}
            />
          ))}
          <div className="stockPhase3 room noclick">
            <p>СКЛАД</p>
          </div>
          <div className="womanRoomPhase3 room noclick">
            <p>WC woman</p>
          </div>
          <div className="manRoomPhase3 room noclick">
            <p>WC man</p>
          </div>
        </div>
        <marquee behavior="alternate" className="backgroundSmallString">
          {backgroundSmallText}
        </marquee>
        <marquee behavior="alternate" className="backgroundString">
          {backgroundText}
        </marquee>
        <div className="phase2 floor">
          <h3>
            {'<'} 2 ЭТАЖ {'>'}
          </h3>
          {floor2b.map((el) => (
            <Room
              data={el}
              key={el.id}
              selector={selector}
              setModal4={setModal4}
            />
          ))}
          <div className="manRoomPhase2 room noclick">
            <p>WC man</p>
          </div>
          <div className="stockPhase2 room noclick">
            <p>СКЛАД</p>
          </div>
          <div className="womanRoomPhase2 room noclick">
            <p>WC woman</p>
          </div>
        </div>
        <div className="firstFloor floor">
          <h3>
            {'<'} 1 ЭТАЖ {'>'}
          </h3>
          {floor1.map((el) => (
            <Room
              data={el}
              key={el.id}
              selector={selector}
              setModal4={setModal4}
            />
          ))}
          <div className="wc room noclick">
            <p>WC</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
