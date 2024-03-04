describe('User flows', () => {
  beforeEach(() => {
    cy.intercept('GET', "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "orders.json"
    })
    .visit('http://localhost:3000/')
  });

  it(`Should visit the webpage and get / render its' elements`, () => {
    cy.contains('h1', 'Burrito Builder')
    
    cy.get('form').children().should('have.length', 15)
    cy.get('input[name="name"]').should('have.attr', 'placeholder',  'Name')
    cy.get('button').first().contains('beans');
    cy.get('form').find('button').contains('lettuce')
    cy.get('form').find('button').contains('pico de gallo')
    cy.get('form').find('button').contains('sour cream')
    cy.get('.user-feedback-text').contains('p', 'Order: Nothing selected')
    cy.get('button').last().contains('Submit Order');
    
    cy.get('.orders-container').children().should('have.length', 3)
    
    cy.get('.order').first().contains('h3', 'Pat');
    cy.get('.order').first().find('.ingredient-list').children().should('have.length', 5);
    cy.get('.order').first().find('.ingredient-list').first().contains('li', 'beans');
    cy.get('.order').first().find('.ingredient-list').last().contains('li', 'jalapeno');
    
    cy.get('.order').last().contains('h3', 'Alex');
    cy.get('.order').last().find('.ingredient-list').children().should('have.length', 5);
    cy.get('.order').last().find('.ingredient-list').first().contains('li', 'sofritas');
    cy.get('.order').last().find('.ingredient-list').last().contains('li', 'queso fresco');
  });

  it('should post a new trick and display it to the page', () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statuscode: 201,
      body: {
        "id": "test01",
        "name": "Eric",
        "ingredients": ["beans", "sofritas", "jalapenos"]
      }
    }).as("postOrder")

    cy.get('.orders-container').children().should('have.length', 3);
    cy.get('form').get('input[name="name"]').type('Eric');
    cy.get('form').find('button').contains('beans').click()
    cy.get('form').find('button').contains('sofritas').click()
    cy.get('form').find('button').contains('jalapenos').click()
    cy.get('.user-feedback-text').contains('p', 'Order: beans, sofritas, jalapenos')
    cy.get('form').find('button').contains('Submit Order').click()
    
    cy.wait("@postOrder");

    cy.get('.orders-container').children().should('have.length', 4)
    cy.get('.order').last().contains('h3', 'Eric')
    cy.get('.order').last().find('.ingredient-list').children().should('have.length', 3);
    cy.get('.order').last().find('.ingredient-list').first().contains('li', 'beans');
    cy.get('.order').last().find('.ingredient-list').last().contains('li', 'jalapenos');
  })
})