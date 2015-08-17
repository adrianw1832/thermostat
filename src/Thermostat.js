function Thermostat() {
  this.temperature = 20;
  this.powerSavingMode = true;
  this.displayColour = 'Yellow';
};

Thermostat.prototype.increaseTemperature = function() {
  if(this.powerSavingMode === true && this.temperature < 25) {
    this.temperature++;
  } else if (this.powerSavingMode === false && this.temperature < 32) {
    this.temperature++;
  };
};

Thermostat.prototype.decreaseTemperature = function() {
  if(this.temperature > 10 ) {
    this.temperature--;
  };
};

Thermostat.prototype.resetTemperature = function() {
  this.temperature = 20;
};

Thermostat.prototype.powerSaveToggle = function() {
  this.powerSavingMode = (this.powerSavingMode !== true);
};

Thermostat.prototype.displayUpdate = function() {
  if(this.temperature < 18) {
    this.displayColour = 'Green';
  } else if(this.temperature > 24) {
    this.displayColour = 'Red';
  } else {
    this.displayColour = 'Yellow';
  };
};

