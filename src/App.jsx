import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Body from "./components/Body";
import NotificationBar from "./components/NotificationBar"
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";
import { NOTIFICATION_TYPE } from "./constants/notificationType";
import { useState } from "react";
import Requests from "./components/Requests";

function App() {
  const [notification, setNotification] = useState(null);

  window.showNotification = (id, message, type = NOTIFICATION_TYPE.INFO) => {
    setNotification({ id, message, type });
  };

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="" element={<Feed/>} />
              <Route path="profile" element={<Profile/>} />
              <Route path="login" element={<Login/>} />
              <Route path="signup" element={<SignUp/>} />
              <Route path="requests" element={<Requests/>} />
            </Route>
          </Routes>
        </BrowserRouter>

        {
          notification && (
            <NotificationBar
              id={notification.id}
              message={notification.message}
              type={notification.type}/>
          )
        }
      </Provider>
    </>
  )
}

export default App;