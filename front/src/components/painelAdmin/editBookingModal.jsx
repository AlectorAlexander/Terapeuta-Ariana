import React, { useState, useEffect } from 'react';
import { showTheChoosenDate } from '@/services/getAvailableSlots';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import Loading from '../Loading';

dayjs.extend(utc);

dayjs.extend(customParseFormat);

const EditScheduleModal = ({ isOpen, onClose, scheduleChoosen, onScheduleUpdated, sessionName, load }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formattedSlot, setFormattedSlot] = useState({start: null, end: null});


  useEffect(() => {
    if (selectedDate) {
      calculateAvailableSlots(selectedDate);
    }
  }, [selectedDate]);


  const calculateAvailableSlots = async (date) => {
    try {
      const sessionDuration = calculateSessionDuration(scheduleChoosen);
      
      // Ajusta a data para meia-noite na zona horária local
      let chosenDate = new Date(date);
      chosenDate.setHours(0, 0, 0, 0);

      // Ajusta a data para representar '03:00:00.000Z' UTC
      // Considerando que a data deve representar meia-noite em UTC-3
      chosenDate.setUTCHours(3, 0, 0, 0);
      
      const dateString = chosenDate.toISOString();

      // Usa dateString diretamente, já que ela está no formato correto
      const slots = await showTheChoosenDate(sessionDuration, new Date(dateString));
      setAvailableSlots(slots);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar agendamentos existentes:', error);
      setIsLoading(false);
    }
  };

  
  
  const calculateSessionDuration = (chosenSchedule) => {
    const start = dayjs(chosenSchedule.start_date);
    const end = dayjs(chosenSchedule.end_date);
    return end.diff(start, 'minute');
  };

  const handleDateChange = (newValue) => {
    setIsLoading(true);
    setSelectedDate(newValue);
    setAvailableSlots([]);
    setSelectedSlot(null);
  };


  const handleSlotSelection = (event) => {
    const slotValue = event.target.value;
    setSelectedSlot(slotValue);
    if (slotValue) {
      const [startTime, endTime] = slotValue.split(' - ');
      const selectedDateFormatted = dayjs(selectedDate).format('YYYY-MM-DD');
  
      // Converter para objetos Date em UTC
      const startDateTimeUTC = dayjs(`${selectedDateFormatted}T${startTime}`).utc().format();
      const endDateTimeUTC = dayjs(`${selectedDateFormatted}T${endTime}`).utc().format();
  
      setFormattedSlot({
        start: startDateTimeUTC,
        end: endDateTimeUTC,
      });
    } else {
      setFormattedSlot({ start: null, end: null });
    }
  };
  


  const reagendar = async () => {
    const schedule_id = scheduleChoosen._id;
    const scheduleData = {
      _id: schedule_id,
      start_date: formattedSlot.start,
      end_date: formattedSlot.end,
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put('/api/booking/updated', {schedule_id, scheduleData, sessionName}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await onScheduleUpdated(response.data);
      setAvailableSlots([]);
      setSelectedSlot([null]);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar o agendamento:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      {load ? <div className='d-flex justify-content-center align-items-center m-5 p-5 w-100 h-100'> <Loading /> </div> : (
        <><Modal.Header closeButton>
          <Modal.Title>Editar Agendamento</Modal.Title>
        </Modal.Header><Modal.Body>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <Form.Control {...params} />} />
          </LocalizationProvider>
          {isLoading ? <div className='d-flex justify-content-center align-items-center'> <Loading /> </div> :
            availableSlots && availableSlots.length > 0 ? (
              <Form.Select aria-label="Available Slots" onChange={handleSlotSelection} value={selectedSlot}>
                <option value="">Selecione um horário</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </Form.Select>)
              : (
                <p>Não há horários disponíveis para a data selecionada. Selecione outra data.</p>
              )}
        </Modal.Body><Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={reagendar} disabled={!selectedSlot}>Salvar</Button>
        </Modal.Footer></>)}
    </Modal>
  );
  
  
};

export default EditScheduleModal;
