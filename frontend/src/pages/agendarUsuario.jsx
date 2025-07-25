import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../agendarUsuario.css';

const locales = { 'pt-BR': ptBR };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomToolbar = (toolbar) => {
  const goToBack = () => toolbar.onNavigate('PREV');
  const goToNext = () => toolbar.onNavigate('NEXT');
  const goToCurrent = () => toolbar.onNavigate('TODAY');
  const label = format(toolbar.date, "MMMM 'de' yyyy", { locale: ptBR });

  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button onClick={goToBack}>Anterior</button>
        <button onClick={goToCurrent}>Hoje</button>
        <button onClick={goToNext}>Próximo</button>
      </div>
      <span className="rbc-toolbar-label">{label}</span>
    </div>
  );
};

const CustomWeekHeader = ({ label }) => {
  const dias = {
    'Sun': 'Dom', 'Mon': 'Seg', 'Tue': 'Ter', 'Wed': 'Qua',
    'Thu': 'Qui', 'Fri': 'Sex', 'Sat': 'Sáb'
  };
  return <span>{dias[label] || label}</span>;
};

const AgendarUsuario = () => {
  const [lojas, setLojas] = useState([]);
  const [lojaSelecionada, setLojaSelecionada] = useState('');
  const [eventos, setEventos] = useState([]);
  const [dataBase, setDataBase] = useState(() => {
    const hoje = new Date();
    return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  });
  const navigate = useNavigate();

  const gerarHorariosDisponiveis = (dataStr) => {
    const horarios = [];
    const turnos = [{ inicio: 8, fim: 11 }, { inicio: 13, fim: 18 }];

    turnos.forEach((turno) => {
      for (let hora = turno.inicio; hora < turno.fim; hora++) {
        const inicio = new Date(`${dataStr}T${hora.toString().padStart(2, '0')}:00:00`);
        const fim = new Date(`${dataStr}T${(hora + 1).toString().padStart(2, '0')}:00:00`);
        horarios.push({ hora, start: inicio, end: fim });
      }
    });
    return horarios;
  };

  useEffect(() => {
    async function fetchLojas() {
      try {
        const response = await axios.get('http://localhost:3000/api/lojas');
        setLojas(response.data);
      } catch (error) {
        console.error('Erro ao buscar lojas:', error);
      }
    }
    fetchLojas();
  }, []);

  useEffect(() => {
    if (!lojaSelecionada) return;

    async function fetchAgendamentos() {
      try {
        const response = await axios.get(`http://localhost:3000/api/agendamentos?loja_id=${lojaSelecionada}`);
        const agendamentos = response.data;
        const eventosFormatados = [];
        const agendadosPorData = {};

        agendamentos.forEach((item) => {
          if (item.status !== 'CANCELADO') {
            const data = typeof item.data_agendamento === 'string' ? item.data_agendamento.slice(0, 10) : new Date(item.data_agendamento).toISOString().slice(0, 10);
            const dataHora = new Date(item.data_hora_inicio);
            const hora = dataHora.getUTCHours().toString().padStart(2, '0');
            const minuto = dataHora.getUTCMinutes().toString().padStart(2, '0');
            const horarioCompleto = `${hora}:${minuto}`;

            if (!agendadosPorData[data]) agendadosPorData[data] = [];
            agendadosPorData[data].push(horarioCompleto);
          }
        });

        const ano = dataBase.getFullYear();
        const mes = dataBase.getMonth();
        const ultimoDia = new Date(ano, mes + 1, 0);
        const diasNoMes = ultimoDia.getDate();
        const hoje = new Date();
        const hojeStr = format(hoje, 'yyyy-MM-dd');

        for (let i = 0; i < diasNoMes; i++) {
          const dataBaseDia = new Date(ano, mes, i + 1);
          const dataStr = format(dataBaseDia, 'yyyy-MM-dd');
          const horarios = gerarHorariosDisponiveis(dataStr);
          const horasAgendadas = agendadosPorData[dataStr] || [];
          const disponiveis = horarios.filter(({ hora, start }) => {
            const horaStr = hora.toString().padStart(2, '0') + ':00';
            if (dataStr === hojeStr) {
              const agora = new Date();
              if (start <= agora) return false;
            }
            return !horasAgendadas.includes(horaStr);
          });

          const start = horarios[0].start;
          const end = horarios[horarios.length - 1].end;
          let isDiaPassado = dataStr < hojeStr;

          eventosFormatados.push({
            id: dataStr,
            title: isDiaPassado ? 'Data passada' : disponiveis.length > 0 ? `${disponiveis.length} horário(s) disponível(eis)` : 'Agendado',
            start,
            end,
            status: isDiaPassado ? 'passado' : disponiveis.length > 0 ? 'disponivel' : 'agendado'
          });
        }
        setEventos(eventosFormatados);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }
    fetchAgendamentos();
  }, [lojaSelecionada, dataBase]);

  const eventStyleGetter = (event) => {
    const colors = {
      disponivel: '#22c55e',
      agendado: '#71717a',
      passado: '#d4d4d8'
    };
    return {
      style: {
        backgroundColor: colors[event.status] || '#38bdf8',
        color: '#fff',
        borderRadius: '6px',
        padding: '6px',
        fontWeight: '500'
      },
    };
  };

  const handleSelectSlot = (slotInfo) => {
    const dataSelecionada = format(slotInfo.start, 'yyyy-MM-dd');
    const hojeStr = format(new Date(), 'yyyy-MM-dd');
    if (dataSelecionada < hojeStr) return;
    navigate('/agendar-usuario2', { state: { data: dataSelecionada, loja_id: lojaSelecionada } });
  };

  const handleNavigate = (newDate) => {
    setDataBase(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
  };

  return (
    <div className="agendamento-container">
      <div className="top-bar">
        <h2>Agendamento de Cargas</h2>
        <div className="perfil-box">
          <span className="perfil-nome">Usuário</span>
        </div>
      </div>

      <div className="campo">
        <label htmlFor="loja">Selecione a Loja:</label>
        <select
          id="loja"
          value={lojaSelecionada}
          onChange={e => setLojaSelecionada(e.target.value)}
        >
          <option value="">-- Escolha uma loja --</option>
          {lojas.map(loja => (
            <option key={loja.id} value={loja.id}>{loja.nome}</option>
          ))}
        </select>
      </div>

      {lojaSelecionada && (
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          messages={{
            next: 'Próximo', previous: 'Anterior', today: 'Hoje',
            month: 'Mês', week: 'Semana', day: 'Dia', agenda: 'Agenda',
            date: 'Data', time: 'Hora', event: 'Evento',
            noEventsInRange: 'Não há eventos neste período.',
            showMore: total => `+${total} mais`
          }}
          views={['month']}
          defaultView="month"
          onNavigate={handleNavigate}
          date={dataBase}
          components={{ toolbar: CustomToolbar, month: { header: CustomWeekHeader } }}
        />
      )}
    </div>
  );
};

export default AgendarUsuario;
