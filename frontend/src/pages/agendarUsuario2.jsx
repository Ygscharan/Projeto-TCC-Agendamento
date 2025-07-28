import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../agendarUsuario2.css';

const horariosPermitidos = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];


function formatarDataString(dataStr) {
  if (!dataStr) return '';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
}

const AgendarUsuario2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dataSelecionada = location.state?.data;
  const lojaId = location.state?.loja_id;
  const fornecedorId = localStorage.getItem('fornecedor_id');

  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [arquivoXML, setArquivoXML] = useState(null);

  useEffect(() => {
    async function buscarHorarios() {
      if (!dataSelecionada || !lojaId) return;

      try {
        const response = await axios.get(`http://localhost:3000/api/agendamentos?loja_id=${lojaId}`);
        console.log('Agendamentos recebidos:', response.data);
        const agendamentosDoDia = response.data.filter(
          ag => {
            
            const dataAg = (typeof ag.data_agendamento === 'string')
              ? ag.data_agendamento.slice(0, 10)
              : new Date(ag.data_agendamento).toISOString().slice(0, 10);
            return dataAg === dataSelecionada && ag.status !== 'CANCELADO';
          }
        );
        console.log('Agendamentos do dia:', agendamentosDoDia);

        const ocupados = agendamentosDoDia.map((ag) => {
          const data = new Date(ag.data_hora_inicio);
          const hora = data.getUTCHours().toString().padStart(2, '0');
          const minuto = data.getUTCMinutes().toString().padStart(2, '0');
          return `${hora}:${minuto}`;
        });
        console.log('Horários ocupados:', ocupados);
        setHorariosOcupados(ocupados);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    buscarHorarios();
  }, [dataSelecionada, lojaId]);

  const handleArquivoChange = (e) => {
    setArquivoXML(e.target.files[0]);
  };

  const handleAgendar = async () => {
    if (!horarioSelecionado) return alert('Selecione um horário');
    if (!arquivoXML) return alert('Selecione um arquivo XML');
    if (!lojaId) return alert('Loja não selecionada!');

    
    const tipoUsuario = localStorage.getItem('tipo');
    if (tipoUsuario === 'FORNECEDOR' && !fornecedorId) {
      return alert('Fornecedor não identificado!');
    }

    
    const [hora, minuto] = horarioSelecionado.split(':');
    const dataHora = new Date(`${dataSelecionada}T${hora}:${minuto}:00`);
    const dataHoraInicio = new Date(dataHora.getTime() - dataHora.getTimezoneOffset() * 60000); 
    const dataHoraFim = new Date(dataHoraInicio.getTime() + 59 * 60 * 1000 + 59000); 

    
    console.log('dataSelecionada:', dataSelecionada);
    console.log('dataHoraInicio (UTC):', dataHoraInicio.toISOString());
    console.log('dataHoraFim (UTC):', dataHoraFim.toISOString());

    const formData = new FormData();
    formData.append('loja_id', lojaId);
    formData.append('nota_fiscal_id', 1); 
    formData.append('data_agendamento', dataSelecionada);
    formData.append('data_hora_inicio', dataHoraInicio.toISOString());
    formData.append('data_hora_fim', dataHoraFim.toISOString());
    formData.append('status', 'pendente');
    formData.append('xml', arquivoXML);

    if (fornecedorId) {
      formData.append('fornecedor_id', fornecedorId);
    }
    
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
    }

    try {
      await axios.post('http://localhost:3000/api/agendamentos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Agendamento realizado com sucesso!');
      if (tipoUsuario === 'FORNECEDOR') {
        navigate('/pagina-inicial-fornecedor');
      } else {
        navigate('/pagina-inicial-usuario');
      }
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
      <h2>Agendar para o dia {formatarDataString(dataSelecionada)}</h2>

      <div className="horarios-disponiveis">
        {horariosPermitidos.map((horario) => {
          
          const [h, m] = horario.split(':');
          const horarioFormatado = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
          const ocupado = horariosOcupados.includes(horarioFormatado);

          
          let horarioPassado = false;
          const hojeStr = new Date().toISOString().slice(0, 10);
          if (dataSelecionada === hojeStr) {
            const agora = new Date();
            const horaAtual = agora.getHours();
            const minutoAtual = agora.getMinutes();
            if (parseInt(h) < horaAtual || (parseInt(h) === horaAtual && parseInt(m) <= minutoAtual)) {
              horarioPassado = true;
            }
          }

          return (
            <button
              key={horario}
              className={`botao-horario ${ocupado || horarioPassado ? 'ocupado' : ''} ${horarioSelecionado === horario ? 'selecionado' : ''}`}
              onClick={() => !ocupado && !horarioPassado && setHorarioSelecionado(horario)}
              disabled={ocupado || horarioPassado}
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
