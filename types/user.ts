export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  theme?: 'light' | 'dark' | 'system';
  isSuperAdmin: boolean;
  isAdmin: boolean;
  siteIds: string[];
}