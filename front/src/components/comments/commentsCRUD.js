import fs from 'fs';
import path from 'path';

// Caminho para o arquivo JSON
const filePath = path.join(process.cwd(), 'src/components/comments/comments.json');

// Ler depoimentos
export const readTestimonials = () => {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

export const editTestimonial = (index, updatedTestimonial) => {
  const testimonials = readTestimonials();
  const testimonialIndex = testimonials.findIndex((t, i) => i === index);
  
  if (testimonialIndex !== -1) {
    testimonials[testimonialIndex] = updatedTestimonial;
    fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2));
  }
};

export const removeTestimonial = (index) => {
  let testimonials = readTestimonials();
  const indexNumber = Number(index); // Garantindo que é um número
  testimonials = testimonials.filter((t, i) => i !== indexNumber);
  fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2));
};

  
  

// Adicionar um novo depoimento
export const addTestimonial = (newTestimonial) => {
  const testimonials = readTestimonials();
  testimonials.push(newTestimonial);

  // Mantenha apenas os 10 depoimentos mais recentes
  if (testimonials.length > 10) {
    testimonials.shift(); // Remove o depoimento mais antigo
  }

  fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2));
};
