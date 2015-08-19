describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('index2.html');
    $.holdReady(false);
    thermostat = new Thermostat();
  });

  it('displays default temperature', function(){
    expect('#thermostat').toContainText(thermostat.defaultTemperature);
  });

  it('increases temperature with up button', function(){
    $(".button.up").click();
    expect('#thermostat').toContainText(thermostat.defaultTemperature + 1);
  });

  it('decreases temperature with down button', function(){
    $(".button.down").click();
    expect('#thermostat').toContainText(thermostat.defaultTemperature -1);
  });

  it('resets temperature with reset button', function(){
    $(".button.reset").click();
    expect('#thermostat').toContainText(thermostat.defaultTemperature);
  });

  it('can have power saving mode on', function() {
    for(var i = 0; i < 6; i++) {
      $(".button.up").click();
    }
    expect('#thermostat').toContainText(thermostat.ecoModeOnMaxTemp);
  });

  it('can have power saving mode off', function() {
    $('.switch-input').click();
    for(var i = 0; i < 13; i++) {
      $(".button.up").click();
    }
    expect('#thermostat').toContainText(thermostat.ecoModeOffMaxTemp);
  });

  it('can have the green class', function() {
    for(var i = 0; i < 3; i++) {
      $(".button.down").click();
    }
    expect('#thermostat').toHaveClass('green');
  });

  it('can have the orange class', function() {
    $(".button.up").click();
    expect('#thermostat').toHaveClass('orange');
  });

  it('can have the red class', function() {
    for(var i = 0; i < 5; i++) {
      $(".button.up").click();
    }
    expect('#thermostat').toHaveClass('red');
  });
});
