import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FrontendRoutes from './FrontendRoutes'
import DashboardRoutes from './DashboardRoutes'
import Login from './AuthenticationRoutes/Login/Login'
import Register from './AuthenticationRoutes/Register/Register'
import PrivateRouting from "./important/PraviateRouting"
import { useGobalContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'

export default function Index() {
    const { Authentication } = useGobalContext()
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<FrontendRoutes />} />
                <Route path="dashboard/*" element={<PrivateRouting Component={DashboardRoutes} />} />
                <Route path='/login' element={!Authentication ? <Login /> : <Navigate to='/dashboard' element={<DashboardRoutes />} />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}