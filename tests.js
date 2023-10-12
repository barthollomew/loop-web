import { render, screen, fireEvent } from '@testing-library/react';
import SignInPage from './components/SignInForm/SignInForm';
import SignUpPage from './components/SignUpForm/SignUpForm';
import ProfilePage from './components/Profile/ProfilePage/ProfilePage';

// 1. Test Sign In Page - Ensuring elements exist
test('renders sign in form elements', () => {
  render(<SignInPage />);
  
  // Purpose: Ensure that the Sign In form has both username and password fields
  const usernameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  
  expect(usernameField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
});

// 2. Test Sign Up Page - Ensuring elements exist
test('renders sign up form elements', () => {
  render(<SignUpPage />);
  
  // Purpose: Ensure that the Sign Up form has email, password, and confirm password fields
  const usernameField = screen.getByLabelText(/confirm username/i);
  const emailField = screen.getByLabelText(/email/i);
  const passwordField = screen.getByLabelText(/password/i);
  
  expect(usernameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
});

// 3. Test Profile Page - Display user details
test('renders user details on profile page', () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com"
  };

  render(<ProfilePage user={user} />);

  // Purpose: Ensure that the user's name and email are displayed correctly on the profile page
  const nameElement = screen.getByText(user.name);
  const emailElement = screen.getByText(user.email);

  expect(nameElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
});

// 4. Test Profile Management - Change email
test('allows user to change email', () => {
  // Mock user data and a mock function for updating the email
  const user = {
    name: "John Doe",
    email: "john@example.com"
  };
  const updateUserEmail = jest.fn();

  render(<ProfilePage user={user} onUpdateEmail={updateUserEmail} />);

  // Purpose: Test if the function to update email is called when the user tries to change their email
  const emailField = screen.getByLabelText(/email/i);
  fireEvent.change(emailField, { target: { value: 'newjohn@example.com' } });
  const updateButton = screen.getByText(/update email/i);
  fireEvent.click(updateButton);

  expect(updateUserEmail).toHaveBeenCalledWith('newjohn@example.com');
});

// 5. Test Sign Up Page - Password and confirm password match
test('checks if password and confirm password fields match during sign up', () => {
  render(<SignUpPage />);

  // Purpose: Ensure that the password fields are 'strong' before allowing user registration
  const passwordField = screen.getByLabelText(/password/i);
  const signUpButton = screen.getByText(/sign up/i);

  fireEvent.change(passwordField, { target: { value: 'password123' } });
  fireEvent.click(signUpButton);

  // Assuming there's a function or method that shows an error message when passwords don't match
  const errorMessage = screen.getByText(/passwords do not match/i);

  expect(errorMessage).toBeInTheDocument();
});

