import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  return (
    localStorage.getItem('authorized_user')
    ? children
    : <Navigate to="/signin" />
  )
}
