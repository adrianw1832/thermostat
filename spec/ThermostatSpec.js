describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
    console.log(thermostat.temperature)
  });

  describe('temperature', function() {
    it('starts at 20',function() {
      expect(thermostat.temperature).toEqual(20);
    });

    it('can be increased by 1', function() {
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(21);
    });

    it('can be decreased by 1', function() {
      thermostat.decreaseTemperature();
      expect(thermostat.temperature).toEqual(19);
    });

    it('can be reset back to 20', function() {
      thermostat.increaseTemperature();
      thermostat.resetTemperature();
      expect(thermostat.temperature).toEqual(20);
    });

    it('cannot be lower than 10', function() {
      while(thermostat.temperature > 10) {
        thermostat.decreaseTemperature();
      };
      thermostat.decreaseTemperature();
      expect(thermostat.temperature).toEqual(10);
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

    it('has a maximum of 25 with power saving mode on', function() {
      while(thermostat.temperature < 25) {
        thermostat.increaseTemperature();
      };
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(25);
    });

    it('has a maximum of 32 with power saving mode off', function() {
      thermostat.powerSaveToggle();
      console.log(thermostat.powerSavingMode)
      while(thermostat.temperature < 32) {
        thermostat.increaseTemperature();
      };
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(32);
    });
  });

  describe('display colour', function() {
    it('shows yellow by default', function() {
      expect(thermostat.displayColour).toEqual('Yellow');
    });

    it('shows green when temperature is less than 18', function() {
      while(thermostat.temperature > 17) {
        thermostat.decreaseTemperature();
      };
      thermostat.displayUpdate();
      expect(thermostat.displayColour).toEqual('Green');
    });

    it('shows yellow when temperature is less than 25', function() {
      while(thermostat.temperature < 24) {
        thermostat.increaseTemperature();
      };
      thermostat.displayUpdate();
      expect(thermostat.displayColour).toEqual('Yellow');
    });

    it('shows red when temperature is greater than 24', function() {
      while(thermostat.temperature < 25) {
        thermostat.increaseTemperature();
      };
      thermostat.displayUpdate();
      expect(thermostat.displayColour).toEqual('Red');
    });

    it('is able to change back to yellow', function() {
      while(thermostat.temperature < 25) {
        thermostat.increaseTemperature();
      };
      thermostat.displayUpdate();
      thermostat.decreaseTemperature();
      thermostat.displayUpdate();
      expect(thermostat.displayColour).toEqual('Yellow');
    });
  });
});
