import { createContext, ReactNode, useState } from "react"

type auth = {
    accessToken: string,
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
}

type providerProps = {
    children?: ReactNode;
}

export const AuthContext = createContext<auth>({} as auth);

const AuthProvider = ({ children }: providerProps) => {

  const [accessToken, setAccessToken] = useState('');

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider