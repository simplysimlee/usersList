export interface User {
    id: number;
    displayName: string;
    givenName: string;
    mail: string;
    details: string;
    
}

export interface UserObject {
    users: User[];
}
