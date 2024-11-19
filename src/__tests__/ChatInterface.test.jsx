import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatApp from '../Pages/ChatApp';
import { FaPhone, FaVideo, FaSmile, FaPaperclip } from "react-icons/fa";

// Mocking the EmojiPicker component
jest.mock('emoji-picker-react', () => ({
  __esModule: true,
  default: ({ onEmojiClick }) => (
    <div data-testid="emoji-picker">
      <button onClick={() => onEmojiClick({ emoji: '😊' })}>😊</button>
    </div>
  ),
}));

describe("ChatApp", () => {

  test("renders community list", () => {
    render(<ChatApp />);

    // Check if communities are displayed in the sidebar
    expect(screen.getByText("Agriculture 101")).toBeInTheDocument();
    expect(screen.getByText("Farmers United")).toBeInTheDocument();
    expect(screen.getByText("Crop Rotation Tips")).toBeInTheDocument();
    expect(screen.getByText("Soil Health Experts")).toBeInTheDocument();
  });

  test("selecting a community loads the chat window", async () => {
    render(<ChatApp />);

    // Click on the "Agriculture 101" community
    fireEvent.click(screen.getByText("Agriculture 101"));

    // Check if chat window is loaded with the selected community's name
    await waitFor(() => {
      expect(screen.getByText("Agriculture 101")).toBeInTheDocument();
    });

    // Check if the welcome message is displayed
    expect(screen.getByText("Welcome to Agriculture 101!")).toBeInTheDocument();
  });

  test("sending a message", async () => {
    render(<ChatApp />);

    // Select a community first
    fireEvent.click(screen.getByText("Agriculture 101"));

    // Type a message in the input field
    const inputField = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(inputField, { target: { value: "Test message" } });

    // Click the send button
    fireEvent.click(screen.getByText("Send"));

    // Check if the message appears in the chat
    await waitFor(() => {
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });
  });

  test("displaying emoji picker", async () => {
    render(<ChatApp />);

    // Select a community first
    fireEvent.click(screen.getByText("Agriculture 101"));

    // Click the emoji button
    fireEvent.click(screen.getByTestId("emoji-icon"));

    // Check if the emoji picker is displayed
    await waitFor(() => {
      expect(screen.getByTestId("emoji-picker")).toBeInTheDocument();
    });

    // Click on an emoji
    fireEvent.click(screen.getByText("😊"));

    // Check if the emoji was added to the message input
    expect(screen.getByPlaceholderText("Type a message...").value).toBe("😊");
  });

  test("typing indicator is shown", async () => {
    render(<ChatApp />);

    // Select a community first
    fireEvent.click(screen.getByText("Agriculture 101"));

    // Start typing in the message input
    const inputField = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(inputField, { target: { value: "Typing..." } });

    // Check if the typing indicator is shown
    expect(screen.getByText("User is typing...")).toBeInTheDocument();
  });

  test("searching for a community", async () => {
    render(<ChatApp />);

    // Type in the search bar to filter communities
    const searchInput = screen.getByPlaceholderText("Search for chats...");
    fireEvent.change(searchInput, { target: { value: "Crop" } });

    // Check if the "Crop Rotation Tips" community is displayed
    expect(screen.getByText("Crop Rotation Tips")).toBeInTheDocument();

    // Check that other communities are not displayed
    expect(screen.queryByText("Agriculture 101")).not.toBeInTheDocument();
    expect(screen.queryByText("Farmers United")).not.toBeInTheDocument();
    expect(screen.queryByText("Soil Health Experts")).not.toBeInTheDocument();
  });
});
