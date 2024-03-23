/* eslint-disable no-unused-vars */
import styles from "@/styles/terapy/ScheduleAndPay.module.css";
import CalendarAlector from './Calendar';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const ScheduleAndPayComponent = ({item, finalDateToPost,
  setFinalDateToPost, setContinuar}) => {

  const {price, duracao} = item;
  let formattedPrice = "";
  if (Number.isInteger(price)) {
    formattedPrice = `${price},00`;
  } else {
    formattedPrice = price.toString().replace('.', ',');
  }


  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const handleSelect = (selectedIndex, e) => {
    setMonth(selectedIndex);
  };

  useEffect(() => {
    if (month > 11) {
      setYear(prevYear => prevYear + 1);
      setMonth(0); // Reset the month to January
    }
    if (month < 0) {
      setYear(prevYear => prevYear - 1);
      setMonth(11); // Set the month to December
    }
  }, [month]);

  return (
    <div className={styles.ScheduleAndPayContainer}>
      <div className={styles.infos}>
        <p>{`R$ ${formattedPrice}`}</p>
        <p>{`Duração: ${duracao}`}</p>
      </div>
      <CalendarAlector finalDateToPost={finalDateToPost} setFinalDateToPost={setFinalDateToPost} year={year} month={month} handleSelect={handleSelect} item={item} />
      <Button
        variant="primary"
        className={styles.button}
        disabled={!finalDateToPost}
        onClick={() => setContinuar(true)}
      >
        Continuar
      </Button>
    </div>
  );
};

export default ScheduleAndPayComponent;
