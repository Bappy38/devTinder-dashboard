import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:3000/auth/signin",
            {
                email,
                password
            },
            {
                withCredentials: true
            });
            dispatch(addUser(response.data.data));
        } catch (err) {
            console.error(err);
        }
    }

    const isFormValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        
        return emailRegex.test(email) && passwordRegex.test(password);
    };

    return (
        <div className="flex justify-center mt-20">

            <div className="card w-96 bg-base-100 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <div>
                            <label className="input validator">
                                <input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    required
                                />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </div>

                        <div className="mt-4">
                            <label class="input validator">
                                <input
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    required 
                                    placeholder="Password"
                                    minlength="8" 
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
                                />
                            </label>
                            <p class="validator-hint hidden">
                            Must be more than 8 characters, including
                            <br/>⬩ At least one number
                            <br/>⬩ At least one lowercase letter
                            <br/>⬩ At least one uppercase letter
                            </p>
                        </div>

                    
                        <div className="mt-6 flex justify-center">
                            <button
                                type="submit"
                                className="btn btn-primary w-[60%]"
                                disabled={!isFormValid()}
                            >Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;