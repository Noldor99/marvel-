/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hook/useTypedSelector";


interface AdminOnlyRouteProps {
  children: ReactNode | any;
}


const AdminOnlyRoute: FC<AdminOnlyRouteProps> = ({ children }: AdminOnlyRouteProps) => {

  const { userInfo } = useTypedSelector((state) => state.auth);

  

  if (userInfo?.roles?.find((role) => role === "ADMIN")) {
    return children;
  }

  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink: FC<AdminOnlyRouteProps> = ({ children }: AdminOnlyRouteProps) => {

  const { userInfo } = useTypedSelector((state) => state.auth);

  if (userInfo?.roles?.find((role) => role === "ADMIN")) {
    return children;
  }

  return null;
};

export default AdminOnlyRoute;
