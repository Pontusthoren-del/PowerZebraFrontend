export interface SignupForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface LoginResponse {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}

export interface CurrentUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
