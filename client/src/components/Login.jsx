import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { actionLogin } from '../Redux/action';

function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const [login, setLogin] = useState(true);
  const toggle = function (e) {
    e.preventDefault();
    setLogin((prev) => !prev);
  };

  const authHeader = useRef();

  const loginSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(actionLogin(res));
        nav('/main');
      })
      .catch(console.log)
      .finally(() => {
        setForm({});
        e.target.reset();
      });
  };
  const regSubmit = (e) => {
    e.preventDefault();
    fetch('/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(actionLogin(res));
        nav('/main');
      })
      .catch(console.log)
      .finally(() => {
        setForm({});
        e.target.reset();
      });
  };

  const authGithub = () => {
    window.open('/auth/github', '_self');
  };

  useEffect(() => {
    const getUser = () => {
      fetch('/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          console.log('resObject: ', resObject);
          fetch('/login', {
            method: 'post',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(resObject.user),
          })
            .then((res) => res.json())
            .then((res) => {
              dispatch(actionLogin(res));
              nav('/main');
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div className="loginContainer">
      <div className="navbar">
        <img src="https://my.elbrusboot.camp/logo.f88e8f75.svg" alt="logo" />
        <h1>Elbrus State</h1>
      </div>
      <div className="video-container">
        <video className="video" autoPlay muted playsInline loop>
          <source src="/video/arctic.mp4" type="video/mp4" />
        </video>
        <div className="video-bg" />
        {login ? (
          <form className="AuthForm" onSubmit={regSubmit}>
            <h2 ref={authHeader}>Sign Up</h2>
            <p type="Name:">
              <input
                type="text"
                name="name"
                value={form.name || ''}
                onChange={handleChange}
              />
            </p>
            <p type="Email:">
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
              />
            </p>
            <p type="Password:">
              <input
                type="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
              />
            </p>
            <div className="authBtns">
              <button className="simplesign" type="submit">Submit</button>
              <button
                className="simplesign"
                onClick={(e) => {
                  toggle(e);
                  authHeader.current.classList.toggle('authtoggle');
                }}
              >
                Sign In
              </button>
              <div className="gitauth"
                onClick={(e) => {
                  e.preventDefault()
                  authGithub()
                }}
              >
              <div className="gitlogo"></div>
              <div className="whitewr"></div>
              <div className="gittext">Sign in with GitHub</div>
              </div>
            </div>
          </form>
        ) : (
          <form className="AuthForm" onSubmit={loginSubmit}>
            <h2 ref={authHeader}>Sign In</h2>
            <p type="Email:">
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
              />
            </p>
            <p type="Password:">
              <input
                type="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
              />
            </p>
            <div className="authBtns">
              <button className="simplesign" type="submit">Submit</button>
              <button
                className="simplesign"
                onClick={(e) => {
                  toggle(e);
                  authHeader.current.classList.toggle('authtoggle');
                }}
              >
                Sign Up
              </button>
              <div className="gitauth"
                onClick={(e) => {
                  e.preventDefault()
                  authGithub()
                }}
              >
              <div className="gitlogo"></div>
              <div className="whitewr"></div>
              <div className="gittext">Sign in with GitHub</div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
