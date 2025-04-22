import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./components/Feed";

function App() {
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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;