import Loading from "../components/Loading/Loading";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useGetMyDataQuery } from "../redux/features/user/userApi";
import { addUser } from "../redux/features/user/userSlice";
import { useAppDispatch } from "../redux/hooks";
import "./layout.css";
import React, { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetMyDataQuery(undefined);

  useEffect(() => {
    if (data?.success) {
      dispatch(addUser(data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="layout">
      <Header />
      <main> {children} </main>
      <Footer />
    </div>
  );
};

export default Layout;
