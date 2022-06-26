import {createContext, useContext, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState({name: 'User'});
    return <AuthContext.Provider value={{loggedUser, setLoggedUser}}>
        {children}
    </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext);
}