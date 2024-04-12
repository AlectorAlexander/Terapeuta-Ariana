import { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import EditScheduleModal from '@/components/painelAdmin/editBookingModal';
import { extrairDescricao, formatSlot } from '@/services/painelAdminServices';
import Loading from '@/components/Loading';
import styles from '@/styles/painelAdmin.module.css';
import ArianaContext from '@/context/ArianaContext';
import { compareAsc, compareDesc } from 'date-fns';

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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
      paymentId: payment && payment._id ? payment._id : 'SEM ID',
      sessionId: session && session._id ? session._id : 'SEM ID',
      scheduleId: schedule._id,
      paymentIntentId: payment && payment.paymentIntentId ? payment.paymentIntentId : ''
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
      console.log(response);

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

  const combinedData = useMemo(() => {
    return schedulings.map((scheduling, index) => ({
      scheduling,
      payment: payments[index],
      session: sessions[index],
      client: client[index]
    }));
  }, [schedulings, payments, sessions, client]);

  const filteredAndSortedData = useMemo(() => {
    const filteredData = combinedData.filter(({ client, session }) => {
      const isClientMatch = !filterClientName || client.name.toLowerCase().includes(filterClientName.toLowerCase());
      const sessionDescription = extrairDescricao(session.date);
      const isServiceMatch = !filterService || sessionDescription.toLowerCase().includes(filterService.toLowerCase());
      return isClientMatch && isServiceMatch;
    });

    if (!sortConfig.key) {return filteredData;}

    return filteredData.sort((a, b) => {
      const valueA = sortConfig.key === 'price' ? a.payment[sortConfig.key] : new Date(a.scheduling[sortConfig.key]);
      const valueB = sortConfig.key === 'price' ? b.payment[sortConfig.key] : new Date(b.scheduling[sortConfig.key]);

      return sortConfig.direction === 'ascending' ? compareAsc(valueA, valueB) : compareDesc(valueA, valueB);
    });
  }, [combinedData, filterClientName, filterService, sortConfig]);


  // Define a function to handle sorting based on the selected key (column header).
  const requestSort = (key) => {

    
    let direction = 'ascending';
    // If the selected key is already the sorting key and the direction is ascending,
    // change the direction to descending, otherwise set it to ascending.
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }


    // Update the sortConfig state with the new key and direction.
    setSortConfig({ key, direction });
  };


  


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
            <TableHead>
              <TableRow>
                <TableCell onClick={() => requestSort('start_date')}>Data</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Serviço</TableCell>
                <TableCell onClick={() => requestSort('price')}>Valor da Sessão</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedData.map(({ scheduling, client, session, payment }, i) => (
                <TableRow key={scheduling._id}>
                  <TableCell>{formatSlot(scheduling.start_date, scheduling.end_date)}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{extrairDescricao(session.date || session || "Sem informações")}</TableCell>
                  <TableCell>{payment && payment.price ? payment.price : "Sem informações"}</TableCell>
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

