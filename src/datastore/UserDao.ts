import { User } from "../interface";

export interface UserDao {
  signup(user: User): void; // createUser
  login(email: string, password: string): User | undefined;
  getUsers(): User[];
  getUserByEmail(email: string): User | undefined;
}

// POST /api/users/register
// POST /api/users/login
// GET /api/users/logout
// GET /api/users/me`
// PUT /api/users/me
// PUT /api/users/me/password
