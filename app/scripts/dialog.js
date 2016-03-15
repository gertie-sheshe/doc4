(function() {
  'use strict';
  module.exports = {
    one: function() {
      var landingDialog = document.querySelector('#landing-dialog');
      console.log('dialog', landingDialog);
      var showDialogButton = document.querySelector('#show-dialog');
      if (!landingDialog.showModal) {
        dialogPolyfill.registerDialog(landingDialog);
      }
      showDialogButton.addEventListener('click', function() {
        landingDialog.showModal();
      });
      landingDialog.querySelector('.close').addEventListener('click', function() {
        landingDialog.close();
      });
    }
  };
})();
