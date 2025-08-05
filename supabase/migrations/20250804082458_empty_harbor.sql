/*
  # Create users table for admin dashboard

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `role` (text, default 'user')
      - `status` (text, default 'active')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read all user data
    - Add policy for authenticated users to update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'user',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Insert sample data
INSERT INTO users (email, first_name, last_name, role, status) VALUES
  ('john.doe@example.com', 'John', 'Doe', 'admin', 'active'),
  ('jane.smith@example.com', 'Jane', 'Smith', 'user', 'active'),
  ('mike.johnson@example.com', 'Mike', 'Johnson', 'moderator', 'active'),
  ('sarah.wilson@example.com', 'Sarah', 'Wilson', 'user', 'inactive'),
  ('david.brown@example.com', 'David', 'Brown', 'user', 'active'),
  ('lisa.davis@example.com', 'Lisa', 'Davis', 'moderator', 'active'),
  ('chris.miller@example.com', 'Chris', 'Miller', 'user', 'active'),
  ('emma.garcia@example.com', 'Emma', 'Garcia', 'user', 'inactive'),
  ('alex.martinez@example.com', 'Alex', 'Martinez', 'admin', 'active'),
  ('olivia.lopez@example.com', 'Olivia', 'Lopez', 'user', 'active'),
  ('ryan.anderson@example.com', 'Ryan', 'Anderson', 'user', 'active'),
  ('sophia.taylor@example.com', 'Sophia', 'Taylor', 'moderator', 'active'),
  ('james.thomas@example.com', 'James', 'Thomas', 'user', 'inactive'),
  ('ava.jackson@example.com', 'Ava', 'Jackson', 'user', 'active'),
  ('william.white@example.com', 'William', 'White', 'user', 'active'),
  ('isabella.harris@example.com', 'Isabella', 'Harris', 'admin', 'active'),
  ('benjamin.martin@example.com', 'Benjamin', 'Martin', 'user', 'active'),
  ('mia.thompson@example.com', 'Mia', 'Thompson', 'user', 'inactive'),
  ('lucas.garcia@example.com', 'Lucas', 'Garcia', 'moderator', 'active'),
  ('charlotte.martinez@example.com', 'Charlotte', 'Martinez', 'user', 'active'),
  ('henry.robinson@example.com', 'Henry', 'Robinson', 'user', 'active'),
  ('amelia.clark@example.com', 'Amelia', 'Clark', 'user', 'active'),
  ('alexander.lewis@example.com', 'Alexander', 'Lewis', 'admin', 'active'),
  ('harper.lee@example.com', 'Harper', 'Lee', 'user', 'inactive'),
  ('sebastian.walker@example.com', 'Sebastian', 'Walker', 'user', 'active');