import {createContext, PropsWithChildren, useContext, useState} from "react";
import User from "../models/User";
import { AuthFormState } from "../components/auth/loginForm";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase-config";


interface AuthContextType {
    user?: User;
    loading: boolean;

    login: (credentials: AuthFormState) => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({children}: PropsWithChildren) {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (credentials: AuthFormState) => {
        setLoading(true);
        if (!credentials.isSignUpMode) {
            try {
                const {user} = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
                setUser({...user} as User);
            } catch (e) {
                console.error('This account does not exist!');
            }
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
                const user = userCredential.user;
                const displayName = `${credentials.firstName} ${credentials.lastName}`;
                await updateProfile(user, {
                    displayName: displayName,
                });
                setUser({...user, displayName} as User);

            } catch (error) {
                console.error('Error creating user:', error);
            }
        }

        setLoading(false);
    }

    const logOut = () => {
        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{user: user, loading: loading, login: login, logOut: logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}


