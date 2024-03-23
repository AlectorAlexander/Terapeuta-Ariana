// Função auxiliar para verificar se o ano é bissexto
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function generateYearWithHolidays(year) {
  const daysInMonths = [
    31, // Janeiro
    isLeapYear(year) ? 29 : 28, // Fevereiro
    31, // Março
    30, // Abril
    31, // Maio
    30, // Junho
    31, // Julho
    31, // Agosto
    30, // Setembro
    31, // Outubro
    30, // Novembro
    31  // Dezembro
  ];

  const yearArray = [];
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10); // Formato "YYYY-MM-DD"

  for (let month = 0; month < 12; month++) {
    const monthArray = [];
    for (let day = 1; day <= daysInMonths[month]; day++) {
      const date = new Date(year, month, day);
      const formattedDate = date.toISOString().slice(0, 10); // Formato "YYYY-MM-DD"
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0 é domingo e 6 é sábado
      const hasItAlrdyPassed = formattedDate <= formattedToday;

      monthArray.push({
        day,
        isHoliday: isWeekend,
        hasItAlrdyPassed
      });
    }
    yearArray.push(monthArray);
  }

  return yearArray;
}
