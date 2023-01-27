import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("ingrese a la plataforma {string}", (url) => {
  cy.visit(url);
});

When("seleccione el producto {string} de la categoria {string} deseado", (productName, categoryName) => {
  cy.get('[data-rs-event-name="Select Menu"] > a').click();
  cy.get(`[data-category-name="${categoryName}"]`).click();
  cy.get(`[title="${productName}"`).parents("a").find("button").click();
});

When("adiciono toppings, comentario y agrego el producto a la canasta", ()=>{
  cy.enter().then(getBody => {

    getBody().find("#add-to-cart-button").click({force:true});
  //cy.get('#add-to-cart-button').click();
  })
})



  /*cy.enter().then(getBody => {
    cy.wait(5000)
    getBody().find("#add-to-cart-button").should('be.visible').click();
  })
  cy.get('.modal-content').then(($dialog)=>{
    cy.wrap($dialog).find('#add-to-cart-button').click()
    });*/