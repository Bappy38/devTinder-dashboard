import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useConnectionUser from '../hooks/useConnectionUser';
import useConnectChat from '../hooks/useConnectChat';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';

const Chat = () => {
    const { connectionId } = useParams();
    const currentUser = useSelector((state) => state.user);
    const targetUser = useConnectionUser(connectionId);
    const { messages, sendMessage } = useConnectChat(connectionId);

    if (!currentUser || !targetUser) {
        return;
    }

    return (
        <div className="flex flex-col mt-2 h-[500px] max-w-3xl mx-auto border border-gray-200 rounded-lg overflow-hidden">
            <ChatHeader targetUser={targetUser}/>
            
            <MessageList
                connectionId={connectionId}
                currentUser={currentUser}
                targetUser={targetUser}
                liveMessages={messages}
            />

            <MessageInput sendMessage={sendMessage}/>
        </div>
    );
};

export default Chat;