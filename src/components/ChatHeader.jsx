import { timeAgo } from "../helpers/dateTimeHelper";


const ChatHeader = ({targetUser}) => {

    const lastSeen = timeAgo(targetUser.lastSeen);

    if (!targetUser) {
        return <></>;
    }

    return (
        <div className="bg-gray-100 p-4 border-b border-gray-200">
            <div className="flex items-center">
            <img 
                src={targetUser.photoUrl}
                alt="Profile" 
                className="w-10 h-10 rounded-full mr-3"
            />
            <div>
                <h2 className="font-semibold">{targetUser.firstName} {targetUser.lastName}</h2>
                <p className="text-xs text-gray-500">{lastSeen}</p>
            </div>
            </div>
        </div>
    )
}

export default ChatHeader;