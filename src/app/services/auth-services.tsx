import { createContext, PropsWithChildren, useContext, useState } from "react";
import User from "../models/User";
import { AuthFormState } from "../components/auth/login-form";

interface AuthContextType {
    user?: User;
    loading: boolean;

    login: (credentials: AuthFormState) => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: PropsWithChildren) {
    // ...
    // Der restliche Code bleibt unverändert
}

export default AuthContext;
