describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('index2.html');
    $.holdReady(false);
    thermostat = new Thermostat();
  });

  xit('displays default temperature', function(){
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
  var thermostat;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('index2.html');
    thermostat = new Thermostat();
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('will call the weather API', function() {
    spyOn($, 'ajax');
    $('.city.form').trigger({type: 'keypress', which: 13});
    expect($.ajax).toHaveBeenCalled();
  });

  it('can display the city', function() {
    spyOn($, 'ajax');
    var APIResponse = {'main': {'temp': 18}, 'name': 'London'};
    $('.city.form').val('London');
    $('section').trigger({type: 'keypress', which: 13});
    $.ajax.calls.mostRecent().args[0].success(APIResponse);
    expect('.city.name').toContainText('London');
  });

  it('can display the temperature1', function() {
    var APIResponse = {'main': {'temp': 18}};
    jasmine.Ajax.stubRequest('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric').andReturn({
      success: $('.city.temp').html(Math.round(APIResponse.main.temp))
    });
    $('.city.form').val('London');
    $('.city.form').trigger({type: 'keypress', which: 13});
    expect('.city.temp').toContainHtml('18');
  });

  it('can display the temperature2', function() {
    spyOn($, 'ajax');
    var APIResponse = {'main': {'temp': 18}};
    $('.city.form').val('London');
    $('.city.form').trigger({type: 'keypress', which: 13});
    $.ajax.calls.mostRecent().args[0].success(APIResponse);
    expect('.city.temp').toContainText('18');
  });

  it('can display the temperature3', function() {
    var APIResponse = {'main': {'temp': 18}};
    spyOn($, 'ajax').and.callFake(function(fakejson) {
      fakejson.success(APIResponse);
    });
    $('.city.form').val('London');
    $('.city.form').trigger({type: 'keypress', which: 13});
    expect('.city.temp').toContainText('18');
  });

  it("sends a post request of the temperature when user press increase", function() {
    spyOn($, 'ajax');
    $('.thermostat.up').click();
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual("http://127.0.0.1:9292/temperature");
    expect($.ajax.calls.mostRecent().args[0]['data']).toEqual({current_temp: thermostat.defaultTemperature + 1});
  });

  it("sends a post request of the temperature when user press decrease", function() {
    spyOn($, 'ajax');
    $('.thermostat.down').click();
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual("http://127.0.0.1:9292/temperature");
    expect($.ajax.calls.mostRecent().args[0]['data']).toEqual({current_temp: thermostat.defaultTemperature - 1});
  });

  it("sends a post request of the temperature when user press reset", function() {
    spyOn($, 'ajax');
    $('.thermostat.reset').click();
    expect($.ajax.calls.mostRecent().args[0]['url']).toEqual('http://127.0.0.1:9292/temperature');
    expect($.ajax.calls.mostRecent().args[0]['data']).toEqual({current_temp: thermostat.defaultTemperature});
  });
});

describe('Ajax', function() {
  var thermostat = new Thermostat();
  it('receives a get request of the previous temperature', function() {
    jasmine.getFixtures().fixturesPath = '.';
    spyOn($, 'getJSON');
    loadFixtures('index2.html');
    expect($.getJSON.calls.mostRecent().args[0]).toEqual('http://127.0.0.1:9292/temperature/' + thermostat.defaultTemperature);
  });

  xit('displays the previous temperature', function() {
    jasmine.getFixtures().fixturesPath = '.';
    var APIResponse = {temperature : 24};
    spyOn($, 'getJSON');
    loadFixtures('index2.html');
    expect($.getJSON.calls.mostRecent().args[0]).toEqual('http://127.0.0.1:9292/temperature/' + thermostat.defaultTemperature);
  });
});
