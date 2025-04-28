import { calculateAge } from "../helpers/dateTimeHelper";

const ConnectionCard = ({ user }) => {

    const age = user?.dateOfBirth ? calculateAge(user.dateOfBirth) : null;

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
                        className="btn btn-outline btn-sm"
                    >
                        Remove Connection
                    </button>

                    <button
                        className="btn btn-primary btn-sm"
                    >
                        Message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConnectionCard;