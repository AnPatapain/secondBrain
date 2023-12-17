import React, {useEffect, useState} from "react";
import useForm from "../hooks/useForm";
import {useNavigate} from "react-router-dom";

interface AuthModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    isSignup: boolean,
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthModal:React.FC<AuthModalProps> = ({setShowModal, isSignup, setIsSignup}:AuthModalProps) => {
    const navigate = useNavigate();
    const {values, handleChange, resetForm} = useForm({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>("")

    useEffect(() => {
        values.password !== values.confirmPassword ? setError("Error: Password do not match") : setError("")
    }, [values])

    const handleClick = () => {
        setShowModal(false)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(isSignup) {
            console.log("signup payload", values);
            setIsSignup(false);
            setMessage("Signup Successfully");
        }else {
            console.log("login payload", values);
            setMessage("Login Successfully");
            navigate("/page");
        }
    }

    return (
        <div className="max-w-md p-4 bg-slate-800">
            <div className="cursor-pointer float-right" onClick={handleClick}>
                &#10006;
            </div>

            <h2 className="text-2xl font-bold text-center">{isSignup ? 'Create Account' : 'Log In'}</h2>
            <form className="max-w-sm flex flex-col mx-auto my-2" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                    className="my-1 rounded-md h-8"
                />
                <input
                    type="password"
                    placeholder="Password"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                    className="my-1 rounded-md h-8"
                />
                {isSignup && (<input
                    type="password"
                    placeholder="Confirm password"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('confirmPassword', e.target.value)}
                    className="my-1 rounded-md h-8"
                />)}

                <button className="btn btn-success text-xl my-8">{isSignup ? 'Continue' : 'Login'}</button>
                {isSignup && (<p className="auth-match-password-error">{error}</p>)}
                <p className="auth-message-success">{message}</p>
            </form>
        </div>
    )
}
export default AuthModal;