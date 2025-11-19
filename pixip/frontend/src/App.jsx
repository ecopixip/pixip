import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LeadTable from "./components/LeadTable";
import UserPanel from "./components/UserPanel";

export default function App() {
  return (
    <div className="layout">
      <Navbar />

      <div className="main-content">
        <Sidebar />

        <div className="content">
          <h2>Dashboard — PIXIP Fase 1</h2>

          <div className="card">
            <h3>Leads Importados</h3>
            <LeadTable />
          </div>

          <div className="card">
            <h3>Usuários</h3>
            <UserPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
