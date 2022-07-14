import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../config/Firebase-uitles";
const AppContext = createContext();


const AppProvider = ({ children }) => {
    const [Authentication, setAuthenticationRoutes] = useState(false)
    const [user, setUser] = useState({})
    const [isLoader, setIsloader] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                setUser(user)
                setAuthenticationRoutes(true)
            } else {
                setAuthenticationRoutes(false)
                setUser({})
            }
            setIsloader(false)
        })
    }, [])

    return (
        <AppContext.Provider value={{
            Authentication,
            setAuthenticationRoutes,
            user,
            isLoader
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }