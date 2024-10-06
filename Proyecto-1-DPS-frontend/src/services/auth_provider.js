import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "./api";
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const loginMutation = useMutation(login, {
        onSuccess: (result) => {
            setToken(result.token);
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", jwtDecode(result.token))
            navigate("/projects")
        }
    })

    const initLogin = async (data) => {
        loginMutation.mutate(data)
    }

    const logOut = async (data) => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken("")
    }

    return <AuthContext.Provider value={{ token, initLogin, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};