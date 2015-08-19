$(document).ready(function() {
  var thermostat = new Thermostat();

  function updateColour() {
    $('#thermostat').removeClass();
    $('#thermostat').addClass(thermostat.displayColour());
  }

  function update() {
    $('#thermostat').html(thermostat.temperature);
    updateColour();
  }

  var cityTemperature = function() {

  };

  update();

  $('.button.up').click(function() {
    thermostat.increaseTemperature();
    update();
  });

  $('.button.down').click(function() {
    thermostat.decreaseTemperature();
    update();
  });

  $('.button.reset').click(function() {
    thermostat.resetTemperature();
    update();
  });

  $('.switch-input').click(function() {
    thermostat.powerSaveToggle();
    update();
  });
});





