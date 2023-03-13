export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    salt: string,
    refreshToken: string
}

export interface Stats {
    username: string,
    best_time: number,
    plays: number
}