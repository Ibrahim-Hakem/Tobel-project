var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

ctx.fillStyle = "#20c9bb";
ctx.fillRect(100, 100, 50, 50);
ctx.fillRect(250, 100, 50, 50);

// Line

ctx.beginPath();
ctx.moveTo(100, 85);
ctx.lineTo(150, 70);
ctx.strokeStyle = "#0000ff";
ctx.stroke();

ctx.beginPath();                           
ctx.moveTo(250, 70);
ctx.lineTo(300, 85);
ctx.strokeStyle = "#0000ff";
ctx.stroke();

// arc / circle
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI, false);
ctx.stroke();
/*
for (let i = 0; i < 10; i++){
    let x = Math.random() * (window.innerWidth - 50) + 50;
    let y = Math.random() * (window.innerHeight);

    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2, false);
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.stroke();
}
*/

function Circle(x, y, x_speed, y_speed, radius) {
    let colors = ["#9a461b", "#ac7f4d", "#220202", "#d13434"];
    this.dx = (Math.random() -0.5) * x_speed;
    this.dy = (Math.random() - 0.5) * y_speed;
    
    this.x = x;
    this.y = y;
    this.x_speed = x_speed;
    this.y_speed = y_speed;

    this.normalRadius = radius;
    this.radius = radius;

    this.color = colors[Math.round(Math.random() * (colors.length-1))];

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function () {
        if ((this.x + this.radius > window.innerWidth && this.dx > 0) || (this.x - this.radius < 0 && this.dx < 0)) {

            if (this.dx > 0) {
                this.dx = -Math.random()  * this.x_speed;
            }
            else {
                this.dx = Math.random()  * this.x_speed;
            }
        }
        if ((this.y + this.radius > window.innerHeight && this.dy > 0) || (this.y - this.radius < 0 && this.dy < 0)) {
    
            if (this.dy > 0) {
                this.dy = -Math.random()  * this.y_speed;
            }
            else {
                this.dy = Math.random()  * this.y_speed;
            }
        }
    
        this.x += this.dx;
        this.y += this.dy;

        this.attractCircle(250);
    }
    this.attractCircle = function(impactRadius){
        let distance = Math.sqrt(Math.pow((mouse.x - this.x), 2) + Math.pow((mouse.y - this.y), 2));
        if (distance <= impactRadius) {
            //this.radius = this.normalRadius * Math.max((1 - (distance / 250)) * 10, 1);
            this.x = interpolate(this.x, mouse.x, (1 - (distance / impactRadius)) * 0.4);
            this.y = interpolate(this.y, mouse.y, (1 - (distance / impactRadius)) * 0.4);

        }
        else {
            this.radius = this.normalRadius;
        }
    }




}


function interpolate(a, b, factor) {
    return (1 - factor) * a + factor * b;
}


let circlesArray = [];

let testingCircle = new Circle(0, 0, 0, 0, 50);

for (let i = 0; i < 400; i++){
    let radius = (Math.random() * 6) + 4;

    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    
    circlesArray.push(new Circle(x, y, 8, 8, radius));
}

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight ;
})


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, innerHeight );

    for (let i = 0; i < circlesArray.length; i++){
        circlesArray[i].draw();
        circlesArray[i].update();
    }



}

animate();
