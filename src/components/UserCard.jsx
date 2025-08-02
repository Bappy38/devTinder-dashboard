import devTinderAPI from "../interceptors/errorHandlingInterceptor";
import { ENDPOINTS } from "../constants/endpoints";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, about, photoUrl } = user;

    const handleAction = async (action) => {
        try {
            await devTinderAPI.post(ENDPOINTS.SEND_REQUEST(action, _id), {}, {
                withCredentials: true,
            });
            dispatch(removeUserFromFeed(user));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card bg-base-300 w-80 md:w-96 h-[460px] shadow-md flex flex-col">
            <figure className="h-60 w-full overflow-hidden rounded-t-md">
                <img
                    src={photoUrl}
                    alt="profile photo"
                    className="w-full h-full object-fill rounded-md"
                />
            </figure>

            <div className="card-body flex flex-col justify-between">
                <div>
                    <h2 className="card-title text-center">{firstName} {lastName}</h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {about}
                    </p>
                </div>

                <div className="card-actions justify-center mt-4">
                    <button
                        className="btn btn-outline btn-primary w-28"
                        onClick={() => handleAction("ignored")}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-primary w-28"
                        onClick={() => handleAction("interested")}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
