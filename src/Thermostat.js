function Thermostat() {
  this.temperature = 20;
  this.powerSavingMode = true;
};

Thermostat.prototype.increaseTemperature = function() {
    if(this.powerSavingMode === true && this.temperature < 25) {
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
  if(this.powerSavingMode === true) {
    this.powerSavingMode = false;
  } else {
    this.powerSavingMode = true;
  };
};

// function Player() {
// }

// var FizzBuzz = function
// Player.prototype.play = function(song) {
//   this.currentlyPlayingSong = song;
//   this.isPlaying = true;
// };

// Player.prototype.pause = function() {
//   this.isPlaying = false;
// };

// Player.prototype.resume = function() {
//   if (this.isPlaying) {
//     throw new Error("song is already playing");
//   }

//   this.isPlaying = true;
// };

// Player.prototype.makeFavorite = function() {
//   this.currentlyPlayingSong.persistFavoriteStatus(true);
// };
