/*
  # Create users table with authentication

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password` (text)
      - `name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Insert test user
INSERT INTO users (id, email, password, name)
VALUES (
  gen_random_uuid(),
  'admin@example.com',
  '$2a$10$NRw7Dks0j9U8bFHk0F/Y7.kXh.qHxLB1wqxQ3XKvZ5uHvB0Q5Rnmy', -- password123
  'Admin User'
) ON CONFLICT (email) DO NOTHING;