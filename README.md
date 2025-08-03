# DevTinder Dashboard

DevTinder is a web-based dashboard application designed to connect developers, inspired by the mechanics of Tinder. It provides a platform for developers to browse profiles, connect with each other, and engage in real-time chat.

## ✨ Key Features

- **User Authentication:** Secure sign-up and login functionality.
- **Developer Feed:** Browse a paginated feed of developer profiles.
- **Connection System:** Send, receive, and manage connection requests.
- **Connections List:** View a list of all your successful connections.
- **Real-time Chat:** Engage in one-on-one conversations with your connections.
- **Live Notifications:** Receive instant notifications for new messages and connection requests.
- **User Presence:** See the online status of other users.
- **Profile Management:** View and edit your own developer profile.

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling:** Tailwind CSS, DaisyUI
- **Real-time Communication:** Socket.IO
- **API Communication:** Axios
- **Linting:** ESLint

## 🚀 Technical Highlights & Challenges Resolved

This project incorporates several interesting technical solutions to common web application challenges:

1.  **Real-time User Presence:**
    *   **Challenge:** Efficiently tracking the online status of users without constant polling.
    *   **Solution:** A custom `useHeartbeat` hook was implemented. It sends a periodic "heartbeat" event to the server via Socket.IO, allowing the application to maintain and display the active status of connected users with minimal network overhead.

2.  **Scalable Chat History:**
    *   **Challenge:** Loading potentially long chat histories can be slow and resource-intensive.
    *   **Solution:** The `usePaginatedMessages` custom hook fetches message history in chunks (pages). This lazy-loading approach ensures that the chat interface remains fast and responsive, only loading older messages as the user scrolls for them.

3.  **Centralized API Error Handling:**
    *   **Challenge:** Ensuring consistent and graceful error handling for all API requests throughout the application.
    *   **Solution:** An `axios` interceptor (`errorHandlingInterceptor.js`) is used to catch and handle all API errors globally. This prevents code duplication and standardizes how errors are processed and displayed to the user.

## ⚙️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd devTinder-dashboard
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```