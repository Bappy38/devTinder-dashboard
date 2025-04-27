import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ENDPOINTS } from "../constants/endpoints";
import { NOTIFICATION_TYPE } from "../constants/notificationType";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await axios.post(ENDPOINTS.SIGNUP, 
            {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            },
            {
                withCredentials: true
            });
            window.showNotification(crypto.randomUUID(), 'User Created Successfully', NOTIFICATION_TYPE.SUCCESS);
            navigate("/login");
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
            window.showNotification(crypto.randomUUID(), errorMessage, NOTIFICATION_TYPE.ERROR);
        }
    };

    const isFormValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        return (
            formData.firstName.trim() !== "" &&
            formData.lastName.trim() !== "" &&
            emailRegex.test(formData.email) &&
            passwordRegex.test(formData.password)
        );
    };

    return (
        <div className="flex justify-center mt-20">
            <div className="card w-96 bg-base-100 shadow-sm">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="input validator">
                                <input 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="First Name"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="input validator">
                                <input 
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="input validator">
                                <input 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label className="input validator">
                                <input 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Password"
                                    required
                                    minLength="8"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                />
                            </label>
                            <p className="validator-hint hidden text-xs text-gray-500 mt-1">
                                Must be more than 8 characters, including<br/>
                                ⬩ At least one number<br/>
                                ⬩ At least one lowercase letter<br/>
                                ⬩ At least one uppercase letter
                            </p>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary w-40"
                                disabled={!isFormValid()}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;