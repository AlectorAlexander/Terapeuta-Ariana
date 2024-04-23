import axios from "axios";
import { differenceInMinutes, format, parseISO, setHours, setMinutes } from 'date-fns';

// Simplificando a conversão de minutos para HH:MM usando date-fns
// Constantes que definem os horários de trabalho em minutos.
const WORK_START = 14 * 60; // 14:00 em minutos
const WORK_MID = 18 * 60; // 18:00 em minutos (horário de almoço começa)
const WORK_RESUME = 19 * 60; // 19:00 em minutos (horário de almoço termina)
const WORK_END = 21 * 60; // 21:00 em minutos (fim do expediente)

// Verifica se um novo slot sobrepõe algum compromisso existente.
export function isOverlappingWithBooked(start, duration, bookedAppointments) {
  const endOfNewSlot = start + duration;
  return bookedAppointments.some(appointment => {
    const startOfAppointment = differenceInMinutes(parseISO(appointment.start_date), setHours(setMinutes(new Date(0), 0), 0));
    const endOfAppointment = startOfAppointment + appointment.duration;

    return start < endOfAppointment && endOfNewSlot > startOfAppointment;
  });
}

// Converte minutos desde meia-noite para horário HH:MM.
const convertToTime = (slot) => format(setMinutes(setHours(new Date(0), 0), slot), 'HH:mm');


// Função principal para obter slots disponíveis.
export default function getAvailableSlots(bookedAppointments, durationInMinutes) {
  const occupiedSlots = new Set();

  bookedAppointments.forEach(app => {
    const startMinute = differenceInMinutes(parseISO(app.start_date), setHours(setMinutes(new Date(0), 0), 0));
    const endMinute = startMinute + app.duration;
    for (let i = startMinute; i < endMinute; i++) {
      occupiedSlots.add(i);
    }
  });

  // Adiciona horário de almoço aos slots ocupados
  for (let i = WORK_MID; i < WORK_RESUME; i++) {
    occupiedSlots.add(i);
  }

  const slotInterval = 30; // Intervalo de tempo entre o início dos slots
  const availableIntervals = [];

  const searchAvailableSlots = (start, end) => {
    for (let i = start; i <= end; i += slotInterval) {
      let isFeasible = true;
      // Verifica a viabilidade do slot considerando a duração da sessão
      for (let j = i; j < i + durationInMinutes; j++) {
        if (occupiedSlots.has(j) || j >= WORK_MID && i < WORK_RESUME) { // Checa sobreposição com almoço também
          isFeasible = false;
          break;
        }
      }

      if (isFeasible) {
        const slotEndTime = i + durationInMinutes;
        if (slotEndTime <= end || (i < WORK_MID && slotEndTime <= WORK_MID) || (i >= WORK_RESUME && slotEndTime <= WORK_END)) {
          availableIntervals.push(`${convertToTime(i)} - ${convertToTime(slotEndTime)}`);
        }
      }
    }
  };

  searchAvailableSlots(WORK_START, WORK_MID);
  searchAvailableSlots(WORK_RESUME, WORK_END);

  return availableIntervals;
}



export const addHourToDateToPost = (target, index, dateToPost, setClickedHoursIndex, setFinalDateToPost) => {
  setClickedHoursIndex(index);
  const [startTime, endTime] = target.innerText.split(' - ').map(t => t.trim());

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startDate = setMinutes(setHours(new Date(dateToPost.year, dateToPost.month, dateToPost.day), startHour), startMinute);
  const endDate = setMinutes(setHours(new Date(dateToPost.year, dateToPost.month, dateToPost.day), endHour), endMinute);

  setFinalDateToPost({ start_date: startDate, end_date: endDate });
};

export const showTheChoosenDate = async (durationInMinutes, chosenDate) => {
  const startDate = { start_date: chosenDate };
  try {
    const response = await axios.post('/api/schedules/findByDate', startDate);
    console.log(response);
    const getAvailableSchedules = getAvailableSlots(response.data, durationInMinutes);
    const filterAvailableSlots = await filterSlots(chosenDate, getAvailableSchedules);
    return filterAvailableSlots;
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
  }
};

export const convertToMinutes = (duration) => {
  let totalMinutes = 0;

  const hoursMatch = duration.match(/(\d+)hr/);
  const minutesMatch = duration.match(/(\d+)min/);

  if (hoursMatch) {
    totalMinutes += parseInt(hoursMatch[1], 10) * 60;
  }

  if (minutesMatch) {
    totalMinutes += parseInt(minutesMatch[1], 10);
  }

  return totalMinutes;
};

export const filterSlots = async (date, slots) => {
  try {
    const response = await axios.post('/api/schedules/filterSlots', {
      date,
      slots
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
  }
};
