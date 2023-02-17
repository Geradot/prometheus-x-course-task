import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
  return localStorage.getItem('username') ? children : <Navigate to="/signin" /> 
}
