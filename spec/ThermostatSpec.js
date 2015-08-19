describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('temperature', function() {
    it('starts at default temperature', function() {
      expect(thermostat.temperature).toEqual(thermostat.defaultTemperature);
    });

    it('can be increased by 1', function() {
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(thermostat.defaultTemperature + 1);
    });

    it('can be decreased by 1', function() {
      thermostat.decreaseTemperature();
      expect(thermostat.temperature).toEqual(thermostat.defaultTemperature - 1);
    });

    it('can be reset back to default temperature', function() {
      thermostat.increaseTemperature();
      thermostat.resetTemperature();
      expect(thermostat.temperature).toEqual(thermostat.defaultTemperature);
    });

    it('cannot be lower than the minium temperature', function() {
      while (thermostat.temperature > thermostat.miniumTemperature) {
        thermostat.decreaseTemperature();
      };
      thermostat.decreaseTemperature();
      expect(thermostat.temperature).toEqual(thermostat.miniumTemperature);
    });
  });

  describe('power save mode', function() {
    it('is on by default', function() {
      expect(thermostat.powerSavingMode).toBe(true)
    });

    it('can be turned off when on', function() {
      thermostat.powerSaveToggle()
      expect(thermostat.powerSavingMode).toBe(false)
    });

    it('can be turned on when off', function() {
      thermostat.powerSaveToggle()
      thermostat.powerSaveToggle()
      expect(thermostat.powerSavingMode).toBe(true)
    });

    it('has eco mode on max temp when power saving mode is on', function() {
      thermostat.temperature = thermostat.ecoModeOnMaxTemp;
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(thermostat.ecoModeOnMaxTemp);
    });

    it('has eco mode off max temp when power saving mode is off', function() {
      thermostat.temperature = thermostat.ecoModeOffMaxTemp;
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(thermostat.ecoModeOffMaxTemp);
    });

    it('drops to eco mode off max temp when power saving mode is off', function() {
      thermostat.temperature = thermostat.ecoModeOffMaxTemp;
      thermostat.powerSaveToggle();
      expect(thermostat.temperature).toEqual(thermostat.ecoModeOnMaxTemp);
    });
  });

  describe('display colour', function() {
    it('shows orange by default', function() {
      expect(thermostat.displayColour()).toEqual('orange');
    });

    it('shows green when temperature is less than threshold', function() {
      thermostat.temperature = thermostat.greenColourTemp - 1;
      expect(thermostat.displayColour()).toEqual('green');
    });

    it('shows orange when temperature is less than 25', function() {
      thermostat.temperature = thermostat.yellowColourTemp - 1;
      expect(thermostat.displayColour()).toEqual('orange');
    });

    it('shows red when temperature is greater than 24', function() {
      thermostat.temperature = thermostat.yellowColourTemp;
      expect(thermostat.displayColour()).toEqual('red');
    });
  });
});
