import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const nomeEmpresa = localStorage.getItem('fornecedor_nome');
    console.log('Nome da empresa encontrado no localStorage:', nomeEmpresa);

    if (!nomeEmpresa) {
      setErro('Empresa do fornecedor não encontrada.');
      return;
    }

    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/agendamentos/fornecedor/${encodeURIComponent(nomeEmpresa)}`
        );
        setAgendamentos(response.data);
      } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
        setErro('Erro ao buscar agendamentos');
      }
    };

    fetchAgendamentos();
  }, []);

  return (
    <div className="container">
      <h2>Meus Agendamentos</h2>
      {erro && agendamentos.length === 0 && <p className="erro">{erro}</p>}
      {!erro && agendamentos.length === 0 && <p>Nenhum agendamento encontrado.</p>}

      <ul>
        {agendamentos.map((agendamento) => (
          <li key={agendamento.id}>
            <strong>Data:</strong> {agendamento.data_agendamento} | 
            <strong> Horário:</strong> {agendamento.data_hora_inicio} | 
            <strong> Loja:</strong> {agendamento.loja?.nome || 'N/A'}
            <strong> Fornecedor:</strong> {agendamento.fornecedorAgendamento?.nome || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeusAgendamentos;
