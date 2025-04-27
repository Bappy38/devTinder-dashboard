import axios from 'axios';
import { useState } from 'react';
import { NOTIFICATION_TYPE } from '../constants/notificationType';
import { ENDPOINTS } from '../constants/endpoints';
import { formatDateForInput } from '../helpers/dateTimeHelper';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

const EditProfile = ({user}) => {

    const [userData, setUserData] = useState(user);
    const dispatch = useDispatch();

    const handleUpdateProfile = async () => {
      try {
        const response = await axios.patch(ENDPOINTS.UPDATE_PROFILE,
            {
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                dateOfBirth: userData?.dateOfBirth,
                gender: userData?.gender,
                photoUrl: userData?.photoUrl,
                skills: userData?.skills
            },
            {
                withCredentials: true
            }
        );
        dispatch(addUser(response.data.data));
        window.showNotification(crypto.randomUUID(), 'Profile Updated Successfully', NOTIFICATION_TYPE.SUCCESS);
      } catch (err) {
        console.error(err);
        window.showNotification(crypto.randomUUID(), err.response.data.error, NOTIFICATION_TYPE.ERROR);
      }
    }

    return (
      <div className='m-5'>
        <div className="card card-side bg-base-100 shadow-sm">
          <figure className='w-56'>
            <img
              className='rounded-lg'
              src={userData?.photoUrl}
              alt="Profile Image" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <div className='flex'>

              <div className='w-[50%]'>
                
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={userData?.firstName}
                    onChange={(e) => setUserData({
                      ...userData,
                      firstName: e.target.value
                    })}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    className="select"
                    value={userData?.gender}
                    onChange={(e) => setUserData({
                        ...userData,
                        gender: e.target.value
                    })}
                  >
                    <option value="" disabled={true}>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Photo URL"
                    value={userData?.photoUrl}
                    onChange={(e) => setUserData({
                        ...userData,
                        photoUrl: e.target.value
                    })}
                  />
                </fieldset>
              </div>

              <div className='w-[50%]'>
                
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={userData?.lastName}
                    onChange={(e) => setUserData({
                      ...userData,
                      lastName: e.target.value
                    })}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Date of Birth</legend>
                  <input
                    type="date"
                    className="input"
                    value={formatDateForInput(userData?.dateOfBirth)}
                    onChange={(e) => setUserData({
                      ...userData,
                      dateOfBirth: e.target.value
                    })}
                  />
                </fieldset>

              </div>
            </div>
            <div className="card-actions mt-2">
              <button className="btn btn-primary" onClick={handleUpdateProfile}>Update Profile</button>
            </div>
          </div>
        </div>
      </div>
    )
};

export default EditProfile;