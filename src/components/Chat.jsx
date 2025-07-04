import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useConnectionUser from '../hooks/useConnectionUser';
import useConnectChat from '../hooks/useConnectChat';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

const Chat = () => {

    const { connectionId } = useParams();
    const currentUser = useSelector((state) => state.user);

    const targetUser = useConnectionUser(connectionId);
    const { messages, sendMessage } = useConnectChat(connectionId);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col mt-2 h-[500px] max-w-3xl mx-auto border border-gray-200 rounded-lg overflow-hidden">
            
            <ChatHeader targetUser={targetUser}/>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((message) => (
                <div 
                    key={message.id}
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

            <MessageInput sendMessage={sendMessage}/>
        </div>
    );
};

export default Chat;