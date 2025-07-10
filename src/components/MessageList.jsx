import { useEffect, useRef, useState } from "react";
import usePaginatedMessages from "../hooks/usePaginatedMessages";


const MessageList = ({ connectionId, currentUser, targetUser, liveMessages }) => {

    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const { persistedMessages, loading } = usePaginatedMessages(connectionId, scrollContainerRef);

    const allMessages = [...persistedMessages, ...liveMessages];
    const [userAtBottom, setUserAtBottom] = useState(true);
    const prevLiveMessageLength = useRef(liveMessages.length);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
            setUserAtBottom(atBottom);
        };
        container.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => container.removeEventListener('scroll', handleScroll);
    }, [allMessages.length]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const newMessageArrived = liveMessages.length > prevLiveMessageLength.current;
        const initialLoad = prevLiveMessageLength.current === 0 && allMessages.length > 0;
        const shouldScrollToBottom = userAtBottom && (newMessageArrived || initialLoad);
        
        if (shouldScrollToBottom) {
            container.scrollTop = container.scrollHeight;
        }
        prevLiveMessageLength.current = liveMessages.length;
    }, [liveMessages.length, allMessages.length, userAtBottom]);

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
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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