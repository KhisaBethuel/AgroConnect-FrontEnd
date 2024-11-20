import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock the useNavigate hook from react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Mock fetch API
global.fetch = vi.fn();

describe('ProfilePage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders profile page with profile info', () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Eng Terry Otieno')).toBeInTheDocument();
    expect(screen.getByText('Followers: 0')).toBeInTheDocument();
    expect(screen.getByText('Following: 0')).toBeInTheDocument();
  });

  test('opens followers modal and fetches followers', async () => {
    const mockFollowers = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockFollowers),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Followers: 0'));
    
    // Check if modal is displayed
    expect(screen.getByText('Followers')).toBeInTheDocument();

    // Wait for the followers to be loaded
    await waitFor(() => screen.getByText('John Doe'));
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('opens following modal and fetches following', async () => {
    const mockFollowing = [{ name: 'Alice Smith' }, { name: 'Bob Brown' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockFollowing),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Following: 0'));

    // Check if modal is displayed
    expect(screen.getByText('Following')).toBeInTheDocument();

    // Wait for the following to be loaded
    await waitFor(() => screen.getByText('Alice Smith'));
    expect(screen.getByText('Bob Brown')).toBeInTheDocument();
  });

  test('displays loading text while fetching followers', async () => {
    fetch.mockResolvedValueOnce({
      json: () => new Promise((resolve) => setTimeout(() => resolve([{ name: 'Test Follower' }]), 1000)),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Followers: 0'));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the follower to be loaded
    await waitFor(() => screen.getByText('Test Follower'));
  });

  test('closes followers modal when close button is clicked', async () => {
    const mockFollowers = [{ name: 'Test Follower' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockFollowers),
    });

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Followers: 0'));

    // Wait for the modal to appear
    await waitFor(() => screen.getByText('Followers'));

    // Click close button and check modal is closed
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Followers')).not.toBeInTheDocument();
  });

  test('clicking on "Write" navigates to /publish page', () => {
    const navigate = vi.fn();
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Write'));
    expect(navigate).toHaveBeenCalledWith('/publish');
  });
});
