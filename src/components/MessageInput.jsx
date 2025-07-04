import { useState } from "react";


const MessageInput = ({sendMessage}) => {
    
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        sendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <form onSubmit={handleSendMessage} className="bg-gray-100 p-4 border-t border-gray-200">
            <div className="flex">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600 focus:outline-none"
            >
                Send
            </button>
            </div>
        </form>
    )
}

export default MessageInput;