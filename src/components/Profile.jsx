import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';

const Profile = () => {

    const loggedInUser = useSelector((state) => state.user);

    if (!loggedInUser) {
      return <></>;
    }

    return (
      <EditProfile user={loggedInUser}/>
    )
};

export default Profile;