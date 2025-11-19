import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadTable() {
  const [leads, setLeads] = useState([]);

  async function carregarLeads() {
    try {
      const url = import.meta.env.VITE_API_URL + "/api/leads";
      const response = await axios.get(url);
      setLeads(response.data);
    } catch (err) {
      console.error("Erro ao carregar leads:", err);
    }
  }

  useEffect(() => {
    carregarLeads();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.email}</td>
            <td>{lead.phone}</td>
            <td>{lead.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
