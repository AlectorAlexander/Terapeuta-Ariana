export function formatSlot(start_date, end_date) {
  // Função auxiliar para formatar a data no formato desejado
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} às ${hours}:${minutes}`;
  };
  
  // Formatar as datas de início e término
  const formattedStartDate = formatDate(start_date);
  const formattedEndDate = formatDate(end_date);
  
  // Construir a string do slot
  const slotString =  `${formattedStartDate}\nATÉ\n${formattedEndDate}`;
  
  return slotString;
}
  
export function extrairDescricao(frase) {
  // Usa uma expressão regular para combinar 'agendada' ou 'reagendada'
  const strng = '(agendada|reagendada)';
  // Note o uso de backticks e ${} para incorporar a variável strng na regex
  const regex = new RegExp(`Nova sessão de (.+?) ${strng}`, 'i'); // 'i' para case-insensitive, se necessário
  const match = regex.exec(frase);
  if (match && match.length > 1) {
    return match[1];
  } else {
    return "Descrição não encontrada";
  }
}
