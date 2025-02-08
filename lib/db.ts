import { hashPassword } from "./crypto";

// Mock des utilisateurs pour le développement
const mockUsers = [
  {
    id: "9f77gs6r5nf",
    email: "admin@example.com",
    password: null, // Pas de mot de passe initial
    name: "Admin User",
    createdAt: "2025-02-08T17:07:35.485Z",
    theme: "light",
    isSuperAdmin: true,
    isAdmin: true,
    siteIds: ["1", "2", "3"]
  }
];

interface User {
  id: string;
  email: string;
  password: string | null;
  name?: string;
  createdAt: string;
  theme?: 'light' | 'dark' | 'system';
  isSuperAdmin?: boolean;
  isAdmin?: boolean;
  siteIds: string[];
}

class DB {
  private users: User[];

  constructor() {
    this.users = [...mockUsers];
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async findUsersBySiteId(siteId: string): Promise<User[]> {
    return this.users.filter(user => user.siteIds.includes(siteId));
  }

  async updateUserPassword(email: string, hashedPassword: string): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.email === email);
    if (userIndex === -1) return null;

    this.users[userIndex].password = hashedPassword;
    return this.users[userIndex];
  }

  async updateUserTheme(email: string, theme: 'light' | 'dark' | 'system'): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.email === email);
    if (userIndex === -1) return null;

    this.users[userIndex].theme = theme;
    return this.users[userIndex];
  }

  async createUser(data: { 
    email: string; 
    password?: string | null;
    name?: string;
    isSuperAdmin?: boolean;
    isAdmin?: boolean;
    siteIds: string[];
  }): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substring(2),
      email: data.email,
      password: data.password || null,
      name: data.name,
      createdAt: new Date().toISOString(),
      theme: 'light',
      isSuperAdmin: data.isSuperAdmin || false,
      isAdmin: data.isAdmin || false,
      siteIds: data.siteIds,
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async seed() {
    // La base de données est déjà initialisée avec les données de test
    return;
  }
}

export const db = new DB();