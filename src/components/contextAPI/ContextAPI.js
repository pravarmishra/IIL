
//NOT USING IN CODE

import { useState,  createContext } from 'react'

const initialState ={
    token:'',
    loggedIn:'',
    user:'',
    email:'',
    onAuthUserChanged: '',
    onUserChange: '',
    history: '',
    loading: false


}
export const  AuthContext = createContext()
function AuthContextProvider({ children }) {


    const [auth, setAuth]= useState(initialState)


    return (
        <AuthContext.Provider value={{  auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;