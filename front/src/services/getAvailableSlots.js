import axios from "axios";

// Constantes que definem os horários de trabalho em minutos.
const WORK_START = 14 * 60; // 14:00 em minutos
const WORK_MID = 18 * 60; // 18:00 em minutos (horário de almoço começa)
const WORK_RESUME = 19 * 60; // 19:00 em minutos (horário de almoço termina)
const WORK_END = 21 * 60; // 21:00 em minutos (fim do expediente)

// Verifica se um novo slot sobrepõe algum compromisso existente.
export function isOverlappingWithBooked(start, duration, bookedAppointments) {
  const endOfNewSlot = start + duration;
  for (let appointment of bookedAppointments) {
    const startOfAppointment = (new Date(appointment.start_date).getHours() * 60) + new Date(appointment.start_date).getMinutes();
    const endOfAppointment = startOfAppointment + appointment.duration; // Assume que appointment.duration está em minutos.

    if (start < endOfAppointment && endOfNewSlot > startOfAppointment) {
      return true; // Há sobreposição.
    }
  }
  return false; // Não há sobreposição.
}

// Converte minutos desde meia-noite para horário HH:MM.
const convertToTime = (slot) => {
  const hours = Math.floor(slot / 60).toString().padStart(2, '0');
  const minutes = (slot % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Função principal para obter slots disponíveis.
export default function getAvailableSlots(bookedAppointments, durationInMinutes) {
  const occupiedSlots = new Set();

  // Adiciona os slots ocupados ao conjunto
  bookedAppointments.forEach(app => {
    const startMinute = (new Date(app.start_date).getHours() * 60) + new Date(app.start_date).getMinutes();
    const endMinute = (new Date(app.end_date).getHours() * 60) + new Date(app.end_date).getMinutes(); // Usando end_date para o fim do compromisso
    for (let i = startMinute; i < endMinute; i++) {
      occupiedSlots.add(i);
    }
  });

  // Remover horário de almoço dos slots ocupados
  for (let i = WORK_MID; i < WORK_RESUME; i++) {
    occupiedSlots.add(i);
  }

  const availableIntervals = [];

  // Procura por slots disponíveis
  const searchAvailableSlots = (start, end) => {
    for (let i = start; i + durationInMinutes <= end; i += durationInMinutes) {
      let isOccupied = false;
      
      // Verificar toda a duração do slot
      for (let j = i; j < i + durationInMinutes; j++) {
        if (occupiedSlots.has(j)) {
          isOccupied = true;
          break;
        }
      }
      
      if (!isOccupied) {
        const slotEnd = i + durationInMinutes;
        if (slotEnd <= end) {
          availableIntervals.push(`${convertToTime(i)} - ${convertToTime(slotEnd)}`);
        }
      }
    }
  };

  searchAvailableSlots(WORK_START, WORK_MID);
  searchAvailableSlots(WORK_RESUME, WORK_END);

  return availableIntervals;
}


// Outras funções dependem do contexto específico de sua aplicação e parecem não necessitar de ajustes diretos para esta correção.


export const addHourToDateToPost = (target, index, dateToPost, setClickedHoursIndex, setFinalDateToPost) => {
  setClickedHoursIndex(index);
  const timeInterval = target.innerText;
  const times = timeInterval.split('-');

  const startTime = times[0].trim();
  const endTime = times[1].trim();

  const startHour = startTime.split(':')[0];
  const startMinute = startTime.split(':')[1];
  const endHour = endTime.split(':')[0];
  const endMinute = endTime.split(':')[1];

  const startDate = new Date(dateToPost.year, dateToPost.month, dateToPost.day, startHour, startMinute);
  const endDate = new Date(dateToPost.year, dateToPost.month, dateToPost.day, endHour, endMinute);
  setFinalDateToPost({start_date: startDate, end_date: endDate});
};

export const showTheChoosenDate = async (durationInMinutes, chosenDate) => {
  const startDate = { start_date: chosenDate };
  try {
    const response = await axios.post('/api/schedules/findByDate', startDate);
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
