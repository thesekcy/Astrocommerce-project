import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { Context } from '../context/authContext';


function AdminRoute(props) {
  const { authenticated, typeUser } = useContext(Context);

  return (
    authenticated ?
      typeUser === "admin" ?
        <Route {...props} />
        : typeUser === "editor" ?
          <Route {...props} />
          : <Redirect to="/" />
      : <Redirect to="/" />
  )
}
export default AdminRoute