import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const { user, logout, login } = useContext(AuthContext);
  return { user, logout, login };
};

export default useAuth;