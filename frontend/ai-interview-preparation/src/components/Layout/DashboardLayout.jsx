import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />

      {user && (
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      )}
    </>
  );
};

export default DashboardLayout;