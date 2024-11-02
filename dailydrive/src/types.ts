export type User = {
    id: number; 
    username: string; 
    password: string; 
    firstName?: string | null; 
    lastName?: string | null; 
    registrationDate?: Date; 
}

export type UserApiReturn = {
    data?: User | User[] | null; 
    error?: MyError | null; 
}

export type UserLoginApiReturn = {
    token: string | null; 
    error?: MyError | null; 
}

export type MyError = {
    error?: boolean; 
    message?: string; 
}