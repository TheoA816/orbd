export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    salt: string,
    refreshToken: string
}