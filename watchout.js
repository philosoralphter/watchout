// start slingin' some d3 here.

var width = 1000;
var height = 750;
var enemyRadius = 10;
var playerRadius = 15;
var numEnemies = 20;

var canvas = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

canvas.on("mousemove", function() {
  var mouseLocation = [];
  mouseLocation.push(d3.mouse(this));
  updatePlayer(mouseLocation);
});

var update = function(data) {
  //Data Join
  var enemies = canvas.selectAll('.enemy').data(data);

  //Update existing enemies with new coordinates
  enemies.transition().duration(1500)
    .attr('cx', function(d, i){ return d.x; })
    .attr('cy', function(d, i){ return d.y;})
    .attr('r', enemyRadius+'px');

  //Enter - create new elements as needed
  enemies.enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d, i){ return d.x; })
    .attr('cy', function(d, i){ return d.y;})
    .attr('r', enemyRadius+'px');

  console.log(enemies);
};

var updatePlayer = function (arr) {
  //Data Join
  var player = canvas.selectAll('.player').data(arr);

  //Update
  player.attr('cx', function(d, i){ return d[0];})
    .attr('cy', function(d, i){ return d[1];});

  //Enter
  player.enter().append('circle')
    .attr('class', 'player')
    .attr('cx', function(d, i){ return d[0];})
    .attr('cy', function(d, i){ return d[1];})
    .attr('r', playerRadius+'px');
};

var coordinates = function(n){
  var array = [];
  for (var i=0; i<n; i++){
    var x = Math.random() * width;
    var y = Math.random() * height;

    array.push({'x':x, 'y':y});
  }
  return array;
};

updatePlayer([[50,50]]);
update(coordinates(numEnemies));

setInterval(function(){update(coordinates(numEnemies));}, 2000);
