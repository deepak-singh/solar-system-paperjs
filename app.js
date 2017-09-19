
function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function generateSun() {
    var sun = new Path.Circle({
        center: view.center,
        radius: 30,
        strokeColor: 'black'
    });
    sun.fillColor = {
        gradient: {
            stops: [['white', 0.01],['#fff6c9', 0.05],   ['#ffefa3', 0.5], ['orange', 0.99]],
            radial: true
        },
        origin: sun.position,
        destination: sun.bounds.rightCenter
    };
    var layer = new Layer({
        children: sun
    })
}

function generateStars(){

    var star = new Path.Circle({
        center: view.center,
        radius: 10,
        fillColor: 'white',
        strokeColor: 'white'
    });

    var starsSymbol = new Symbol(star)

    // Generate stars by symbols
    for (var i = 0; i < stars; i++) {
        var center = Point.random() * view.size;
        var placedStar = starsSymbol.place(center);
        placedStar.scale(i / (stars * 5));
        starsSymbol.definition.fillColor = getRandomColor()
    }

}


function generateEarth() {

    var earth = new Path.Circle({
        center: view.center,
        radius: 10,
        strokeColor: 'black'
    });
    earth.fillColor = {
        gradient: {
            stops: ['#44dfff', '#46a35b', 'green', '#448cff', '#44dfff'],
            radial: false
        },
        origin: earth.bounds.leftCenter,
        destination: earth.bounds.rightCenter
    };
    return earth
}

function generateEarthsOrbit(){
    var path = new Path();
    path.strokeColor = 'white';
    path.add(new Point(40, 350), new Point(640, 109), new Point(1240, 350),new Point(640, 590));
    path.opacity = 0.3
    path.closed = true
    path.smooth()
    return path
}


function getDistance(x1, y1, x2, y2) {
    a = x1 - x2
    b = y1 - y2
    return Math.sqrt( a*a + b*b )
}

// Animation frame
function onFrame(event) {

  earth.rotate(10)
  
  if (offset < path.length){
    earth.position = path.getPointAt(offset);
    distance = getDistance(earth.position.x, earth.position.y, view.center.x, view.center.y)    
    offset += event.delta * (15000/distance)
  }
  else {
    offset = 0;
  }
  
  for (var i = 0; i < stars; i++) {
    var item = project.layers[0].children[i];
    if (item.destination == undefined) {
      item.destination = Point.random() * view.size
      item.vector = item.destination - item.position; 
    } else {
      item.vector = item.destination - item.position; 
    }
    
    starSpeed = speed ? speed : getRandom(7000,9000)

    item.position += item.vector/starSpeed
    if (item.vector.length < 5) {
      item.destination = Point.random() * view.size;
    }
  }
}


function onMouseDown(event) {
  console.log(event)
  speed = 50
  for (var i = 0; i < stars; i++) {
    var item = project.layers[0].children[i];
    item.destination = event.point;
  }  
}

var stars = 500
var speed = undefined
var destination = undefined
var offset = 0

var moving_stars = generateStars()
var sun = generateSun()
var path = generateEarthsOrbit()
var earth = generateEarth()



















