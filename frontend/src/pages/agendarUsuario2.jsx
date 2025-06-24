import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../agendarUsuario2.css';

const horariosPermitidos = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const AgendarUsuario2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dataSelecionada = location.state?.data;

  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [arquivoXML, setArquivoXML] = useState(null);

  useEffect(() => {
    async function buscarHorarios() {
      if (!dataSelecionada) return;

      try {
        const response = await axios.get('http://localhost:3000/api/agendamentos');
        const agendamentosDoDia = response.data.filter(
          ag => ag.data_agendamento === dataSelecionada
        );

        const ocupados = agendamentosDoDia.map((ag) => {
          const data = new Date(ag.data_hora_inicio);
          const hora = data.getUTCHours().toString().padStart(2, '0');
          const minuto = data.getUTCMinutes().toString().padStart(2, '0');
          return `${hora}:${minuto}`;
        });

        setHorariosOcupados(ocupados);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    buscarHorarios();
  }, [dataSelecionada]);

  const handleArquivoChange = (e) => {
    setArquivoXML(e.target.files[0]);
  };

  const handleAgendar = async () => {
    if (!horarioSelecionado) return alert('Selecione um horário');
    if (!arquivoXML) return alert('Selecione um arquivo XML');

    // Cria um objeto Date no horário local e depois converte para UTC
    const [hora, minuto] = horarioSelecionado.split(':');
    const dataHora = new Date(`${dataSelecionada}T${hora}:${minuto}:00`);
    const dataHoraInicio = new Date(dataHora.getTime() - dataHora.getTimezoneOffset() * 60000); // Corrige timezone
    const dataHoraFim = new Date(dataHoraInicio.getTime() + 59 * 60 * 1000 + 59000); // +59min59s

    const formData = new FormData();
    formData.append('fornecedor_id', 1);
    formData.append('loja_id', 1);
    formData.append('nota_fiscal_id', 1);
    formData.append('data_agendamento', dataSelecionada);
    formData.append('data_hora_inicio', dataHoraInicio.toISOString());
    formData.append('data_hora_fim', dataHoraFim.toISOString());
    formData.append('status', 'pendente');
    formData.append('xml', arquivoXML);

    try {
      await axios.post('http://localhost:3000/api/agendamentos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Agendamento realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      if (error.response?.status === 409) {
        alert('Este horário já está ocupado. Selecione outro.');
      } else {
        alert('Erro ao realizar agendamento.');
      }
    }
  };

  return (
    <div className="agendamento-container">
      <h2>Agendar para o dia {dataSelecionada}</h2>

      <div className="horarios-disponiveis">
        {horariosPermitidos.map((horario) => {
          const ocupado = horariosOcupados.includes(horario);
          return (
            <button
              key={horario}
              className={`botao-horario ${ocupado ? 'ocupado' : ''} ${horarioSelecionado === horario ? 'selecionado' : ''}`}
              onClick={() => !ocupado && setHorarioSelecionado(horario)}
              disabled={ocupado}
            >
              {horario}
            </button>
          );
        })}
      </div>

      <input type="file" accept=".xml" onChange={handleArquivoChange} />
      <button
        className="botao-confirmar"
        onClick={handleAgendar}
        disabled={!horarioSelecionado}
      >
        Confirmar Agendamento
      </button>
    </div>
  );
};

export default AgendarUsuario2;
