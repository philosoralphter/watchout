// start slingin' some d3 here.

var width = 1000;
var height = 750;
var enemyRadius = 10;
var playerRadius = 15;
var numEnemies = 20;
var currentScore =0;
var highScore = 0;
var collisionCount = 0;

var canvas = d3.select('body').append('svg')
  .attr('class', 'canvas')
  .attr('width', width)
  .attr('height', height);

canvas.on("mousemove", function() {
  var position = d3.mouse(this);
  console.log(position);
  var mouseLocation = [];
  mouseLocation.push(position);
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
    .attr('cx', function(d, i){ return d.x;})
    .attr('cy', function(d, i){ return d.y;})
    .attr('r', enemyRadius+'px');
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

var checkCollisions = function(){
  var enemX, enemY, plrX, plrY, distance;

  //select ememies
  var enemies = d3.selectAll('.enemy');
  //select player
  var player = canvas.select('.player');
  plrX = player.attr('cx');
  plrY = player.attr('cy');

  //iterate enemies, checking distance to player
  //each iterates through all enemies
  enemies.each(function(d, i){

    //get this enemy's coordinates
    enemX = d3.select(this).attr('cx'); //when using .each, must reselect each enemy
    enemY = d3.select(this).attr('cy');

    //compute distance to player
    distance = Math.sqrt(Math.pow((enemX-plrX), 2) + Math.pow((enemY-plrY), 2))

    //if there's a collision
    if(distance < playerRadius + enemyRadius){
      console.log('collision detected!!!');
      collisionCount++;
      currentScore = 0;
    }
  });
};

var scoring = function() {
  currentScore++;
  highScore = Math.max(currentScore, highScore);
  d3.select('.high > span').text(highScore);
  d3.select('.current > span').text(currentScore);
  d3.select('.collisions > span').text(collisionCount);
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
setInterval(function(){checkCollisions();}, 60);
setInterval(function(){scoring();}, 200);
