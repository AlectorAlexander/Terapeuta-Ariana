import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { CalendarMonth } from '../terapy/Calendar';

// Mock das APIs
/* jest.mock('axios');
jest.mock('@/styles/terapy/Calendar.module.css', () => {
  return {
    default: {},
    __esModule: true,
  };
});

describe('CalendarMonth - Agendamentos de Terapias', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  it('deve permitir agendar um horário e não mostrar mais disponível para outras terapias', async () => {
    // Corrigido para usar jest.fn() em vez de t.fn()
    const mockSetFinalDateToPost = jest.fn();

    // Configuração do mock da API
    axios.post.mockImplementation(url => {
      if (url === '/api/schedules/findByDate') {
        return Promise.resolve({
          data: { start_date: new Date(), end_date: new Date(), status: 'agendado' }
        });
      }
      if (url === '/api/schedules/filterSlots') {
        return Promise.resolve({ data: ["14:00 - 15:00"] }); // Horário inicialmente disponível
      }
    });


    // Crie um mock de monthData. Isto deve refletir a estrutura de dados que o seu componente espera.
    // Por exemplo, se monthData é um array de semanas, onde cada semana é um array de objetos de dia:
    const mockMonthData = [
    // Semana 1
      [null, {day: 1, isHoliday: false, hasItAlrdyPassed: false}, {day: 2, isHoliday: false, hasItAlrdyPassed: false}, {day: 3, isHoliday: false, hasItAlrdyPassed: false}, {day: 4, isHoliday: false, hasItAlrdyPassed: false}, {day: 5, isHoliday: false, hasItAlrdyPassed: false}, {day: 6, isHoliday: false, hasItAlrdyPassed: false}],
      // Semana 2
      [{ day: 7, isHoliday: true, hasItAlrdyPassed: false }, {day: 8, isHoliday: false, hasItAlrdyPassed: false}, {day: 9, isHoliday: false, hasItAlrdyPassed: false}, {day: 10, isHoliday: false, hasItAlrdyPassed: false}, {day: 11, isHoliday: false, hasItAlrdyPassed: false}, {day: 12, isHoliday: false, hasItAlrdyPassed: false}, {day: 13, isHoliday: true, hasItAlrdyPassed: false}],
      // Semana 3 
      [[{ day: 14, isHoliday: true, hasItAlrdyPassed: false }, {day: 15, isHoliday: false, hasItAlrdyPassed: false}, {day: 16, isHoliday: false, hasItAlrdyPassed: false}, {day: 17, isHoliday: false, hasItAlrdyPassed: false}, {day: 18, isHoliday: false, hasItAlrdyPassed: false}, {day: 19, isHoliday: false, hasItAlrdyPassed: false}, {day: 20, isHoliday: true, hasItAlrdyPassed: false}]],
      // Semana 4
      [[{ day: 21, isHoliday: true, hasItAlrdyPassed: false }, {day: 22, isHoliday: false, hasItAlrdyPassed: false}, {day: 23, isHoliday: false, hasItAlrdyPassed: false}, {day: 24, isHoliday: false, hasItAlrdyPassed: false}, {day: 25, isHoliday: false, hasItAlrdyPassed: false}, {day: 26, isHoliday: false, hasItAlrdyPassed: false}, {day: 27, isHoliday: true, hasItAlrdyPassed: false}]],
      // Semana 5
      [[{ day: 28, isHoliday: true, hasItAlrdyPassed: false }, {day: 29, isHoliday: false, hasItAlrdyPassed: false}, {day: 30, isHoliday: false, hasItAlrdyPassed: false}, {day: 31, isHoliday: false, hasItAlrdyPassed: false}, null, null, null]],
    ];



    render(<CalendarMonth durationInMinutes={60} setFinalDateToPost={mockSetFinalDateToPost} monthData={mockMonthData} year={2024} monthIndex={3} />);
  
    // Simula a seleção de um dia e um horário
    await waitFor(() => screen.getByTestId('day-slot-2'));
    userEvent.click(screen.getByTestId('day-slot-2'));

    await waitFor(() => screen.getByTestId('time-slot-14:00 - 15:00'));
    userEvent.click(screen.getByTestId('time-slot-14:00 - 15:00'));

    await waitFor(() => {
      expect(mockSetFinalDateToPost).toHaveBeenCalledWith({
        start_date: expect.any(Date),
        end_date: expect.any(Date),
        status: 'agendado'
      });
    });

    expect(screen.queryByTestId('time-slot-14:00 - 15:00')).toBeNull();
  });
});
 */

// Importa o Cypress, que é geralmente feito globalmente e não precisa ser definido em cada arquivo
// caminho completo no sistema de arquivo Cypress: cypress/integration/CalendarMonth.spec.js

describe('CalendarMonth - Agendamentos de Terapias', () => {
  beforeEach(() => {
    // Limpa cookies e dados de sessão antes de cada teste
    cy.clearCookies();
    cy.clearLocalStorage();

    // Intercepta as chamadas de API e responde com dados mockados
    cy.intercept('POST', '/api/schedules/findByDate', {
      statusCode: 200,
      body: { start_date: new Date(), end_date: new Date(), status: 'agendado' }
    }).as('findByDate');

    cy.intercept('POST', '/api/schedules/filterSlots', {
      statusCode: 200,
      body: ["14:00 - 15:00"]  // Ajuste conforme a resposta real esperada
    }).as('filterSlots');

    // Visita a página do componente CalendarMonth
    cy.visit('/path-to-your-calendar-page');  // Atualize com o caminho correto da sua aplicação
  });

  it('deve permitir agendar um horário e não mostrar mais disponível para outras terapias', () => {
    // Espera pelas respostas das APIs
    cy.wait('@findByDate');
    cy.wait('@filterSlots');

    // Simula a seleção de um dia no calendário
    cy.get('[data-testid="day-slot-2"]').click();

    // Simula a seleção de um horário disponível
    cy.get('[data-testid="time-slot-14:00 - 15:00"]').click();

    // Verifica se o horário não está mais disponível após a seleção
    cy.get('[data-testid="time-slot-14:00 - 15:00"]').should('not.exist');

    // Adicionais: Confirma se o estado do componente foi atualizado conforme esperado
    cy.contains('Status: agendado').should('exist');
  });
});
