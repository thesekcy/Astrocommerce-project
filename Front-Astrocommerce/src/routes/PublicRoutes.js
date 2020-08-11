import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { Context } from '../context/authContext';


function PublicRoute(props) {
  const { authenticated } = useContext(Context);
  
  return (
    authenticated
      ? <Redirect to="/" />
      : <Route {...props} />
  )
}
export default PublicRoute