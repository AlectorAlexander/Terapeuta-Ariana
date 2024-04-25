import { generateYearWithHolidays } from '@/services/scheduleLogic';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import styles from '@/styles/terapy/Calendar.module.css';
import { addHourToDateToPost, convertToMinutes, showTheChoosenDate } from '@/services/getAvailableSlots';
import Loading from '../Loading';
// eslint-disable-next-line no-unused-vars
import { signOut } from '@/services/auth';

export function CalendarMonth({durationInMinutes, setFinalDateToPost, monthData, year, monthIndex }) {
  const [clickedDay, setClickedDay] = useState(null);
  const [availableSchedules, setAvailableSchedules] = useState(null);
  const [dayElement, setDayElement] = useState(null);
  const [indexWeek, setWeekIndex] = useState(null);
  const [marginWeekIndex, setMarginWeekIndex] = useState(null);
  const [dateToPost, setDateToPost] = useState(null);
  const [clickedHoursIndex, setClickedHoursIndex] = useState(null);
  const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const [loading, setLoading] = useState(false);

  const configBeforeChoosenDate = async (day, monthIndex, year, target, weekIndex) => {
    try {
      setLoading(true);
      setWeekIndex(weekIndex);
      setClickedDay(day);
      setDayElement(target);
     
      // Create the date
      const chosenDate = new Date(year, monthIndex, day);
      setDateToPost({year, month: monthIndex, day});
  
      const response = await showTheChoosenDate(durationInMinutes, chosenDate);
      setAvailableSchedules(response);
      setLoading(false);
    } catch (error) {
      // Handle any errors here
      console.error("An error occurred:", error);
      setLoading(false); // Make sure to reset loading state in case of error
    }
  };
  

  useEffect(() => {
    setClickedHoursIndex(null);
    setFinalDateToPost(null);
  }, [clickedDay]);


  useEffect(() => {
    if (clickedDay) {
      const appearElement = dayElement.nextElementSibling;
      if (appearElement) {
        const hasClass = Array.from(appearElement.classList).some(className => 
          /Calendar_appear/.test(className)
        );
  
        if (hasClass) {
          setMarginWeekIndex(indexWeek);
        } else {
          setMarginWeekIndex(null);
        }
      }
    }
  }, [clickedDay]);

  const AvailableSchedules = (availableSchedules) => {
    return !loading ?
      availableSchedules
        .map((schedule, index) => {
          return (
            <li
              data-testid={`time-slot-${schedule}`}
              className={clickedHoursIndex === index ? styles.selected : ''}
              onClick={({target}) => addHourToDateToPost(target, index, dateToPost, setClickedHoursIndex, setFinalDateToPost)} key={index}>{schedule}</li>);})
      : <Loading />;
  };

  return (
    <Table hover className={styles.calendar}>
      <thead>
        <tr>
          {daysOfWeek.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {monthData.map((week, weekIndex) => (
          <tr className={`braza ${weekIndex === marginWeekIndex ? styles.marginTopMagic : ''}`} key={weekIndex}>
            {week.map((day, dayIndex) => {
              const testId = day ? `day-slot-${day.day}-month-${monthIndex}` : `day-slot-null-${dayIndex}`;
              if (!day) {
                return <td data-testid={testId}  key={dayIndex}></td>;
              }
              return (
                <td data-testid={testId} key={dayIndex} style={day.isHoliday || day.hasItAlrdyPassed ? { textDecoration: 'line-through' } : {}}>
                  <div 
                    onClick={({ target }) => {
                      if (!day.hasItAlrdyPassed) {
                        configBeforeChoosenDate(day.day, monthIndex, year, target, weekIndex);
                      }
                    }}
                    className={`day ${day.isHoliday || day.hasItAlrdyPassed ? styles.nonClickable : styles.day}`}
                  >
                    {day.day}
                  </div>
                  {day.day === clickedDay ? <ul className={`animate__animated animate__fadeIn ${styles.appear}`}>{
                    availableSchedules && availableSchedules.length > 0 ? AvailableSchedules(availableSchedules) : availableSchedules && availableSchedules.length === 0 && !loading ? (<p style={{color: 'white', fontSize: "20px"}}>Não há horários disponíveis pra esse dia</p>) :  <Loading />  
                  }</ul> : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}




function CalendarAlector({ year, month, handleSelect, item, setFinalDateToPost}) {
  const [durationInMinutes, setDurationInMinutes] = useState(0);

  useEffect(() => {
    if (item.duracao) {
      setDurationInMinutes(convertToMinutes(item.duracao));
    }
  }, [item]);


  const yearData = generateYearWithHolidays(year);

  function monthToWeeks(month, year, monthIndex) {
    const weeks = [];
    let currentWeek = Array(7).fill(null); // começa a semana com espaços vazios
  
    // Descobrir em que dia da semana o mês começa
    const startDay = new Date(year, monthIndex, 1).getDay();
    
    month.forEach((day, dayIndex) => {
      const slot = (startDay + dayIndex) % 7;
      currentWeek[slot] = day;
      if (slot === 6) {  // Se for domingo
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null); // começa uma nova semana
      }
    });
    if (currentWeek.some(item => item !== null)) {
      weeks.push(currentWeek); // push da última semana, se não estiver vazia
    }
    return weeks;
  }

  return (
    <div className={styles.calendarComplete}>
      <p className='mt-2'>Selecione a data e o horário:</p>
      <h3>{year}</h3>
      <Carousel
        bg="dark"
        activeIndex={month}
        interval={null}
        controls={true}
        onSelect={handleSelect}
      >

        {yearData.map((month, index) => (
          <Carousel.Item key={index}>
            <div key={index}>
              <h3>{new Date(year, index).toLocaleString('default', { month: 'long' })}</h3>
              <CalendarMonth durationInMinutes={durationInMinutes}
                setFinalDateToPost={setFinalDateToPost} monthData={monthToWeeks(month, year, index)} year={year} monthIndex={index} />
            </div>
          </Carousel.Item>
        ))}

      </Carousel>
    </div>
  );
}

export default CalendarAlector;

