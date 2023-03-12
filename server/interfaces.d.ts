export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    salt: string,
    refreshToken: string
}