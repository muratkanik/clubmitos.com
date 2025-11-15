-- This migration helps you set up an admin user
-- After running this, you need to update the email to match your actual user

-- First, create a function to make a user admin by email
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS void AS $$
BEGIN
  UPDATE users 
  SET role = 'admin' 
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION make_user_admin(TEXT) TO authenticated;

-- Example usage (uncomment and replace with your email):
-- SELECT make_user_admin('your-email@example.com');

-- Or you can directly update if you know the user exists:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
