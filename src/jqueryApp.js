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
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric',
      function(APIResponse) {
        $('.city.temp').html(Math.round(APIResponse.main.temp));
        $('.city.name').html(APIResponse.name);
      });

  };

  $(document).keypress(function(enter) {
    if(enter.which == 13) {
      var cityName = $('.city.form').val();
      cityTemperature(cityName);
      $('.city.form').val('');
      $('.city.tempsign').removeClass('hidden');
      $('.city.info').stop().animate({ opacity: 0.75}, 'slow');
      $('.city.form').stop().animate({ opacity: 0}, 'fast');
    }
  });

  $('section').click(function() {
    $('.city.form').stop().animate({ opacity: 0.75}, 'fast');
    $('.city.info').stop().animate({ opacity: 0}, 'slow');
  });

  $('.buttons').hover(function() {
    $(this).stop().animate({ opacity: 1 }, 'fast');
  },
  function() {
    $(this).stop().animate({ opacity: 0.5 }, 'fast');
  });

  update();

  $('.thermostat.up').click(function() {
    thermostat.increaseTemperature();
    update();
  });

  $('.thermostat.down').click(function() {
    thermostat.decreaseTemperature();
    update();
  });

  $('.thermostat.reset').click(function() {
    thermostat.resetTemperature();
    update();
  });

  $('.switch-input').click(function() {
    thermostat.powerSaveToggle();
    update();
  });
});





