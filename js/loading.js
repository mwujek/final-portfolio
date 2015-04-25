var count =12;
var threshold = 0.99; // distance to target
var dots = [];
var locations = [];
var lineLocation = [];
var startingPoint = [];
var circleSpeed = 10; // higher = faster
var lineSpeed = 80; // higher = faster
var minRadius = 3;
var radiusRange = 6;
var maxRadius = radiusRange - minRadius;





for (var i=0; i< count; i++){
    var destination = Point.random() * view.size;
    var startingPoints =  Point.random() * view.size;
    startingPoint.push(startingPoints);
    locations.push(destination);
  lineLocation.push(destination);
}

// line layer
//fillColor: {hue: (i*360/sym)
var lineLayer = new Layer();
for (var i= 0; i< count; i++){
  var path = new Path({
    strokeWidth: 1,
    strokeCap: 'round',
    segments: [startingPoint[i], lineLocation[i]],
    strokeColor: { hue: (i*50/count), saturation: 0.7, lightness: 0 },
    closed: false,
    opacity: 0.7,
    //blendMode: 'multiply'
  });
  //path.dashArray = [3, 3];
  path.data = {startLooking: true, looking: false, found: false, newLocation: null };
 } // end of for loop
 

 // circle layer
var circleLayer = new Layer();
for (var i=0; i< count; i++){
    
    if (i % 2 === 0){
        var dot = new Shape.Circle({
    center : startingPoint[i],
    radius: minRadius * threshold,
    name: 'dot'
  });
  dot.data = {
      startingRadius: dot.radius,
      radiusDiff: radiusRange * threshold,
      totalDist: Math.round((destination - dot.position).length),
      growing: true
  };
    } else{
        var dot = new Shape.Circle({
    center : startingPoint[i],
    radius: maxRadius * threshold,
    name: 'dot'
  });
  dot.data = {
      startingRadius: dot.radius,
      radiusDiff: radiusRange * threshold,
      totalDist: Math.round((destination - dot.position).length),
      growing: false 
  };
        
    }
  


  // attach data
  dot.data = {startingRadius: dot.radius , radiusDiff: 6 * threshold, totalDist: Math.round((destination - dot.position).length), growing: true };
  vector = locations[i] - dot.position;
  dot.data.percentTraveled = dot.data.totalDist - Math.round(vector.length);

  // push variables to arrays
  dots.push(dot);
} // end of for loop

 
function onFrame(event) {


  for (var i = 0; i < count; i++) {
    // define items
    var item = circleLayer.children[i];
    var lineItem = lineLayer.children[i];

    // set inital destination
    var lineVector = lineLocation[i] - lineItem.lastSegment.point;
    var vector = locations[i] - item.position;
    
    item.position += vector / (item.data.totalDist / circleSpeed);
    lineItem.firstSegment.point = item.position; // always anchor first point to the dot position
    

    // data for setting setting radius
    var totalDist = item.data.totalDist;
    var vectorL = Math.round(vector.length);
    var percentage = (totalDist - vectorL) / totalDist;
    var diff = item.data.radiusDiff;
    var sR = item.data.startingRadius;
    
    // change line color and position
    if (lineItem.data.looking === false){
      lineItem.lastSegment.point += lineVector / lineSpeed;
      lineItem.strokeColor.lightness = 0.6 + (percentage *0.4);
      //item.fillColor.lightness = 0.7 - (percentage/2)
    }
    
    //console.log(lineItem.strokeColor.lightness);

    // grow and shrink radius
    if (item.data.growing === true){
      item.radius = Math.abs((percentage * diff) + sR);
    } else {
      sR = (sR + diff) * threshold;
      item.radius = Math.abs(sR - (percentage * diff));
    }
    // reset position
    
    if (percentage > threshold) {
      if (lineItem.data.startLooking === true){

        // new random point
        var findNew = Point.random() * view.size;
        lineItem.data.newLocation = findNew;

        // set data properties
        lineItem.data.startLooking = false;
        lineItem.data.looking = true;
        //console.log('one')
      }

      lineVector = lineItem.data.newLocation - lineItem.lastSegment.point;
           
      if (lineItem.data.looking === true){
          lineItem.strokeColor.lightness = 0.6;
         
          //item.fillColor.lightness = 0.7
        lineItem.lastSegment.point += lineVector/ lineSpeed;
        
      }
      if(lineVector.length < 15){
        lineItem.data.found = true;
      }
      if (lineItem.data.found === true) {
        lineLocation[i] = lineItem.data.newLocation;
        locations[i] = lineItem.data.newLocation;
        var newVector = locations[i] - item.position;
        item.data.totalDist = newVector.length;
        item.data.growing = !item.data.growing;
        // set data
        lineItem.data.looking = false;
        lineItem.data.found = false;
        lineItem.data.startLooking = true;
      } // end of found conditional statement
    } // end of threshold conditional statement
    lineItem.strokeColor.hue +=0.5;
  } // end of loop for circles only
} // end of frame animation function