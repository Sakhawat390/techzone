export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel {
    constructor(private userData: User) {}

    save() {
        // Logic to save user data to the database
    }

    static findById(userId: string): User | null {
        // Logic to find a user by ID in the database
        return null; // Placeholder return
    }

    static findByEmail(email: string): User | null {
        // Logic to find a user by email in the database
        return null; // Placeholder return
    }
}