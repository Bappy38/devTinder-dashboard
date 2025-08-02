import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../constants/endpoints";
import devTinderAPI from "../interceptors/errorHandlingInterceptor";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await devTinderAPI.post(ENDPOINTS.LOGIN,
            {
                email,
                password
            },
            {
                withCredentials: true
            });
            dispatch(addUser(response.data.data));
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response.data.error);
        }
    }

    const isFormValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        
        return emailRegex.test(email) && passwordRegex.test(password);
    };

    return (
        <div className="flex justify-center items-center mt-20">
          <div className="card w-96 bg-white shadow-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Welcome back 👋</h2>
    
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="input validator">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full"
                  />
                </label>
                <div className="validator-hint hidden">Enter a valid email address</div>
              </div>
    
              <div>
                <label className="input validator">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    required
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be at least 8 characters with 1 number, 1 lowercase, and 1 uppercase letter"
                    className="w-full"
                  />
                </label>
                <p className="validator-hint hidden text-xs text-gray-500 mt-1">
                  Must be at least 8 characters, including:
                  <br />⬩ One number
                  <br />⬩ One lowercase letter
                  <br />⬩ One uppercase letter
                </p>
              </div>
    
              {error && (
                <p className="text-sm text-red-600 text-center mt-2">Error: {error}</p>
              )}
    
              <div className="flex justify-center mt-4">
                <button
                    type="submit"
                    className="btn btn-primary w-40"
                    disabled={!isFormValid()}
                >
                    Login
                </button>
              </div>
    
              <div className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      );
};

export default Login;