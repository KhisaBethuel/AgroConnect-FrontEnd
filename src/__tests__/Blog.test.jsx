import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Blog from '../Pages/Blog';  // Adjust the path to your Blog component
import blogData from '../constants/BlogData';

// Mock BlogCard component to simplify tests
vi.mock('../Components/BlogCard', () => ({
  image,
  category,
  title,
}) => (
  <div data-testid="blog-card">
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{category}</p>
  </div>
));

describe('Blog Component', () => {
  // Test 1: Blog component renders title, search bar, and initial blog cards
  test('renders title, search bar, and initial blog cards', () => {
    render(<Blog />);
    
    // Check for the title
    expect(screen.getByText('Blogs')).toBeInTheDocument();
    
    // Check for the search bar
    expect(screen.getByPlaceholderText('Search blogs...')).toBeInTheDocument();
    
    // Check if blog cards are rendered
    const blogCards = screen.getAllByTestId('blog-card');
    expect(blogCards.length).toBe(blogData.filter((item) => item.image).slice(0, 12).length);
  });

  // Test 2: Filter blogs based on search term
  test('filters blogs based on search term', () => {
    render(<Blog />);
    
    const searchInput = screen.getByPlaceholderText('Search blogs...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    // Simulate user typing a search term
    fireEvent.change(searchInput, { target: { value: 'specific term' } });
    fireEvent.click(searchButton);
    
    // Filter blog data by the search term
    const filteredBlogs = blogData.filter((blog) =>
      blog.title.toLowerCase().includes('specific term')
    );
    
    // Check that the number of blog cards matches the filtered results
    const blogCards = screen.queryAllByTestId('blog-card');
    expect(blogCards.length).toBe(filteredBlogs.slice(0, 12).length);
  });

  // Test 3: No results for a search term that doesn't match any blog titles
  test('displays no blogs if search term does not match any titles', () => {
    render(<Blog />);
    
    const searchInput = screen.getByPlaceholderText('Search blogs...');
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    // Simulate a search with no results
    fireEvent.change(searchInput, { target: { value: 'nonexistent term' } });
    fireEvent.click(searchButton);
    
    // Ensure no blog cards are displayed
    expect(screen.queryAllByTestId('blog-card').length).toBe(0);
  });

  // Test 4: Blog cards display the correct data (image, category, title)
  test('displays the correct blog card data', () => {
    render(<Blog />);
    
    // Get the first blog card
    const firstBlogCard = screen.getAllByTestId('blog-card')[0];
    
    // Check if the blog card displays the correct title and category
    expect(firstBlogCard).toHaveTextContent(blogData[0].title);
    expect(firstBlogCard).toHaveTextContent(blogData[0].category);
    expect(firstBlogCard.querySelector('img')).toHaveAttribute('src', blogData[0].image);
  });
});
