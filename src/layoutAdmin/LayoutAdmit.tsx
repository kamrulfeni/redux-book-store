import { ReactNode } from "react";
import AdminHeader from "../components/adminHeader/AdminHeader";


interface LayoutAdminProps {
  children: ReactNode;
}

const LayoutAdmit: React.FC<LayoutAdminProps> = ({ children }) => {
  return (
    <div className="layout">
      <AdminHeader />
      <main> {children} </main>
    </div>
  );
};

export default LayoutAdmit;