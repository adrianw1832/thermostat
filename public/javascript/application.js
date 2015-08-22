var thermostat = new Thermostat();

var temperature = document.getElementById('temperature');
temperature.innerHTML = thermostat.temperature;
temperature.style.color = thermostat.displayColour();

var increase_button = document.getElementById('increase_button');
increase_button.onclick = function() {
  thermostat.increaseTemperature();
  temperature.innerHTML = thermostat.temperature;
  temperature.style.color = thermostat.displayColour();
};

var decrease_button = document.getElementById('decrease_button');
decrease_button.onclick = function() {
  thermostat.decreaseTemperature();
  temperature.innerHTML = thermostat.temperature;
  temperature.style.color = thermostat.displayColour();
};

var reset_button = document.getElementById('reset_button');
reset_button.onclick = function() {
  thermostat.resetTemperature();
  temperature.innerHTML = thermostat.temperature;
  temperature.style.color = thermostat.displayColour();
};

var power_saving_mode = document.getElementById('power_saving_mode');
power_saving_mode.onclick = function() {
  thermostat.powerSaveToggle();
  temperature.innerHTML = thermostat.temperature;
};
