import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsersThunk } from '../Redux/action';

function Admin() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  // useEffect(() => {
  //   fetch('/auth')
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.role_id !== 1) nav('/');
  //     });
  // }, []);

  const { user } = useSelector((state) => state);

  const [value, setValue] = useState('');

  const changeRole = (id, roleId) => {
    if (roleId === 1) {
      roleId = 2;
    } else {
      roleId = 1;
    }
    fetch(`/admin/allusers/${id}/${roleId}`, {
      method: 'PUT',
    }).then((res) => {
      dispatch(getAllUsersThunk());
    });
  };

  const deleteUser = (id) => {
    fetch(`/admin/allusers/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      dispatch(getAllUsersThunk());
    });
  };

  return (
    <div>
      <form className="adminForm">
        <h2>Users</h2>
        <div className="Search">
          <p>
            <input
              placeholder=" Имя и Фамилия"
              type="text"
              name="name"
              value={value}
              onChange={(e) => setValue((prev) => e.target.value)}
            />
          </p>
        </div>
        {user
          ?.filter((el) => (value ? el.name.includes(value) : true))
          .map((el) =>
            el.role_id === 1 ? (
              <div
                style={{ border: '2px solid #FABA5A' }}
                className="adminCont"
                key={el.id}
              >
                <p style={{ color: '#FABA5A' }}>{el.name}</p>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    changeRole(el.id, el.role_id);
                  }}
                >
                  make student
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteUser(el.id);
                  }}
                >
                  delete user
                </button>
              </div>
            ) : (
              <div
                style={{ border: '2px solid #66EEFB' }}
                className="adminCont"
                key={el.id}
              >
                <p style={{ color: '#66EEFB' }}>{el.name}</p>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    changeRole(el.id, el.role_id);
                  }}
                >
                  make admin
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteUser(el.id);
                  }}
                >
                  delete user
                </button>
              </div>
            )
          )}
      </form>
    </div>
  );
}

export default Admin;
