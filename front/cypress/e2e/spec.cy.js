/* eslint-disable cypress/no-unnecessary-waiting */
describe('CalendarMonth - Agendamentos de Terapias', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('POST', '/api/schedules/findByDate', {
      statusCode: 200,
      body: [{ start_date: "2024-04-24T11:00:00.000Z", end_date: "2024-04-24T18:00:00.000Z", status: 'agendado' },
        { start_date: "2024-04-24T18:00:00.000Z", end_date: "2024-04-24T18:00:00.000Z", status: 'agendado' }]
    }).as('findByDate');
    cy.intercept('POST', '/api/schedules/filterSlots', {
      statusCode: 200,
      body: ['14:00 - 15:00', '14:30 - 15:30', '15:00 - 16:00', '15:30 - 16:30', '16:00 - 17:00', '16:30 - 17:30', '17:00 - 18:00', '19:00 - 20:00', '19:30 - 20:30', '20:00 - 21:00']
    }).as('filterSlots');
    cy.intercept('POST', '/api/create-payment-intent').as('stripeCheckout');
    cy.intercept('POST', 'https://r.stripe.com/*').as('stripeCheckout2');
    cy.visit('localhost:3000/terapias/660edb1a20b0fc4f0c2d4120');
  });

  it('should allow scheduling a therapy session and confirm with login', () => {
    cy.get('[data-testid="login-link"]').click();
    cy.get('#loginModal').should('be.visible').within(() => {
      cy.get('[data-testid="text-email"]').type('arianacastro.historia@gmail.com');
      cy.get('[data-testid="text-pass"]').type('indicarAlectorPraOutrasPessoas');
    });
    cy.get('[data-testid="login-submit"]').click();
    cy.contains('Você está logado').should('exist');
    cy.get('[data-testid="closeModal"]').click();
    cy.get('[data-testid="day-slot-29-month-3"]').eq(0).click();
    cy.wait('@findByDate');
    cy.get('[data-testid="time-slot-14:00 - 15:00"]').click({ force: true });
    cy.wait('@filterSlots');
    cy.get('[data-testid="continuar"]').click();
    cy.wait('@stripeCheckout', { timeout: 10000 });

    // Handling iframe and payments using test ID if accessible within the iframe
    cy.get('iframe[name^="__privateStripeFrame"]').then($iframe => {
      const body = $iframe.contents().find('body');

      // Cada interação com o iframe é isolada
      cy.wrap(body).find('input[name="cardnumber"]').first().then($input => {
        cy.wrap($input).type('4242 4242 4242 4242', { delay: 10 });
      });

      cy.wrap(body).find('input[name="exp-date"]').first().then($input => {
        cy.wrap($input).type('1224', { delay: 10 });
      });

      cy.wrap(body).find('input[name="cvc"]').first().then($input => {
        cy.wrap($input).type('123', { delay: 10 });
      });

      cy.wrap(body).find('input[name="postal"]').first().then($input => {
        cy.wrap($input).type('90210', { delay: 10 });
      });
    });

    // Submeter o formulário ou outras ações finais
  });
});






