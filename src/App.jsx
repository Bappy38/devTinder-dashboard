import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Body from "./components/Body";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="profile" element={<Profile/>} />
          </Route>
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;