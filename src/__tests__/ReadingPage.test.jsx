import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import ReadingPage from './ReadingPage';

describe('ReadingPage', () => {
  // Mock fetch for the test
  global.fetch = vi.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders blog title, author, and content correctly', async () => {
    const mockBlog = {
      title: 'Bringing Farmers to the Table for Conversations about River Health',
      author: 'Victor Shape',
      content: 'Water scarcity has become an increasingly pressing issue...',
      likes: 1300,
      views: 2100,
      comments: 24,
      image: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1200',
    };

    // Simulate API response
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockBlog),
    });

    render(
      <MemoryRouter initialEntries={['/blog/1']}>
        <Routes>
          <Route path="/blog/:id" element={<ReadingPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Bringing Farmers to the Table for Conversations about River Health'));

    // Check if the title, author, and some content are rendered correctly
    expect(screen.getByText('Bringing Farmers to the Table for Conversations about River Health')).toBeInTheDocument();
    expect(screen.getByText('Victor Shape')).toBeInTheDocument();
    expect(screen.getByText('Water scarcity has become an increasingly pressing issue')).toBeInTheDocument();
  });

  test('displays loading message while fetching blog data', () => {
    fetch.mockResolvedValueOnce({
      json: () => new Promise(resolve => setTimeout(() => resolve([]), 1000)),
    });

    render(
      <MemoryRouter initialEntries={['/blog/1']}>
        <Routes>
          <Route path="/blog/:id" element={<ReadingPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders blog image', async () => {
    const mockBlog = {
      title: 'Bringing Farmers to the Table for Conversations about River Health',
      author: 'Victor Shape',
      content: 'Water scarcity has become an increasingly pressing issue...',
      likes: 1300,
      views: 2100,
      comments: 24,
      image: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1200',
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockBlog),
    });

    render(
      <MemoryRouter initialEntries={['/blog/1']}>
        <Routes>
          <Route path="/blog/:id" element={<ReadingPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByAltText('River Waterfall'));

    // Check if the image is displayed
    const img = screen.getByAltText('River Waterfall');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockBlog.image);
  });

  test('renders engagement metrics (likes, views, comments)', async () => {
    const mockBlog = {
      title: 'Bringing Farmers to the Table for Conversations about River Health',
      author: 'Victor Shape',
      content: 'Water scarcity has become an increasingly pressing issue...',
      likes: 1300,
      views: 2100,
      comments: 24,
      image: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1200',
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockBlog),
    });

    render(
      <MemoryRouter initialEntries={['/blog/1']}>
        <Routes>
          <Route path="/blog/:id" element={<ReadingPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('1.3K'));

    // Check engagement metrics
    expect(screen.getByText('1.3K')).toBeInTheDocument(); // Likes
    expect(screen.getByText('2.1K')).toBeInTheDocument(); // Views
    expect(screen.getByText('24')).toBeInTheDocument(); // Comments
  });

  test('renders author info correctly', async () => {
    const mockBlog = {
      title: 'Bringing Farmers to the Table for Conversations about River Health',
      author: 'Victor Shape',
      content: 'Water scarcity has become an increasingly pressing issue...',
      likes: 1300,
      views: 2100,
      comments: 24,
      image: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=1200',
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockBlog),
    });

    render(
      <MemoryRouter initialEntries={['/blog/1']}>
        <Routes>
          <Route path="/blog/:id" element={<ReadingPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Victor Shape'));

    // Check if the author's name and designation are rendered
    expect(screen.getByText('Victor Shape')).toBeInTheDocument();
    expect(screen.getByText('Expert')).toBeInTheDocument();
  });
});
