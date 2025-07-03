import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../helpers/socket';
import { useSelector } from 'react-redux';
import useConnectionUser from '../hooks/useConnectionUser';

const Chat = () => {

    const { connectionId } = useParams();
    const targetUser = useConnectionUser(connectionId);
    const currentUser = useSelector((state) => state.user);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const messagesEndRef = useRef(null);

    useEffect(() => {

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit('joinRoom', connectionId);

        socket.on('receiveMessage', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('receiveMessage');
            socket.disconnect();     // Optional: only if component is unmount permanently
        };
    }, [connectionId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            text: newMessage,
            sender: currentUser?._id,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            profilePic: 'https://randomuser.me/api/portraits/men/32.jpg'
        };

        setNewMessage('');
        socket.emit('sendMessage', { roomId: connectionId, message });
    };

    return (
        <div className="flex flex-col mt-2 h-[500px] max-w-3xl mx-auto border border-gray-200 rounded-lg overflow-hidden">
            
        <div className="bg-gray-100 p-4 border-b border-gray-200">
            <div className="flex items-center">
            <img 
                src={targetUser?.photoUrl}
                alt="Profile" 
                className="w-10 h-10 rounded-full mr-3"
            />
            <div>
                <h2 className="font-semibold">{targetUser?.firstName} {targetUser?.lastName}</h2>
                <p className="text-xs text-gray-500">Online</p>
            </div>
            </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
            <div 
                key={message.id}
                className={`flex mb-4 ${message.sender === currentUser?._id ? 'justify-end' : 'justify-start'}`}
            >
                {message.sender === targetUser?._id && (
                <img 
                    src={targetUser?.photoUrl}
                    alt="Profile" 
                    className="w-8 h-8 rounded-full mr-3 self-end"
                />
                )}
                
                <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === currentUser?._id 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}
                >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === currentUser?._id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                </p>
                </div>

                {message.sender === currentUser?.id && (
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
        </div>
    );
};

export default Chat;