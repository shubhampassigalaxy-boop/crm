-- Update admin password to Hello@1785
-- Run this in Supabase SQL editor

-- First, check if admin user exists
-- If admin exists, update password
UPDATE users 
SET password = 'Hello@1785' 
WHERE role = 'Admin';

-- If no admin exists, create one
INSERT INTO users (name, email, role, username, password)
SELECT 'Admin', 'admin@anrasolutions.com', 'Admin', 'admin', 'Hello@1785'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE role = 'Admin');
