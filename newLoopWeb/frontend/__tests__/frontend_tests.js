import { render, fireEvent, screen } from '@testing-library/react';
import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';

// Test 1: SignIn Component - Ensure the user can type in the input fields
test('renders SignIn component and allows type username and password', () => {
    render(<SignIn />);
    // Test if user can type username
    const usernameInput = screen.getByPlaceholderText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    expect(usernameInput.value).toBe('testUser');
    
    // Test if user can type password
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    expect(passwordInput.value).toBe('testPassword');
});

// Test 2: SignUp Component - Ensure the user can type in the input fields
test('renders SignUp component and allows type username and password', () => {
    render(<SignUp />);
    // Test if user can type username
    const usernameInput = screen.getByPlaceholderText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    expect(usernameInput.value).toBe('testUser');
    
    // Test if user can type password
    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    expect(passwordInput.value).toBe('testPassword');
});
