import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPublishForm from '../Pages/BlogPublishForm';

// Mocking FormData to test form submission
global.FormData = jest.fn().mockImplementation(() => ({
  append: jest.fn(),
}));

describe("BlogPublishForm", () => {

  test("renders the form elements", () => {
    render(<BlogPublishForm />);
    
    // Check if the title, image, story inputs and submit button are present
    expect(screen.getByLabelText(/blog title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell your story/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /publish blog/i })).toBeInTheDocument();
  });

  test("allows the user to type a title", () => {
    render(<BlogPublishForm />);

    const titleInput = screen.getByLabelText(/blog title/i);
    
    fireEvent.change(titleInput, { target: { value: "Test Blog Title" } });
    
    expect(titleInput.value).toBe("Test Blog Title");
  });

  test("allows the user to type a story", () => {
    render(<BlogPublishForm />);

    const storyTextarea = screen.getByLabelText(/tell your story/i);
    
    fireEvent.change(storyTextarea, { target: { value: "This is the story content." } });
    
    expect(storyTextarea.value).toBe("This is the story content.");
  });

  test("allows the user to upload an image", () => {
    render(<BlogPublishForm />);

    const imageInput = screen.getByLabelText(/upload image/i);
    
    const file = new File(["image content"], "example.jpg", { type: "image/jpeg" });
    
    fireEvent.change(imageInput, { target: { files: [file] } });
    
    // Image input value should be set to the file name
    expect(imageInput.files[0].name).toBe("example.jpg");
  });

  test("submits the form with title, story, and image data", () => {
    render(<BlogPublishForm />);

    const titleInput = screen.getByLabelText(/blog title/i);
    const storyTextarea = screen.getByLabelText(/tell your story/i);
    const imageInput = screen.getByLabelText(/upload image/i);
    const submitButton = screen.getByRole("button", { name: /publish blog/i });

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: "Test Blog Title" } });
    fireEvent.change(storyTextarea, { target: { value: "This is a blog story." } });

    const file = new File(["image content"], "test-image.jpg", { type: "image/jpeg" });
    fireEvent.change(imageInput, { target: { files: [file] } });

    // Mock FormData
    const formData = new FormData();
    formData.append("title", "Test Blog Title");
    formData.append("story", "This is a blog story.");
    formData.append("image", file);

    // Mock the form submission
    const mockSubmit = jest.fn();
    global.FormData.mockImplementationOnce(() => {
      return {
        append: jest.fn(),
      };
    });

    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalled();
    expect(global.FormData).toHaveBeenCalledTimes(1);
  });

});
