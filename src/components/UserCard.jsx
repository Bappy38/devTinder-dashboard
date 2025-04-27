
const UserCard = ({user}) => {

    const { firstName, lastName, about, photoUrl } = user;

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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;