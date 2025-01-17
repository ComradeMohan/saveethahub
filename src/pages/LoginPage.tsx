// src/pages/LoginPage.tsx

import React from 'react';
import LoginForm from '../components/LoginForm';

interface Props {
    setUser: (user: { username: string }) => void; // Define the prop type
}

const LoginPage: React.FC<Props> = ({ setUser }) => {
    return (
        <div className="mx-auto mt-24">
            
            <LoginForm setUser={setUser} />
        </div>
    );
};

export default LoginPage;
