import React, { useState } from 'react';
import Modal from './Modal';

const Login = () => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Here you can handle the login process.
        // For example, you can send a request to your server with the username and password.
        console.log(`Username: ${username}, Password: ${password}`);
        setShowModal(false);
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Login</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleLogin}>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default Login;