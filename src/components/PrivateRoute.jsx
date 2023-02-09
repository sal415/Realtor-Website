import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
// useAuthStatus has to be in {} because we are returning two things from there login chekingstat

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus()
    if (checkingStatus){
        return <h3>Loading...</h3>
    }
    return loggedIn ? <Outlet/> :  <Navigate to='/sign-in'/>
}
