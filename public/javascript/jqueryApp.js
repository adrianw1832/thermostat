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

  var cityTemperature = function(cityName) {
    $.ajax({url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric',
      success: function(APIResponse) {
        $('.city.temp').html(Math.round(APIResponse.main.temp));
        $('.city.name').html(APIResponse.name);
      }
    });
  };

  var getThermostatTemperature = function() {
    $.getJSON('http://127.0.0.1:9292/temperature/' + thermostat.defaultTemperature, function(remoteAPI) {
      $('#thermostat').html(remoteAPI.temperature);
      thermostat.temperature = remoteAPI.temperature;
      updateColour();
    });
  };

  var sendThermostatTemperature = function() {
    $.post('http://127.0.0.1:9292/temperature', {current_temp: thermostat.temperature});
  };

  $(document).keypress(function(enter) {
    if (enter.which == 13) {
      var cityName = $('.city.form').val();
      cityTemperature(cityName);
      $('.city.tempsign').removeClass('hidden');
      $('.city.info').stop().animate({
        opacity: 0.75
      }, 'slow');
      $('.city.form').stop().animate({
        opacity: 0
      }, 'fast');
    }
  });

  $('section').click(function() {
    $('.city.form').val('');
    $('.city.form').stop().animate({
      opacity: 0.75
    }, 'fast');
    $('.city.info').stop().animate({
      opacity: 0
    }, 'slow');
  });

  $('.buttons').hover(function() {
      $(this).stop().animate({
        opacity: 1
      }, 'fast');
    },
    function() {
      $(this).stop().animate({
        opacity: 0.5
      }, 'fast');
    });

  getThermostatTemperature();

  $('.thermostat.up').click(function() {
    thermostat.increaseTemperature();
    update();
    sendThermostatTemperature();
  });

  $('.thermostat.down').click(function() {
    thermostat.decreaseTemperature();
    update();
    sendThermostatTemperature();
  });

  $('.thermostat.reset').click(function() {
    thermostat.resetTemperature();
    update();
    sendThermostatTemperature();
  });

  $('.switch-input').click(function() {
    thermostat.powerSaveToggle();
    update();
    sendThermostatTemperature();
  });
});
