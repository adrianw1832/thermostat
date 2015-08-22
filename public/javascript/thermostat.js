function Thermostat() {
  this.defaultTemperature = 20;
  this.temperature = this.defaultTemperature;
  this.miniumTemperature = 10;
  this.maximumTemperature = 25;
  this.ecoModeOnMaxTemp = 25;
  this.ecoModeOffMaxTemp = 32;
  this.powerSavingMode = true;
  this.greenColourTemp = 18;
  this.yellowColourTemp = 25;
}

Thermostat.prototype.increaseTemperature = function() {
  if (this.temperature < this.maximumTemperature) {
    this.temperature++;
  }
};

Thermostat.prototype.decreaseTemperature = function() {
  if (this.temperature > this.miniumTemperature) {
    this.temperature--;
  }
};

Thermostat.prototype.resetTemperature = function() {
  this.temperature = this.defaultTemperature;
};

Thermostat.prototype.powerSaveToggle = function() {
  this.powerSavingMode = (this.powerSavingMode !== true);
  this._changeTempSettings();
};

Thermostat.prototype._changeTempSettings = function() {
  this.maximumTemperature = (this.maximumTemperature === this.ecoModeOnMaxTemp ? this.ecoModeOffMaxTemp : this.ecoModeOnMaxTemp);
  if (this.temperature > this.ecoModeOnMaxTemp) {
    this.temperature = this.ecoModeOnMaxTemp;
  }
};

Thermostat.prototype.displayColour = function() {
  if (this.temperature < this.greenColourTemp) {
    return 'green';
  } else if (this.temperature < this.yellowColourTemp) {
    return 'orange';
  } else {
    return 'red';
  }
};
