import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

import history from '../history';

const Context = createContext();

function AuthProvider({ children }) {

  const [authenticated, setAuthenticated] = useState(false);
  const [typeUser, setTypeUser] = useState('user');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token');

    if (token) {
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/me',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      async function verifyUser() {
        let response = await Axios(config);
        console.log(response.data)
        if (response.data.status === "Token is Invalid" || response.data.status === "Token is Expired" || response.data.status == "Authorization Token not found") {
          localStorage.removeItem('token');
          setAuthenticated(false);
          setLoading(false)
          history.push('/')
        } else {
          setTypeUser(response.data.type);
          setUserId(response.data.id);
          setUser(response.data);
          setAuthenticated(true);
          setLoading(false)
        }

      }
      verifyUser()
    } else {
      setAuthenticated(false);
      setLoading(false)
      history.push('/')
    }
  }, [])

  function handleLogout() {
    setLoading(true);
    const token = localStorage.getItem('token');

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/logout',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Axios(config)
      .then(function (response) {
        setLoading(false);
        localStorage.removeItem('token');
        setAuthenticated(false);
        setUser('')
        setTypeUser('');
        setUserId('');
        setLoading(false)
        // history.push('/');
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

  function handleLogin(values) {
    const url = 'http://127.0.0.1:8000/api/auth/login'

    let dados = {
      email: values.email,
      password: values.password,
    }

    Axios.post(url, dados)
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data.access_token).replace(/"/, ''));
        setAuthenticated(true);

        history.push('/')
      })
      .catch((error) => {
        console.log('ERRO: ', error.response)
      });
  }

  if (!loading) {
    return (
      <Context.Provider value={{ authenticated, handleLogin, handleLogout, setAuthenticated, typeUser, setTypeUser, userId, user }}>
        {children}
      </Context.Provider>
    )
  } else {
    return <></>
  }
}
export { Context, AuthProvider };