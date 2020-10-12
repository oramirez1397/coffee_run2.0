(function (window) {
    'use strict';
    var FORM_SELECTOR = '[payment ="form"]';
    

    var Payment = app.Payment;
    var FormHandler = App.FormHandler;
    var formHandler = new FormHandler(FORM_SELECTOR);

    
    formHandler.addSubmitHandler();
    console.log(formHandler);
  })(window);