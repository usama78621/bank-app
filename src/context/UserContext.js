import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../config/Firebase-uitles";
const AppContext = createContext();


const AppProvider = ({ children }) => {
    const [Authentication, setAuthenticationRoutes] = useState(false)
    const [userid, setUserid] = useState('')
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserid(uid)
                setAuthenticationRoutes(true)
            } else {
                setAuthenticationRoutes(false)
                setUserid("")
            }
        }, [])
    });

    return (
        <AppContext.Provider value={{
            Authentication,
            setAuthenticationRoutes,
            userid
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }