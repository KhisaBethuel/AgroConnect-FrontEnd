import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Login from '../Login'; // Adjust path as needed

describe('Login', () => {
  let setIsLoggedIn;

  beforeEach(() => {
    setIsLoggedIn = vi.fn();
  });

  test('renders the login form correctly', () => {
    render(<Login setIsLoggedIn={setIsLoggedIn} />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
  });

  test('displays email validation error when email is invalid and input is blurred', () => {
    render(<Login setIsLoggedIn={setIsLoggedIn} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('displays password validation error when password is less than 8 characters and input is blurred', () => {
    render(<Login setIsLoggedIn={setIsLoggedIn} />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  test('does not allow form submission if email or password is invalid', () => {
    render(<Login setIsLoggedIn={setIsLoggedIn} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Invalid email and password
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    fireEvent.click(submitButton);

    expect(setIsLoggedIn).not.toHaveBeenCalled();
  });

  test('enables form submission when email and password are valid', () => {
    render(<Login setIsLoggedIn={setIsLoggedIn} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Valid email and password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    expect(setIsLoggedIn).toHaveBeenCalledWith(true);
  });

  test('toggles password visibility when the eye icon is clicked', () => {
    render(<Login setIsLoggedIn={setIsLoggedIn} />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    // Initially, password type should be 'password'
    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(toggleButton);
    // After clicking, password type should be 'text'
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(toggleButton);
    // After clicking again, password type should be 'password'
    expect(passwordInput.type).toBe('password');
  });
});
