import { useEffect, useRef } from "react";
import usePaginatedMessages from "../hooks/usePaginatedMessages";


const MessageList = ({ connectionId, currentUser, targetUser, messages }) => {

    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const { persistedMessages, loading } = usePaginatedMessages(connectionId, scrollContainerRef);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const allMessages = [...persistedMessages, ...messages];

    return (
        <div
            className="flex-1 p-4 overflow-y-auto bg-gray-50"
            ref={scrollContainerRef}
        >
            {loading && (
                <div className="text-center text-xs text-gray-400 mb-2">Loading...</div>
            )}
            {allMessages.map((message) => (
            <div 
                key={message._id}
                className={`flex mb-4 ${message.senderId === currentUser?._id ? 'justify-end' : 'justify-start'}`}
            >
                {message.senderId === targetUser?._id && (
                    <img 
                        src={targetUser?.photoUrl}
                        alt="Profile" 
                        className="w-8 h-8 rounded-full mr-3 self-end"
                    />
                )}
                
                <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.senderId === currentUser?._id 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}
                >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.senderId === currentUser?._id ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                    </p>
                </div>

                {message.senderId === currentUser?.id && (
                    <img 
                        src={currentUser?.photoUrl}
                        alt="Profile" 
                        className="w-8 h-8 rounded-full ml-3 self-end"
                    />
                )}
            </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
};

export default MessageList;