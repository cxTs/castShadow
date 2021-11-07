
var light;


// init walls
var walls = [
    new Wall(ctx, 0, 0, width, 0 ), // TOP
    new Wall(ctx, 0, 0, 0, height ), // LEFT
    new Wall(ctx, width, 0, width, height ), // RIGHT
    new Wall(ctx, 0, height, width, height ) // BOTTOM
]

for(let i=0; i<5; i++) {
    let wall = new Wall(ctx, 400, 100, 400, 500 );
    wall.newRandom();
    walls.push(wall);
}


window.onload = function(e) {
    light = new Light(e.clientX, e.clientY, 2080, 30, "#FF55FF05");
    // walls display
    // for(w of walls) {
    //     w.show();
    // }
    light.touch(walls);
    light.show();
}

document.onmousemove = function(e) {
    ctx.clearRect(0, 0, width, height );
    light.follow(e, walls);
    light.show();
}
