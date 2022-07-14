import React from 'react'
import Sidebar from './components/Sidebar/Siderbar'
import Dashboard from './Home/Dashboard'
import { useState } from 'react'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import AddAccounts from './components/AddAccounts/AddAccounts'
import Accounts from './Accounts/Accounts'

const Index = (props) => {
    const [toggled, setToggled] = useState(false);
    const [rtl, setRtl] = useState(false);
    const handleToggleSidebar = (value) => {
        setToggled(value)
    };
    return (
        <div className='App' toggled={toggled}>
            <Sidebar rtl={rtl}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
            />
            <section>
                <Header handleToggleSidebar={handleToggleSidebar} />
                <Routes>
                    <Route path='/'>
                        <Route index element={<Dashboard />} />
                        <Route path='account' element={<AddAccounts />} />
                        <Route path='accounts' element={<Accounts />} />
                    </Route>
                </Routes>
                <div className="app-content ">
                    {props.children}
                </div>
            </section>

        </div>
    )
}

export default Index