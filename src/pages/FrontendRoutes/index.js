import React from 'react'
import Home from './Home'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header'
import Footers from './components/Footers/Footers'

const Index = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path='/'>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </main>
            <Footers />
        </>
    )
}

export default Index