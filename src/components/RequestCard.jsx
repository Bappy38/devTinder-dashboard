import { useState } from "react";
import { calculateAge } from "../helpers/dateTimeHelper";
import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";
import {NOTIFICATION_TYPE} from "../constants/notificationType";

const RequestCard = ({ user, requestId }) => {

    const [actionExecuted, setActionExecuted] = useState(false);

    const age = user?.dateOfBirth ? calculateAge(user.dateOfBirth) : null;

    const handleAction = async (action) => {
        try {
            await axios.post(ENDPOINTS.REVIEW_REQUEST(action, requestId), {}, {
                withCredentials: true
            });
            window.showNotification(crypto.randomUUID(), `Connection request ${action}`, NOTIFICATION_TYPE.SUCCESS);
            setActionExecuted(true);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card card-side bg-base-100 shadow-md w-[600px] h-60 mt-4 rounded-xl overflow-hidden">
            <figure className="w-56 h-full bg-gray-100">
                <img
                    src={user.photoUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body w-full p-4 flex flex-col justify-between">
                <div>
                    <h2 className="card-title text-xl">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {user?.gender} {age !== null && `• ${age} years`}
                    </p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                        {user?.about}
                    </p>
                </div>

                <div className="card-actions justify-end space-x-2">
                    <button
                        disabled={actionExecuted}
                        className="btn btn-outline btn-sm"
                        onClick={() => handleAction("rejected")}
                    >
                        Reject
                    </button>

                    <button
                        disabled={actionExecuted}
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAction("accepted")}
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
