import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const { user, setUser, logout, login } = useContext(AuthContext);
  return { user, setUser, logout, login };
};

export default useAuth;