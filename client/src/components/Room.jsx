import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingThunk } from '../Redux/action';

function Room({ data, selector, setModal4 }) {
  const disabledRoom = useRef();

  const rootClasses = ['room', data.class];
  const freeClasses = ['free', 'room', data.class];

  const daysArr = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница'];

  const dispatch = useDispatch();

  const { booking } = useSelector((s) => s);
  const { authuser } = useSelector((s) => s);

  const [open, setOpen] = useState(false);
  const [dayId, setDayId] = useState(daysArr.indexOf(getDay()));

  const deleteBooking = (id) => {
    dispatch(deleteBookingThunk(id));
  };

  function getDay() {
    return new Date().toLocaleString('ru', { weekday: 'long' });
  }
  function getHour() {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    return `${hour}:${minute}`;
  }

  function bookingFilter() {
    return booking.filter(
      (el) =>
        el.room_id == data.id &&
        el.time_start <= getHour() &&
        el.time_end > getHour() &&
        el.Day.day == getDay()
    );
  }

  function bookingFilterNoBusy() {
    return booking.filter(
      (el) =>
        el.room_id == data.id &&
        el.time_start > getHour() &&
        el.Day.day == getDay()
    )[0]?.time_start;
  }

  return bookingFilter().length > 0 ? (
    <div
      className={rootClasses.join(' ')}
      id={data.id}
      onClick={(e) => {
        console.log(e.target);
        selector(e);
        setOpen((prev) => !prev);
        setDayId(daysArr.indexOf(getDay()));
      }}
    >
      {!open && (
        <div onClick={(e) => e.stopPropagation()}>
          <p onClick={(e) => e.stopPropagation()}> {data.name} </p>
          <div className="busy">занято</div>
          {bookingFilter().map((el) => (
            <p onClick={(e) => e.stopPropagation()}>
              {el.Type.type} до{' '} 
              {el.time_end}
            </p>
          ))}
        </div>
      )}
      {open && (
        <div className="openRoom" onClick={(e) => e.stopPropagation()}>
          <h3 onClick={(e) => e.stopPropagation()}>
            {'<'} {data.name} {'>'}
          </h3>
          <h4>{daysArr[dayId]}</h4>
          {booking
            .filter(
              (el) => el.room_id == data.id && el.Day.day == daysArr[dayId]
            )
            .map((el) => (
              <div key={el.id} className="allBooking">
                <div id={el.id} onClick={(e) => e.stopPropagation()}>
                  <img src="image/clock.svg" />
                  <p style={{fontSize: '8px', borderBottom: '1px solid #66EEFB' }} className="openClock">
                    {el.time_start}-{el.time_end}
                  </p>
                  <p className="openType">{el.Type.type}</p>
                  <p className="openComment">{el.comment}</p>
                  <h6 className="openUser">{el.User.name}</h6>
                  {(el.User.name == authuser.name ||
                    authuser.role_id === 1) && (
                    <button
                      className="deleteBook"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteBooking(el.id);
                      }}
                    >
                      отменить
                    </button>
                  )}
                </div>
              </div>
            ))}
          <img
            onClick={() => setModal4(true)}
            src="image/chat.svg"
            className="chatImg"
          />
          <div>
            {' '}
            {dayId > 0 && (
              <button
                className="navigButt left"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  {
                    setDayId((prev) => prev - 1);
                  }
                }}
              >
                <b>{'<'}</b>
              </button>
            )}
            {dayId < 4 && (
              <button
                className="navigButt right"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  {
                    setDayId((prev) => prev + 1);
                  }
                }}
              >
                <b>{'>'}</b>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      ref={disabledRoom}
      className={freeClasses.join(' ')}
      id={data.id}
      onClick={(e) => {
        console.log(e.target);
        selector(e);
        setOpen((prev) => !prev);
        setDayId(daysArr.indexOf(getDay()));
      }}
    >
      {!open && (
        <div onClick={(e) => e.stopPropagation()}>
          <p onClick={(e) => e.stopPropagation()}> {data.name} </p>
          {bookingFilterNoBusy() ? (
            <div>
              <div className="notbusy" style={{ color: 'green' , fontSize: '15px'}}>
                свободно
              </div>
              <p onClick={(e) => e.stopPropagation()}>
                до {bookingFilterNoBusy()}
              </p>
            </div>
          ) : (
            true
          )}
        </div>
      )}
      {open && (
        <div className="openRoom" onClick={(e) => e.stopPropagation()}>
          <h3 onClick={(e) => e.stopPropagation()}>
            {'<'} {data.name} {'>'}
          </h3>
          <h4>{daysArr[dayId]}</h4>
          {booking
            .filter(
              (el) => el.room_id == data.id && el.Day.day == daysArr[dayId]
            )
            .map((el) => (
              <div className="allBooking">
                <div id={el.id} onClick={(e) => e.stopPropagation()}>
                  <img src="image/clock.svg" />
                  <p style={{fontSize: '8px', borderBottom: '1px solid #66EEFB' }}  className="openClock">
                    {el.time_start} - {el.time_end}
                  </p>
                  <p className="openType">{el.Type.type}</p>
                  <p className="openComment">{el.comment}</p>
                  <h6 className="openUser">{el.User.name}</h6>
                  {(el.User.name == authuser.name ||
                    authuser.role_id === 1) && (
                    <button
                      className="deleteBook"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteBooking(el.id);
                      }}
                    >
                      отменить
                    </button>
                  )}
                </div>
              </div>
            ))}
          <img
            onClick={() => setModal4(true)}
            src="image/chat.svg"
            className="chatImg"
          />
          <div>
            {' '}
            {dayId > 0 && (
              <button
                className="navigButt left"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  {
                    setDayId((prev) => prev - 1);
                  }
                }}
              >
                <b>{'<'}</b>
              </button>
            )}
            {dayId < 4 && (
              <button
                className="navigButt right"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  {
                    setDayId((prev) => prev + 1);
                  }
                }}
              >
                <b>{'>'}</b>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
