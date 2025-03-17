



/** @type {HTMLCanvasElement} */
var canvas;
/** @type {CanvasRenderingContext2D} */
var ctx;

const colors = ['#386641', '#6A994E', '#A7C957', '#F2E8CF', '#BC4749'];
    
canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;


ctx = canvas.getContext('2d');


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function randomFloatFromRange(min, max) {
    return Math.random() * (max - min) + min;
}
function pickColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Circle(x, y, radius, radians) {
    this.color = pickColor(colors);
    
    this.x = x;
    this.y = y;
    this.lastPos = { x: this.x, y: this.y };
    this.lastMouse = { x: this.x, y: this.y };

    this.radius = radius;
    this.angle = Math.random() * 2 * Math.PI;
    this.velocity = randomFloatFromRange(0.02, 0.1);
    this.distanceFromCenter = randomIntFromRange(120, 180);



    this.draw = function() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(this.lastPos.x, this.lastPos.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.update = function () {
        this.draw();


    }

    this.circularMovements = function () {
        this.lastPos = { x: this.x, y: this.y };
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.2;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.2;
        this.angle += this.velocity;

        this.x = this.lastMouse.x + Math.cos(this.angle) * this.distanceFromCenter;
        this.y = this.lastMouse.y+ Math.sin(this.angle) * this.distanceFromCenter;

    }

}

var mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})





let particles = [];

function init() {
    
    for (let i=0; i < 75; i++){
        particles.push(new Circle(canvas.width/2, canvas.height/2, randomIntFromRange(4, 8), i));
        particles[i].draw();
    }
}



function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i < particles.length; i++){
        particles[i].update();
        particles[i].circularMovements();
    }
    console.log(particles);
    
};

init();
animate();
