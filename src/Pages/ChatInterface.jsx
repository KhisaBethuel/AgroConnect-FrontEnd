import { useState, useRef, useEffect } from "react";
import { FaPhone, FaVideo, FaSmile, FaPaperclip } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import "../index.css";
import Navbar from "../Components/Navbar";
import React from 'react';

const ChatApp = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "John Doe",
      content: "Hello, everyone!",
      timestamp: "2024-11-15T12:00:00Z",
      isMine: true,
      status: "read",
    },
    {
      sender: "Jane Smith",
      content: "Hi there!",
      timestamp: "2024-11-15T12:05:00Z",
      isMine: false,
    },
  ]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // const [showProfileModal, setShowProfileModal] = useState(false);
  const messageEndRef = useRef(null);

  const communities = [
    {
      name: "Agriculture 101",
      image: "https://via.placeholder.com/40",
      lastMessage: "Welcome!",
      lastMessageTime: "10:00 AM",
      unreadCount: 2,
      isOnline: true,
    },
    {
      name: "Farmers United",
      image: "https://via.placeholder.com/40",
      lastMessage: "Great tips!",
      lastMessageTime: "11:30 AM",
      unreadCount: 0,
      isOnline: false,
    },
    {
      name: "Crop Rotation Tips",
      image: "https://via.placeholder.com/40",
      lastMessage: "New technique!",
      lastMessageTime: "12:15 PM",
      unreadCount: 1,
      isOnline: true,
    },
    {
      name: "Soil Health Experts",
      image: "https://via.placeholder.com/40",
      lastMessage: "How to improve?",
      lastMessageTime: "1:00 PM",
      unreadCount: 5,
      isOnline: false,
    },
  ];

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
    setMessages([
      {
        sender: "System",
        content: `Welcome to ${community.name}!`,
        timestamp: new Date().toISOString(),
        isMine: false,
      },
    ]);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleSendMessage = () => {
    if (text.trim()) {
      setMessages([
        ...messages,
        {
          sender: "You",
          content: text,
          timestamp: new Date().toISOString(),
          isMine: true,
          status: "sent",
        },
      ]);
      setText("");
      setIsTyping(false);
    }
  };

  const handleEmojiClick = (emoji) => {
    setText((prevText) => prevText + emoji.emoji);
  };

  const groupMessagesByDate = (messages) => {
    const grouped = {};
    messages.forEach((msg) => {
      const date = new Date(msg.timestamp).toDateString();
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(msg);
    });
    return grouped;
  };

  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="chat-app">
        <div className="sidebar">
          <header className="sidebar-header">
            <h2>Chats</h2>
            <input
              type="text"
              placeholder="Search for chats..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </header>
          <ul className="community-list">
            {communities
              .filter((community) =>
                community.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((community, index) => (
                <li
                  key={index}
                  onClick={() => handleCommunitySelect(community)}
                  className="community-item">
                  <img
                    src={community.image}
                    alt={`${community.name} profile`}
                    className="community-img"
                  />
                  <div className="community-details">
                    <h3 className="community-name">
                      {community.name}
                      <span
                        className={`status-dot ${
                          community.isOnline ? "online" : "offline"
                        }`}></span>
                    </h3>
                    <p className="community-last-msg">
                      {community.lastMessage}
                    </p>
                  </div>
                  <span className="last-message-time">
                    {community.lastMessageTime}
                  </span>
                  {community.unreadCount > 0 && (
                    <span className="unread-badge">
                      {community.unreadCount}
                    </span>
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="chat-window">
          {selectedCommunity ? (
            <>
              <header className="chat-header">
                <div className="chat-header-info">
                  <img
                    src={selectedCommunity.image}
                    alt={`${selectedCommunity.name} profile`}
                  />
                  <h2>
                    {selectedCommunity.name}
                    {isTyping && (
                      <span className="typing-header"> is typing...</span>
                    )}
                  </h2>
                </div>
                <div className="chat-header-icons">
                  <FaPhone className="chat-icon" />
                  <FaVideo className="chat-icon" />
                </div>
              </header>
              <div className="messages">
                {Object.keys(groupedMessages).map((date) => (
                  <div key={date}>
                    <div className="date-divider">{date}</div>
                    {groupedMessages[date].map((msg, index) => (
                      <div
                        key={index}
                        className={`message ${
                          msg.isMine ? "mine" : "receiver"
                        }`}>
                        <div className="message-header">
                          <img
                            src="https://via.placeholder.com/30"
                            alt={`${msg.sender} profile`}
                            className="message-img"
                          />
                          <span className="sender-name">{msg.sender}</span>
                          <span className="timestamp">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p>{msg.content}</p>
                        {msg.isMine && (
                          <span className="message-status">
                            {msg.status === "read" ? "✓✓" : "✓"}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                {isTyping && (
                  <div className="typing-indicator">User is typing...</div>
                )}
                <div ref={messageEndRef} />
              </div>

              <div className="message-input">
                <FaPaperclip className="attach-icon" />
                <input
                  type="text"
                  value={text}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                />
                <FaSmile
                  className="emoji-icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                )}
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="select-community">
              <div className="welcome-message">
                <h2>Select a Community to Start Chatting</h2>
                <p>
                  Find a community that matches your interests in agriculture.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatApp;
