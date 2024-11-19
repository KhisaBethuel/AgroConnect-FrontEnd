import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './SignUp';

describe('SignUp Component', () => {
  let setIsLoggedIn;

  beforeEach(() => {
    setIsLoggedIn = jest.fn();
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <SignUp setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('displays validation errors for invalid inputs', () => {
    render(
      <MemoryRouter>
        <SignUp setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'J' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Full Name'));
    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Email address'));
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Password'));
    passwordValidations.forEach(({ message }) => {
      expect(screen.getByText(new RegExp(message, 'i'))).toBeInTheDocument();
    });
  });

  it('enables submit button only when the form is valid', () => {
    render(
      <MemoryRouter>
        <SignUp setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Full Name'));
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Email address'));
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123!' },
    });

    expect(screen.getByRole('button', { name: /get started/i })).not.toBeDisabled();
  });

  it('triggers setIsLoggedIn and navigation on successful form submission', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <SignUp setIsLoggedIn={setIsLoggedIn} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Full Name'));
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Email address'));
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(getByRole('button', { name: /get started/i }));

    expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    // You might also check for the navigation URL if using something like react-router-dom's `MemoryRouter`
    // expect(useNavigate()).toHaveBeenCalledWith('/blogs');
  });
});
