import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-iframe';

Given("ingrese a la plataforma {string}", (url) => {
  cy.visit(url);
});

When(
  "seleccione el producto {string} de la categoria {string} deseado",
  (productName, categoryName) => {
    cy.get('[data-rs-event-name="Select Menu"] > a').click();
    cy.get(`[data-category-name="${categoryName}"]`).click();
    cy.get(`[title="${productName}"`).parents("a").find("button").click();
  }
);

When("adiciono toppings, comentario y agrego el producto a la canasta", () => {

  cy.get('.add-to-cart-modal.modal.hide.fade', { timeout: 5000 }).then(($dialog)=>{
    cy.wrap($dialog).find("[data-id='93'] > .d-flex > .quantity-select-related-product-increase").click();
    cy.get('[data-id="392"] > .d-flex > .quantity-select-related-product-increase').click();
    cy.get('#options_additional_information').type("Prueba tecnica de Julian Novoa")
    cy.get('#add-to-cart-button').click();
    });
});

Then ("realizara el pago de manera exitosa", ()=> {
  cy.get('#button-checkout-duna').click();
  cy.get("[title='d_una_checkout']", { timeout: 35000 }).its("0.contentDocument.body").then(($bodyFrame) => {
    cy.wrap($bodyFrame).find("[name='email']", { timeout: 35000 }).type("jnovoalujan@gmail.com");
  })
});

/*cy.frameLoaded('[id="add-to-cart-modal"] > div[0]');
  cy.iframe('[id="add-to-cart-modal"] > div[0]').find("#add-to-cart-button").then(function(t){
    
  })*/

  //cy.get('#add-to-cart-button').click();

/*Otro ensayo con cypress-iframe
  cy.enter().then(getBody => {

    getBody().find("#add-to-cart-button").click({force:true});
    */

/*Ensayando con una libreria de cypress-iframe
  cy.enter('modal-content').then(getBody => {
    getBody().find("#add-to-cart-button").should('be.visible').click();
  })*/

/* Ensayando con wrap
  cy.get('.modal-content').then(($dialog)=>{
    cy.wrap($dialog).find('#add-to-cart-button').click()
    });*/
