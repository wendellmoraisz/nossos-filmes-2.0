import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
    localUser?: object
}

const ProtectedRoute = ({ localUser }: Props) => {

    const { user } = useAuth();

    if (!localUser && !user) return <Navigate to="/login" />

    return <Outlet />;
};

export default ProtectedRoute;