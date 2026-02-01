export interface UserPayload {
    sub: number;
    email: string;
    userName: string;
    role: 'ADMIN' | 'USER' | 'LAWYER';
}
