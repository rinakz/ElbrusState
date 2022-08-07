import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookingThunk } from '../Redux/action';
import './Profile.css';

const Profile = () => {

  const dispatch = useDispatch()

  const { authuser } = useSelector(s=>s)
  const { booking } = useSelector(s=>s)

  function getDay() {
    return new Date().toLocaleString('ru', {weekday: 'long'})
  }

  function getHour() {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    return `${hour}:${minute}`
  }

  const deleteBooking = (id) => {
    dispatch(deleteBookingThunk(id));
  };

  return (
  <div className="profile">
    <h3>My bookings:</h3>
    {booking.filter(el => el.User.name == authuser?.name ).sort((a, b) => (a.Day.id - b.Day.id))
    .map(el => <div key={el.id} className='bookItem' onClick={(e) => e.stopPropagation()}>
      <div className="myday bookS">
        <img src="image/calendar.svg" alt="cal" />
        <p>{el.Day.day}</p>
      </div>
      <div className="mytime bookS">
        <img src='image/clock.svg' alt='clock'/>
        <p>{el.time_start} - {el.time_end}</p>
      </div>
      <div className="myloc bookS">
        <img src='image/location.svg' alt='loc'/>
        <p>{el.Room.title}</p>
      </div>
      <div className="mytype bookS">
        <p>{el.Type.type}</p>
      </div>
      <div className="mycomm bookS">
        <p>{el.comment}</p>
      </div>
      <button className='deleteBook'
          onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteBooking(el.id);
        }}
        >
          отменить
          </button>
    </div>)}

    </div>
  )
}

export default Profile
