import React, {useState} from "react";
import AuthModal from "../components/AuthModal";

const Home: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const handleSignupClick = () => {
        setShowModal(true);
        setIsSignup(true);
    }

    const handleLoginClick = () => {
        setShowModal(true);
        setIsSignup(false);
    }

    return (
        <div className="overlay">
            <div className="home">
                <h1 className="primary-title">Second Brain</h1>
                <article>
                    <p>Manage your life here. Create tasks list, personal financial state, daily blog</p>
                </article>
                <div className="home-buttons">
                    <button className="primary-button" onClick={handleSignupClick}>Create Account</button>
                    <button className="primary-button transparent-button" onClick={handleLoginClick}>Log in</button>
                </div>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignup={isSignup} setIsSignup={setIsSignup}/>
                )}
            </div>
        </div>
    )
}

export default Home;