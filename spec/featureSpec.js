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
    $(".thermostat.up").click();
    expect('#thermostat').toContainText(thermostat.defaultTemperature + 1);
  });

  it('decreases temperature with down button', function(){
    $(".thermostat.down").click();
    expect('#thermostat').toContainText(thermostat.defaultTemperature -1);
  });

  it('resets temperature with reset button', function(){
    $(".thermostat.reset").click();
    expect('#thermostat').toContainText(thermostat.defaultTemperature);
  });

  it('can have power saving mode on', function() {
    for(var i = 0; i < 6; i++) {
      $(".thermostat.up").click();
    }
    expect('#thermostat').toContainText(thermostat.ecoModeOnMaxTemp);
  });

  it('can have power saving mode off', function() {
    $('.switch-input').click();
    for(var i = 0; i < 13; i++) {
      $(".thermostat.up").click();
    }
    expect('#thermostat').toContainText(thermostat.ecoModeOffMaxTemp);
  });

  it('can have the green class', function() {
    for(var i = 0; i < 3; i++) {
      $(".thermostat.down").click();
    }
    expect('#thermostat').toHaveClass('green');
  });

  it('can have the orange class', function() {
    $(".thermostat.up").click();
    expect('#thermostat').toHaveClass('orange');
  });

  it('can have the red class', function() {
    for(var i = 0; i < 5; i++) {
      $(".thermostat.up").click();
    }
    expect('#thermostat').toHaveClass('red');
  });
});

describe('Ajax', function() {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('index2.html');
    $.holdReady(false);
  });

  it('will call the weather API', function() {
    spyOn($, 'getJSON');
    $('.city.form').trigger({type: 'keypress', which: 13});
    expect($.getJSON).toHaveBeenCalled();
  });

  it('can display the city', function() {
    $('.city.form').val('London');
    $('.city.form').trigger({type: 'keypress', which: 13});
    expect('.city.name').toContainText('London');
  });
});




