// src/hooks/useAuth.ts

import { auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const useAuth = () => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            return { username: user.displayName, email: user.email }; // Return user details
        } catch (error) {
            console.error("Error signing in with Google:", error);
            throw error; // Handle errors appropriately in your application
        }
    };

    return { signInWithGoogle };
};

export default useAuth;
