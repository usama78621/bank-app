import React from 'react'
import { useGobalContext } from '../../context/UserContext'
import Login from '../AuthenticationRoutes/Login/Login'


const PraviateRouting = ({ Component }) => {
    const { Authentication } = useGobalContext()
    console.log(Authentication)
    if (!Authentication) {
        return <Login />
    }

    return <Component />
}

export default PraviateRouting