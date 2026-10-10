-- Create admin user with username and password
-- Run this in Supabase SQL editor

-- First, check if admin exists and update
UPDATE users 
SET username = 'admin', password = 'Hello@1785' 
WHERE role = 'Admin';

-- If no admin exists, create one
INSERT INTO users (name, email, role, username, password)
VALUES ('Shubham Rathi', 'shubham@anrasolutions.com', 'Admin', 'admin', 'Hello@1785')
ON CONFLICT (email) DO UPDATE SET username = 'admin', password = 'Hello@1785';
