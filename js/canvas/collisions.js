var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 4;
    canvas.height = window.innerHeight - 4;
})

/* Utility Functions */

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function pickColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function spawnNotCollapse(elements, params) {
    if (elements.length !== 0) {
        for (let j=0; j < elements.length; j++){
            if (params.x + params.size >= elements[j].x &&
                params.x <= elements[j].x + params.size &&
                params.y + params.size >= elements[j].y &&
                params.y <= elements[j].y + elements[j].size
            ) {
                params.x = randomIntFromRange(params.size, canvas.width - params.size);
                params.y = randomIntFromRange(params.size, canvas.height - params.size);
                j = -1
            }
        }
    }
}

/* OBJECTS*/


function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.velocity = {
        x: (Math.random() - 0.5) * 1,
        y: (Math.random() - 0.5) * 1
    };

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
    this.update = function (circles) {

        this.draw();

        if ((this.x + this.radius > innerWidth && this.velocity.x > 0) || (this.x - this.radius < 0 && this.velocity.x < 0)) {
            this.velocity.x = -this.velocity.x;
        }
        if ((this.y + this.radius > innerHeight && this.velocity.y > 0) || (this.y - this.radius < 0 && this.velocity.y < 0)) {
    
            this.velocity.y = -this.velocity.y
        }


        for (let i = 0; i < circles.length; i++){
            if (this === circles[i]) { continue; }
            
            if (getDistance(x, y, circles[i].x, circles[i].y) <= radius + circles[i].radius) {
                console.log("colliding");
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

}


function Square(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = { x: 0, y: 0};
    this.color = color;

    this.draw = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
       

    }

    this.update = function (squares) {
        this.draw();

        if (this.x + this.width >= canvas.width)
        {
            this.velocity.x = -Math.abs(this.velocity.x);
        }
        if (this.x <= 0) {
            this.velocity.x = Math.abs(this.velocity.x);
        }
        /*
        if (this.y + this.height >= canvas.height) {
            this.velocity.y = -Math.abs(this.velocity.y);
        }
        if (this.y <= 0) {
            this.velocity.y = Math.abs(this.velocity.y);
        }
        */
        

        this.x += this.velocity.x;
        this.y += this.velocity.y;
/*

        for (let j = 0; j < squares.length; j++){

            if (squares[j] === this) continue;

            console.log(`${squares[j]} | ` )
            if (this.x + this.width >= squares[j].x &&
                this.x <= squares[j].x + squares[j].width &&
                this.y + this.height >= squares[j].y &&
                this.y <= squares[j].y + squares[j].height
            ) {
                this.velocity.x *= -1;
                this.velocity.y *= -1;
            }
            
        }
*/



    }

    this.coneMove = function () {
        this.velocity.x = -2;
    }

    this.falling = function () {
        this.velocity.y += 0.2;
    }

    this.detectCollision = function (hit) {
        if (this.x + this.width >= hit.x &&
            this.x <= hit.x + this.width &&
            this.y + this.height >= hit.y &&
            this.y <= hit.y + hit.height
        ) {
            return true;
            
        }
        else {
            return false;
        }
    }
}



var mouse = { x: 0, y: 0 }

window.addEventListener("mousemove", function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;

})

document.addEventListener('keydown', function(event) {
    // Check if the space bar was pressed
    if (event.key === " " || event.keyCode === 32) {
        player.velocity.y = -6; 
        
    }
});

/* STARTING FUNCTIONS */
let circles = [];
let colors = ["#9a461b", "#ac7f4d", "#220202", "#d13434"];

let player;

let cones = []


function init() {
    squareInit();
}

function squareInit() {
    let player_size = 50;
    let x = canvas.width/2 - player_size/2;
    let y = canvas.height/2 - player_size/2;

    player = new Square(200, y, player_size, player_size, "#ff0000");
    player.draw();

    for (let i = 1; i < 5; i++){
        let factor = Math.random() - 0.2;
        let first_cone_height = factor * canvas.height;
        let second_cone_height = (1 - factor) * canvas.height;

        cones.push(new Square(i * 500, 0, 50, first_cone_height, "#00ff00"))

        cones.push(new Square(i * 500, first_cone_height + (0.2*canvas.height ), 50, second_cone_height, "#00ff00"))
    }

    /*
    for (let i = 0; i < 15; i++){
        
        let x = randomIntFromRange(size, canvas.width - size);
        let y = randomIntFromRange(size, canvas.height - size);
        let color = pickColor(colors);

        
        if (squares.length !== 0) {
            for (let j = 0; j < squares.length; j++){

                if (x + size >= squares[j].x &&
                    x <= squares[j].x + squares[j].width &&
                    y + size >= squares[j].y &&
                    y <= squares[j].y + squares[j].height
                ) {
                    x = randomIntFromRange(size, canvas.width - size);
                    y = randomIntFromRange(size, canvas.height - size);
                    j = -1
                }
            }
        }
        

        squares.push(new Square(x, y, size, size, color));
    }*/
}


setInterval(function() {
    for (let i = 1; i < 5; i++){
        let factor = Math.random() - 0.2;
        let first_cone_height = factor * canvas.height;
        let second_cone_height = (1 - factor) * canvas.height;

        cones.push(new Square(i * 500, 0, 50, first_cone_height, "#00ff00"))

        cones.push(new Square(i * 500, first_cone_height + (0.2*canvas.height ), 50, second_cone_height, "#00ff00"))
    }
}, 20000  );


function circlesInit() {
    for (let i = 0; i < 5; i++){
        let radius = 100
        let color = "#0000ff";

        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);

        if (i !== 0) {
            for (let j=0; j < circles.length; j++){
                if (getDistance(x, y, circles[j].x, circles[j].y) <= radius + circles[j].radius) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    j = -1
                }
            }
        }


        circles.push(new Circle(x, y, radius, color));
        circles[i].draw();
    }
}

function circlesUpdate() {
    circles.forEach(circle => {
        circle.update(circles);
    });
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.update();
    player.falling();


    cones.forEach(cone => {
        cone.update();
        cone.coneMove(); 
        if (cone.detectCollision(player)) {
            cones.forEach(cone => {
                cone.velocity.x = 0;
                
            })
        }
    });
}

init();

animate();
