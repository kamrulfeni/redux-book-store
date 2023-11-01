import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const AuthRoute = ({ children }: { children: ReactNode }) => {
  const { isLogging } = useAppSelector((state) => state.user);

  if (!isLogging) {
    return <Navigate to="/signin" />;
  }

  return <> {children} </>;
};

export default AuthRoute;
