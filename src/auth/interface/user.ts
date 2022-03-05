export interface UserRequest {
    accessToken: string;
    userId: string;
    email: string;
    username: string;
    roles: Promise<string[]>;
    newsletter: boolean;
}
