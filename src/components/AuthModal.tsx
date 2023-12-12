import React, {useEffect, useState} from "react";
import useForm from "../hooks/useForm";

interface AuthModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    isSignup: boolean,
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthModal:React.FC<AuthModalProps> = ({setShowModal, isSignup, setIsSignup}:AuthModalProps) => {
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
            setMessage("Signup Successfully");
        }else {
            console.log("login payload", values);
            setMessage("Login Successfully");
        }
    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>
                &#10006;
            </div>

            <h2>{isSignup ? 'Create Account' : 'Log In'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                />
                {isSignup && (<input
                    type="password"
                    placeholder="Confirm password"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('confirmPassword', e.target.value)}
                />)}

                <button className="primary-button">{isSignup ? 'Continue' : 'Login'}</button>
                {isSignup && (<p className="auth-match-password-error">{error}</p>)}
                <p className="auth-message-success">{message}</p>
            </form>
        </div>
    )
}
export default AuthModal;