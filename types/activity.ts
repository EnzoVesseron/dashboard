export interface Activity {
  id: string;
  userId: string;
  action: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface ActivityWithUser extends Activity {
  user: {
    name: string;
    email: string;
  };
}