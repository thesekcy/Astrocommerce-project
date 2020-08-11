import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { Context } from '../context/authContext';


function UserRoute(props) {
  const { authenticated, typeUser } = useContext(Context);

  return (
    authenticated ?
      typeUser === "admin" ?
        <Redirect to="/admin/dashboard" />
        : typeUser === "editor" ?
          <Redirect to="/admin/dashboard" />
          : <Route {...props} />
      : <Redirect to="/" />
  )
}

export default UserRoute