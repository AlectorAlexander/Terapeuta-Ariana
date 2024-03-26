import { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import EditScheduleModal from '@/components/painelAdmin/editBookingModal';
import { extrairDescricao, formatSlot } from '@/services/painelAdminServices';
import Loading from '@/components/Loading';
import styles from '@/styles/painelAdmin.module.css';
import ArianaContext from '@/context/ArianaContext';

const SchedulingList = () => {
  const [schedulings, setSchedulings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [client, setClient] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleChoosen, setSelectedSchedule] = useState(null);
  const [sessionName, setSessioName] = useState('');
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useContext(ArianaContext);

  const [filterClientName, setFilterClientName] = useState('');
  const [filterService, setFilterService] = useState('');

  const welcomeToModal = (schedule, sName) => {
    setSessioName(sName);
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  }; 

  const onClose = () => {
    setIsModalOpen(false);
  };

  const deletar = async (payment, session, schedule) => {
    const dataIds = {
      paymentId: payment._id,
      sessionId: session._id,
      scheduleId: schedule._id,
      paymentIntentId: payment.paymentIntentId
    };
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('/api/booking/delete', dataIds, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Agendamento deletado com sucesso!');
      await fetchSchedulings(token);
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
    }
  };

  const fetchSchedulings = async (token) => {
    setLoading(true);

    try {
      const response = await axios.get('/api/booking/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newPayments = [];
      const newSessions = [];
      const newSchedulings = [];
      const newClient = [];

      response.data.forEach((el) => {
        const { paymentData, sessionData, scheduleData, userData } = el;

        newPayments.push(paymentData);
        newSessions.push(sessionData);
        newSchedulings.push(scheduleData);
        newClient.push(userData);
      });

      setPayments(newPayments);
      setSessions(newSessions);
      setSchedulings(newSchedulings);
      setClient(newClient);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Erro ao buscar agendamentos:', error);
    }
  };

  const getFilteredSchedulings = useMemo(() => {
    return schedulings.filter((scheduling, i) => {
      const isClientMatch = !filterClientName || (client[i]?.name?.toLowerCase().includes(filterClientName.toLowerCase()));
      const sessionDescription = extrairDescricao(sessions[i]?.date); // Using the same function as the display logic
      const isServiceMatch = !filterService || (sessionDescription?.toLowerCase().includes(filterService.toLowerCase()));
      return isClientMatch && isServiceMatch;
    });
  }, [schedulings, client, filterClientName, filterService, sessions]);

  const onScheduleUpdated = async (updatedSchedule) => {
    setSchedulings(prevSchedulings => {
      return prevSchedulings.map((schedulings) => {
        if (schedulings._id === updatedSchedule._id) {
          return updatedSchedule;
        }
        return schedulings;
      });
    });
  
    setIsModalOpen(false);
    const token = localStorage.getItem('authToken');
    await fetchSchedulings(token);
    alert('Agendamento atualizado com sucesso!');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetchSchedulings(token);
  }, []);

  return isAdmin ? (
    <div className='d-flex justify-content-center align-items-center w-100 flex-column mt-5'>
      <div className='d-flex'>
        <TextField
          className='m-3 w-100'
          label="Nome do cliente"
          value={filterClientName}
          onChange={(e) => setFilterClientName(e.target.value)}
          margin="normal"
        />
        <TextField
          className='m-3 w-100'
          label="Serviço"
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          margin="normal"
        />
      </div>
      <Table>
        <EditScheduleModal backdrop='static' isOpen={isModalOpen} onClose={onClose} scheduleChoosen={scheduleChoosen} load={loading} sessionName={sessionName} onScheduleUpdated={onScheduleUpdated} reagendarData={{ payments, sessions }} />
     
        {loading ? (
          <caption style={{ textAlign: "center" }}>
            <Loading />
          </caption>
        ) : (
          <>
            <TableHead className={styles.tHead}>
              <TableRow className={styles.tHeadRow} >
                <TableCell className={styles.row}>Data</TableCell>
                <TableCell className={styles.row}>Cliente</TableCell>
                <TableCell className={styles.row}>Serviço</TableCell>
                <TableCell className={styles.row}>Valor da Sessão</TableCell>
                <TableCell className={styles.row}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredSchedulings.map((scheduling, i) => (
                <TableRow key={i}>
                  <TableCell>{formatSlot(scheduling.start_date, scheduling.end_date)}</TableCell>
                  <TableCell>{client[i].name}</TableCell>
                  <TableCell>{extrairDescricao(sessions[i].date)}</TableCell>
                  <TableCell>{payments[i].price}</TableCell>
                  <TableCell>
                    <Button className={styles.buttons} onClick={() => welcomeToModal(scheduling, extrairDescricao(sessions[i].date))}>Reagendar</Button>
                    <Button variant='danger' className={styles.buttons} onClick={() => deletar(payments[i], sessions[i], scheduling)}>Cancelar e Reembolsar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </div>
  ) : (
    <div className='w-100 h-100 mt-5 d-flex flex-column align-items-center'>
      <h1 className='mt-5'>
        ACESSO
      </h1>
      <h1 className='mt-5'>
        NÃO
      </h1>
      <h1 className='mt-5'>
        AUTORIZADO
      </h1>
    </div>
  );
};

export default SchedulingList;
