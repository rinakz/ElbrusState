import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../Redux/action';
import './Test.css';

function Test({ setModal3, setUpdate }) {
  const { booking } = useSelector((s) => s);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const [form, setForm] = useState({
    day_id: '1',
    room_id: '1',
    comment: '',
    type_id: '1',
    time_start: '00:00',
    time_end: '12:00',
  });
  const handleChangeRoom = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleChangeDay = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleChangeComment = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleChangeTimeStart = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleChangeTimeEnd = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleChangeType = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const daysArr = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница'];

  function getDay() {
    return new Date().toLocaleString('ru', { weekday: 'long' });
  }
  function getHour() {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    return `${hour}:${minute}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form.day_id, daysArr.indexOf(getDay()) + 1);
    const ckecharr = booking.filter(
      (el) =>
        el.day_id == form.day_id &&
        el.room_id == form.room_id &&
        ((form.time_end > el.time_start && form.time_end <= el.time_end) ||
          (form.time_start >= el.time_start &&
            form.time_start < el.time_end) ||
          (form.time_start >= el.time_start && form.time_end <= el.time_end) ||
          (form.time_start < el.time_start && form.time_end > el.time_end))
    );
    if (
      ckecharr.length ||
      (form.time_start < getHour() &&
        form.day_id == daysArr.indexOf(getDay()) + 1)
    ) {
      return console.log('Error');
    }
    fetch('/booking', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    }).then((res) => console.log(res));

    setModal3(false);
    setForm({
      day_id: '1',
      room_id: '1',
      comment: 'comment',
      type_id: '1',
      time_start: '00:00',
      time_end: '12:00',
    });
    setUpdate((prev) => !prev);
  };

  return (
    <div className="Booking">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Booking</h2>
        <p type="Room:">
          <select
            type="text"
            value={form.room_id || ''}
            name="room_id"
            onChange={handleChangeRoom}
          >
            <option value="1">TYPESCRIPT</option>
            <option value="2">PHASE 3</option>
            <option value="3">ГАРДЕРОБ (3 фаза)</option>
            <option value="4">ДИВАН (3 фаза)</option>
            <option value="5">RUST</option>
            <option value="6">ГАРДЕРОБ (2 фаза)</option>
            <option value="7">PHASE 2</option>
            <option value="8">КУХНЯ (2 этаж)</option>
            <option value="9">ДИВАН (2 фаза)</option>
            <option value="10">ШАБЛИ</option>
            <option value="11">ПРЕПОДАВАТЕЛЬСКАЯ</option>
            <option value="12">KOTLIN</option>
            <option value="13">PYTHON</option>
            <option value="14">ASSEMBLER</option>
            <option value="15">КУХНЯ (1 этаж бар)</option>
            <option value="16">RUBY</option>
            <option value="17">GOLANG</option>
            <option value="18">КУХНЯ (1 этаж)</option>
          </select>
        </p>

        <p type="Day:">
          <select
            type="text"
            value={+form.day_id || ''}
            name="day_id"
            onChange={handleChangeDay}
          >
            <option value="1">понедельник</option>
            <option value="2">вторник</option>
            <option value="3">среда</option>
            <option value="4">четверг</option>
            <option value="5">пятница</option>
          </select>
        </p>

        <p type="Comment:">
          <input
            type="text"
            value={form.comment || ''}
            name="comment"
            onChange={handleChangeComment}
          />
        </p>
        <p type="Time start:">
          <input
            type="text"
            value={form.time_start || ''}
            name="time_start"
            onChange={handleChangeTimeStart}
          />
        </p>
        <p type="Time end:">
          <input
            type="text"
            value={form.time_end || ''}
            name="time_end"
            onChange={handleChangeTimeEnd}
          />
        </p>

        <p type="Type:">
          <select
            type="text"
            value={form.type_id || ''}
            name="type_id"
            onChange={handleChangeType}
          >
            <option value="1">stand-up</option>
            <option value="2">лекция</option>
            <option value="3">покушать</option>
            <option value="4">поиграть в теннис</option>
            <option value="5">поиграть в кикер</option>
            <option value="6">йога</option>
            <option value="7">поспать</option>
            <option value="8">групповой проект</option>
            <option value="9">самоподготовка</option>
            <option value="10">код-ревью</option>
            <option value="11">собеседование</option>
            <option value="12">встреча с выпускником</option>
            <option value="13">день открытых дверей</option>
            <option value="14">настольные игры</option>
            <option value="15">другое</option>
          </select>
        </p>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Test;
