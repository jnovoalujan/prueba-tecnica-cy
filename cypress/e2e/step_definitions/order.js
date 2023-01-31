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
  
    cy.get("[data-id='93'] > .d-flex > .quantity-select-related-product-increase").click();
    cy.get('[data-id="392"] > .d-flex > .quantity-select-related-product-increase').click();
    cy.get('#options_additional_information').type("Prueba tecnica de Julian Novoa")
    cy.get('#add-to-cart-button').click();
});

Then ("realizara el pago de manera exitosa", ()=> {
  //Se da click en pagar
  cy.get('#button-checkout-duna').click();
  //Se obtiene el body del frame y se guarda en 'frame'
  cy.get("[title='d_una_checkout']", { timeout: 55000 }).its("0.contentDocument.body").as('frame').then(cy.wrap);
  //Se accede a la variable frame y se diligencia todos los campos correspondientes al checkout
  cy.get('@frame').find("[name='email']", {timeout: 30000}).type("jnovoalujan@gmail.com");
  cy.get('@frame').find("[name='first_name']", {timeout: 3000}).type("Julian");
  cy.get('@frame').find("[name='last_name']", {timeout: 3000}).type("Novoa");
  cy.get('@frame').find("[name='phone']", {timeout: 3000}).type("3013126292");
  cy.get('@frame').find("[name='identity_document']", {timeout: 3000}).type("1036657374");
  cy.get('@frame').find("[data-testid='address-map-input']").click();
  cy.get('@frame').find("[name='address']", {timeout: 3000}).type("Calle 93 #19-75");
  cy.get('@frame').find("span:contains('Calle 93 #19-75')").click();
  cy.get('@frame').find("button:contains('Confirmar')").click();
  //Se da click en continuar con el pago
  cy.get('@frame').find("#next_btn-button").click();
  
  
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
