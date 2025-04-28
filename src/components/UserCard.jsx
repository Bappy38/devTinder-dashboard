import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";

const UserCard = ({user}) => {

    const { _id, firstName, lastName, about, photoUrl } = user;

    const handleAction = async (action) => {
        try {
            const response = await axios.post(ENDPOINTS.SEND_REQUEST(action, _id), {}, {
                withCredentials: true
            });
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card bg-base-300 w-96 h-[400px] shadow-sm flex">
            <figure>
                <img
                    src={photoUrl}
                    alt="profile photo"
                    className="mt-2 rounded-md max-w-full max-h-full object-cover"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{about}</p>

                <div className="card-actions justify-center mt-2">
                    <button className="btn btn-primary" onClick={() => handleAction("ignored")}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleAction("interested")}>Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;