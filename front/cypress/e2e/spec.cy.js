import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';


describe('CalendarMonth - Agendamentos de Terapias', () => {
  beforeEach(() => {
    // Limpa cookies e dados de sessão antes de cada teste
    cy.clearCookies();
    cy.clearLocalStorage();

    // Intercepta as chamadas de API e responde com dados mockados
    cy.intercept('POST', '/api/schedules/findByDate', {
      statusCode: 200,
      body: [{ start_date: "2024-04-24T11:00:00.000Z", end_date: "2024-04-24T18:00:00.000Z", status: 'agendado' }, 
      { start_date: "2024-04-24T18:00:00.000Z", end_date: "2024-04-24T18:00:00.000Z", status: 'agendado' }]
      /* body: ['14:00 - 15:00', '14:30 - 15:30', '15:00 - 16:00', '15:30 - 16:30', '16:00 - 17:00', '16:30 - 17:30', '17:00 - 18:00', '19:00 - 20:00', '19:30 - 20:30', '20:00 - 21:00'] */
    }).as('findByDate');

    cy.intercept('POST', '/api/schedules/filterSlots', {
      statusCode: 200,
      body: ['14:00 - 15:00', '14:30 - 15:30', '15:00 - 16:00', '15:30 - 16:30', '16:00 - 17:00', '16:30 - 17:30', '17:00 - 18:00', '19:00 - 20:00', '19:30 - 20:30', '20:00 - 21:00']  // Ajuste conforme a resposta real esperada
    }).as('filterSlots');

    // Visita a página do componente CalendarMonth
    cy.visit('localhost:3000/terapias/660edb1a20b0fc4f0c2d4120');  // Atualize com o caminho correto da sua aplicação
  });

  it('deve permitir agendar um horário e não mostrar mais disponível para outras terapias', () => {

    // Espera pelas respostas das APIs
    cy.get('[data-testid="day-slot-23-month-3"]').eq(0).click();
    cy.wait('@findByDate');
    cy.get('[data-testid="time-slot-14:00 - 15:00"]').click({ force: true });
    cy.wait('@filterSlots');
    // Simula a seleção de um dia no calendário
    // Adicionais: Confirma se o estado do componente foi atualizado conforme esperado
    cy.contains('Status: agendado').should('exist');
  });
});
