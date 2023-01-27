Feature: Compra KFC Colombia

    Compra exitosa por parte de un cliente de KFC Colombia

    Scenario: Compra exitosa
        Given ingrese a la plataforma "https://www.kfc.co/"
        When seleccione el producto "Combo Pop Corn" de la categoria "COMBOS" deseado
        When adiciono toppings, comentario y agrego el producto a la canasta
        Then realizara el pago de manera exitosa