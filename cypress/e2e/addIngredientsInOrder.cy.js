describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
  it('Check elements after loading', () => {
    cy.contains('Булки');
    cy.contains('Соусы');
    cy.contains('Начинки');
  })
  it('Attempt to add not buns in constructor', () => {
    const dataTransfer = new DataTransfer;
    cy.get('[class^=burger-ingredients_ingredientsSectionContainer__]')
        .contains('Соус')
        .first()
        .as('cardSauce')
        .trigger('dragstart', { dataTransfer });
    cy.get('[class^=burger-constructor_section__]')
        .first()
        .as('constructor')
        .trigger('drop', { dataTransfer });
    cy.get('@cardSauce').trigger('dragend');
    cy.get('[class^=burger-constructor_menuContainer_]').should(($el) => {
      expect($el.text().trim()).equal('');
    })

  });

  it('Attempt to click without ingredients', () => {
    cy.get('button').should('be.disabled');
  });

  it('Add buns', () => {
    const dataTransfer = new DataTransfer;
    cy.get('[class^=burger-ingredients_ingredientsSectionContainer__]')
        .first()
        .as('card')
        .trigger('dragstart', { dataTransfer });
    cy.get('[class^=burger-constructor_section__]')
        .first()
        .as('constructor')
        .trigger('drop', { dataTransfer });
    cy.get('@card').trigger('dragend');
    cy.get('@constructor').contains('булка');

  });
  it('Add other ingredients', () => {
    const dataTransfer = new DataTransfer;
    cy.get('[class^=burger-ingredients_ingredientsSectionContainer__]')
        .contains('Соус')
        .first()
        .as('cardSauce')
        .trigger('dragstart', { dataTransfer });
    cy.get('[class^=burger-constructor_section__]')
        .first()
        .as('constructor')
        .trigger('drop', { dataTransfer });
    cy.get('@cardSauce').trigger('dragend');
    cy.get('@constructor').contains('Соус');

    cy.get('[class^=burger-ingredients_ingredientsSectionContainer__]')
        .contains('Филе')
        .as('cardMain')
        .trigger('dragstart', { dataTransfer });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.get('@cardMain').trigger('dragend');
    cy.get('@constructor').contains('Филе');
  });

  it('Create order', () => {
    cy.get('button').should('not.be.disabled');
    cy.get('button').click();
    cy.contains('Вход');
    cy.get('.input_type_email').find('.input__icon-action').click();
    cy.get('input[name="email"]')
        .type('vv@fgjgj.re');
    cy.get('input[name="password"]')
        .type('bggbgbgbg');
    cy.get('button').click();
    cy.get('button').click().wait(25000);
    cy.contains('идентификатор заказа');
  });
})