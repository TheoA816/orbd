import { createContext, useState } from "react"


export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState('');

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider