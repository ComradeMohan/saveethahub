// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <div style={{ maxWidth: '24rem' }} className="mx-auto mt-24">
            <h1 className='text-4xl  font-semibold text-center text-white '>Login</h1>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
