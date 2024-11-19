import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CommunityPage from '../CommunityPage';

// Mock the Navbar component
vi.mock('../Components/Navbar', () => ({
  __esModule: true,
  default: () => <div>Mock Navbar</div>,
}));

describe('CommunityPage', () => {
  test('renders Navbar', () => {
    render(<CommunityPage />);
    expect(screen.getByText('Mock Navbar')).toBeInTheDocument();
  });

  test('displays the community cards correctly', () => {
    render(<CommunityPage />);
    
    // Check that all community names are rendered
    expect(screen.getByText('FarmTech')).toBeInTheDocument();
    expect(screen.getByText('Farmfinance')).toBeInTheDocument();
    expect(screen.getByText('Farming Buisness')).toBeInTheDocument();
  });

  test('filters communities based on search term', () => {
    render(<CommunityPage />);
    
    // Input search term and simulate user typing
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'FarmTech' } });
    
    // Check if the correct community is displayed after searching
    expect(screen.getByText('FarmTech')).toBeInTheDocument();
    expect(screen.queryByText('Farmfinance')).toBeNull(); // Ensure other communities are hidden
  });

  test('shows no communities when search term does not match', () => {
    render(<CommunityPage />);
    
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
    
    // Ensure no community is found
    expect(screen.queryByText('FarmTech')).toBeNull();
    expect(screen.queryByText('Farmfinance')).toBeNull();
    expect(screen.queryByText('Farming Buisness')).toBeNull();
  });
});
