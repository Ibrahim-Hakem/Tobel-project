


var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 4;
    canvas.height = window.innerHeight - 4;
})

const GRAVITY = 1;

const colors = ['#780000', '#C1121F', '#FFD580', "#003049", "#669BBC"];


function Ball(x, y, radius, friction, color) {
    this.x = x;
    this.y = y;
    this.dy = 0;

    this.radius = radius;
    this.friction = friction;
    this.color = color;
    
    this.fall = true;
    this.currentHieght = canvas.height - this.y - this.radius;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    this.update = function () {
        this.draw();

        if (this.fall) {
            this.falling();
        }
        
        this.currentHieght = canvas.height - this.y - this.radius;
        if (Math.round((this.y + this.dy)) == (canvas.height - this.radius)) {
            this.y = canvas.height - this.radius;
            this.fall = false
            this.dy = 0;
        }
        else {
            this.y += this.dy;
        }

        if (this.currentHieght > 0) {
            this.fall = true;
        }

        // this.attractCircle(250, 0.07);
    }

    this.falling = function () {
        this.currentHieght = canvas.height - this.y - this.radius;

        if ((this.y + this.radius > canvas.height && this.dy > 0) || (this.y - this.radius < 0 && this.dy < 0))
        {
            if (this.currentHieght < 0) {
                this.dy = -this.dy * this.friction;
            }

        }
        else {
            
            if (this.currentHieght >= 0) {
                this.dy += GRAVITY;
            }

        }
    }

    this.attractCircle = function(impactRadius, force){
        let distance = Math.sqrt(Math.pow((mouse.x - this.x), 2) + Math.pow((mouse.y - this.y), 2));
        if (distance <= impactRadius) {
            //this.radius = this.normalRadius * Math.max((1 - (distance / 250)) * 10, 1);
            this.x = interpolate(this.x, mouse.x, (1 - (distance / impactRadius)) * force);
            this.y = interpolate(this.y, mouse.y, (1 - (distance / impactRadius)) * force);

        }

    }


}


var mouse = { x: undefined, y: undefined };

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("click", function (event) { 
    initBall(event.x, event.y);
});


function interpolate(a, b, factor) {
    return (1 - factor) * a + factor * b;
}

let ballArray = [];

function init() {

    for (let i = 0; i < 0; i++){
        initBall();
    }

}

function initBall(x=null, y=null) {
    let radius = Math.random() * 30 + 10;
    x = (x== null) ? Math.random() * (canvas.width - radius) : x;
    y = (y == null) ? Math.random() * (canvas.height - radius) : y;

    let friction = Math.random();
    let color =  colors[Math.floor(Math.random() * colors.length)]

    ballArray.push(new Ball(x, y, radius, friction, color));
    ballArray[ballArray.length-1].draw();
}


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < ballArray.length; i++){
        ballArray[i].update();
    }

}

init();

animate();