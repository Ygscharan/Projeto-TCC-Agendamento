import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../agendarUsuario2.css';

// Horários permitidos fixos
const horariosPermitidos = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const AgendarUsuario2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dataSelecionada = location.state?.data;

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!dataSelecionada) return;

    async function buscarHorarios() {
      try {
        const response = await axios.get('http://localhost:3000/api/agendamentos');

        const agendamentosDoDia = response.data.filter(
          ag => new Date(ag.data_hora_inicio).toISOString().slice(0, 10) === dataSelecionada
        );

        const horariosOcupados = agendamentosDoDia.map(ag => {
          const hora = new Date(ag.data_hora_inicio).toTimeString().slice(0, 5); // ex: "08:00"
          return hora;
        });

        const horariosLivres = horariosPermitidos.filter(
          hora => !horariosOcupados.includes(hora)
        );

        setHorariosDisponiveis(horariosLivres);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setCarregando(false);
      }
    }

    buscarHorarios();
  }, [dataSelecionada]);

  const handleAgendar = async () => {
    if (!horarioSelecionado) return alert('Selecione um horário');

    const dataHoraInicio = `${dataSelecionada}T${horarioSelecionado}:00`;
    const dataHoraFim = new Date(`${dataHoraInicio}`);
    dataHoraFim.setHours(dataHoraFim.getHours() + 1);

    try {
      await axios.post('http://localhost:3000/api/agendamentos', {
        fornecedor_id: 1, // Ajustar conforme necessário
        loja_id: 1,       // Ajustar conforme necessário
        nota_fiscal_id: 1, // Ajustar conforme necessário
        data_agendamento: dataSelecionada,
        data_hora_inicio: dataHoraInicio,
        data_hora_fim: dataHoraFim,
        status: 'pendente'
      });

      alert('Agendamento realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Erro ao realizar agendamento.');
    }
  };

  return (
    <div className="agendamento-container">
      <h2>Agendar para o dia {dataSelecionada}</h2>

      {carregando ? (
        <p>Carregando horários...</p>
      ) : (
        <div className="horarios-disponiveis">
          {horariosDisponiveis.length > 0 ? (
            horariosDisponiveis.map((horario) => (
              <button
                key={horario}
                className={`botao-horario ${horarioSelecionado === horario ? 'selecionado' : ''}`}
                onClick={() => setHorarioSelecionado(horario)}
              >
                {horario}
              </button>
            ))
          ) : (
            <p>Não há horários disponíveis para esta data.</p>
          )}
        </div>
      )}

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
