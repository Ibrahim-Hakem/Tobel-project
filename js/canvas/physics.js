var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 4;
    canvas.height = window.innerHeight - 4;
})

const meter = 1;
let scale = 100;
const kg = 1;
const G = 6.67430 * Math.pow(10, -10);

const GRAVITY = 9.81 * meter;

const round = (value, digits) => {
    const factor = Math.pow(10, digits);
    value += Math.sign(value) * Number.EPSILON;
    return Math.round(value * factor) / factor;
}

const distance = (dx, dy) => {
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

const mass_input = document.getElementById('mass');
const diameter_input = document.getElementById('diameter');
const scale_input = document.getElementById('scale');
const start_input = document.getElementById('start');
const startFromBottom = document.getElementById('bottom-option');


start_input.addEventListener("click", function(e){
    if (mass_input.value != '' && diameter_input.value != '' && scale_input.value != '') {
        ball1.mass = mass_input.value;
        scale = scale_input.value;
        ball1.setNewSizes(diameter_input.value, diameter_input.value);
        if (startFromBottom.checked) {
            ball1.y = ground.y* 2/3;
        }else {
            ball1.y = 50;
        }
        ball1.x = canvas.width / 2;
        ball1.net_force.equalVector(new Vector(0, 0, 0, 0));
        ball1.velocity.equalVector(new Vector(0, 0, 0, 0));
    }
});
/*
document.addEventListener("click", (event) => {
    console.log("X : " + event.clientX + " | Y : " + event.clientY);

    let dx =  - (event.clientX - ball1.x)/scale;
    let dy = - (ball1.y - event.clientY)/scale;

    console.log(`delta x : ${dx} | delta y : ${dy}`)

    let applied_push = new Vector(dx, dy, 0, 0);

    ball1.velocity.addVector(applied_push);

});*/





function spawnBall(clientX, clientY) {
    if (mass_input.value != '' && diameter_input.value != '' && scale_input.value != '') {
        new_ball = new Ball(clientX, clientY, diameter_input.value, diameter_input.value, mass_input.value, "blue", 0.5)
    }
    else {
        new_ball = new Ball(clientX, clientY, 0.1, 0.1, 10 * kg, "blue", 0.5);

    }
}

class Vector {
    constructor(_deltaX, _deltaY, _magnitude, _angle) {

        if (_deltaX == 0 && _deltaY == 0) {
            this.magnitude = _magnitude;
            this.angle = _angle;
            this.deltaX = round(this.magnitude * Math.cos(this.angle), 10);
            this.deltaY = round(this.magnitude * Math.sin(this.angle), 10);

        }
        else {
            this.deltaX = _deltaX;
            this.deltaY = _deltaY;
            this.#calculateMagnitudeAngle();
        }

    }

    showInfo() {
        console.log(this.deltaX);
        console.log(this.deltaY);
        console.log(this.magnitude);
        console.log(this.angle * 180 / Math.PI);
    }

    #calculateMagnitudeAngle() {
        this.magnitude = Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2));
        if (this.deltaX != 0 && this.deltaY != 0) {
            this.angle = Math.atan(this.deltaY / this.deltaX);
            if (this.deltaX * this.deltaY < 0) {
                this.angle += Math.PI;
            }
            if (this.deltaX > 0 && this.deltaY < 0) {
                this.angle += Math.PI;
            }
            if (this.deltaX < 0 && this.deltaY < 0) {
                this.angle += Math.PI;
            }
        }
        else {
            
            if (this.deltaX == 0 && this.deltaY > 0) {
                this.angle = 1 / 2 * Math.PI;
            }
            else if (this.deltaX == 0 && this.deltaY < 0) {
                this.angle = Math.PI + 1 / 2 * Math.PI;
            }
            else if (this.deltaX < 0 && this.deltaY == 0) {
                this.angle = Math.PI;
            }

        }
    }

    rotate(rotation_angle, sens) {
        if (sens === 0) {
            this.angle += rotation_angle;
            this.angle %= 2 * Math.PI;
        } else if (sens === 1) {
            this.angle -= rotation_angle;
            if (this.angle < 0) {
                this.angle += 2 * Math.PI;
            }
        }

        this.deltaX = this.magnitude * Math.cos(this.angle);
        this.deltaY = this.magnitude * Math.sin(this.angle);

            // Ensure the magnitude is maintained after rotation
        const newMagnitude = Math.sqrt(this.deltaX * this.deltaX + this.deltaY * this.deltaY);

        // Normalize to preserve the original magnitude
        if (newMagnitude !== 0) {
            this.deltaX *= this.magnitude / newMagnitude;
            this.deltaY *= this.magnitude / newMagnitude;
        }
    }

    draw(startX, startY) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, (-this.deltaY*10) + startY);
        ctx.stroke();
        ctx.closePath();
    }

    equalVector(vector) {
        if (!(vector instanceof Vector)) {
            throw new TypeError('the agument of the "addVector" method must be a Vactor !');
        }
        this.deltaX = vector.deltaX;
        this.deltaY = vector.deltaY;
        this.magnitude = vector.magnitude;
        this.angle = vector.angle;
    }


    addVector(vector) {
        if (!(vector instanceof Vector)) {
            throw new TypeError('the agument of the "addVector" method must be a Vactor !');
        }

        this.deltaX += vector.deltaX;
        this.deltaY += vector.deltaY;
        this.#calculateMagnitudeAngle();
    }

    dotProductVector(vector) {
        if (!(vector instanceof Vector)) {
            throw new TypeError('the agument of the "addVector" method must be a Vactor !');
        } 
        dotProduct = this.deltaX * vector.deltaX + this.deltaY * vector.deltaY;
        return dotProduct;
    }

    multiplyScalar(scalar) {
        if (!(typeof scalar  == 'number')) {
            throw new TypeError('The arguemnt of the "multiplyScalar" method must be a Number !');
        }
        this.deltaX *= scalar;
        this.deltaY *= scalar;
        this.#calculateMagnitudeAngle();
    }
    changeDeltaX(value) {
        if (!(typeof value  == 'number')) {
            throw new TypeError('The arguemnt of the "changeDeltaX" method must be a Number !');
        }
        this.deltaX *= value;
        this.#calculateMagnitudeAngle();
    }
    changeDeltaY(value) {
        if (!(typeof value  == 'number')) {
            throw new TypeError('The arguemnt of the "changeDeltaY" method must be a Number !');
        }
        this.deltaY = value;
        this.#calculateMagnitudeAngle();
    }

}



class PhysicalObject{
    constructor(_mass) {
        this.mass = _mass;
        this.net_force = new Vector(0, 0, 0, 0);
        this.acceleration = new Vector(0, 0, 0, 0);
        this.velocity = new Vector(0, 0, 0, 0);
        this.isInContact = false;
        this.contactTime;
    }

    accelerate() {
        this.acceleration.equalVector(this.net_force);
        this.acceleration.multiplyScalar(1 / this.mass);
        // Apply acceleration to the velocity
        this.velocity.addVector(this.acceleration);
    }
    airResistance(deltaTime) {
        const p_air = 1.225 * kg / Math.pow(meter, 3)
        let airResistanceVector = new Vector(0, 1 / 2 * this.Cd * p_air * this.A * Math.pow(this.velocity.deltaY, 2) * deltaTime, 0, 0);
        
        if (this.velocity.deltaY > 0) {
            airResistanceVector.rotate(Math.PI, 0)
        }

        if (p_air > this.mass / this.volume)    
        {
            let buoyancyForce = new Vector(0, this.volume * p_air * GRAVITY * deltaTime, 0, 0);
            this.net_force.addVector(buoyancyForce);
        }

        this.net_force.addVector(airResistanceVector);

    }

    move(deltaTime) {
        if (this.y >= Math.pow(2, 31) || this.y <= -Math.pow(2, 31)) {return}
        this.x += this.velocity.deltaX * deltaTime * scale;
        this.y += (this.velocity.deltaY * -1) * deltaTime * scale;
    }
}

class Ball extends PhysicalObject{
    constructor(_x, _y, _width, _height, _mass, _color, _stiffness){
        super(_mass);
        this.x = _x;
        this.y = _y;
        this.width = _width * scale;
        this.height = _height * scale;
        this.color = _color;
        this.Cd = 0.47;
        this.stiffness = _stiffness;
        this.maxContactTime = 0.02; // Time in seconds to bounce
        this.radius = this.getAvrRadius();

        this.#calculateDimensions();
    }

    #calculateDimensions() {
        this.volume = 4 / 3 * Math.PI * this.width/scale * meter * this.height/scale * meter * ((this.width + this.height) / 2/ scale) * meter;
        this.A = Math.PI * this.width / scale * this.height / scale * meter * meter;
        this.radius = this.getAvrRadius();

    }

    getAvrRadius() {
        return round(Math.pow(this.width * this.height * ((this.width + this.height) / 2), 1 / 3), 5)
    }

    setWidth(width) {
        this.width = width * meter;
        const A = 2 / 3 * Math.PI * this.width;
        const B = 2 / 3 * Math.PI * this.width * this.width;

        this.height = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * (-this.volume)))/(2*A) // Solved quadric equation

        this.width *= scale;
        this.height *= scale;

        console.log("The Volume :" + this.volume)
        console.log("The Width :" +this.width / scale)
        console.log("The Height :" +this.height/scale)
        console.log("The axis-z :" +((this.width + this.height) / 2/ scale))

        
    }

    setHeight(height) {
        this.height = height * meter;
        const A = 2 / 3 * Math.PI * this.height;
        const B = 2 / 3 * Math.PI * this.height * this.height;

        this.width = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * (-this.volume)))/(2*A) // Solved quadric equation

        this.width *= scale;
        this.height *= scale;
    }

    setNewSizes(new_width, new_height) {
        this.width = new_width * scale;
        this.height = new_height * scale;

        this.#calculateDimensions();

    }

    collisionRect(rectangle, deltaTime) {

        const nextY = this.y + (this.velocity.deltaY) * deltaTime;
        const nextX = this.x + (this.velocity.deltaX) * deltaTime;
        

        if ((nextX + this.width) >= rectangle.x && (nextX - this.width) <= (rectangle.x + rectangle.width) && (nextY + this.height) >= rectangle.y && (nextY - this.height) <= (rectangle.y + rectangle.height)) {
            
            this.y = rectangle.y - this.height;

            this.velocity.changeDeltaY(this.velocity.deltaY*(-Math.sqrt(1/2)));

            if (round(this.velocity.deltaY, 4) == 0) {
                // normal force
                this.net_force.addVector(new Vector(0, (GRAVITY * this.mass) * deltaTime, 0, 0));
            }

            return true;
        }

        return false;
    }


    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

class Rectangle extends PhysicalObject{
    constructor(_x, _y, _width, _height, _mass, _color) {
        super(_mass);
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
        this.color = _color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
}


let appliedForce = new Vector(0, 0, 0, 0); // Force temporaire appliquée

let prevMouseX = null;
let prevMouseY = null;
let mouseVelocity = new Vector(0, 0, 0, 0);
const MOUSE_MASS = 5; // Masse fictive de la souris
let isClicking = false;



let balls = [];

let ball1 = new Ball(canvas.width / 2, 50, 0.2 * meter, 0.2 * meter, 10 * kg, "red", 0.5);
balls.push(ball1);
let ground = new Rectangle(0, (canvas.height - 100), (canvas.width), 500, 6 * Math.pow(10, 24),  "green");
ground.draw();


function netForceObjectHandler(physicalObject, addedforces, deltaTime){
    netForce = new Vector(0, (-GRAVITY * physicalObject.mass) * deltaTime, 0, 0);
    netForce.addVector(addedforces);

    physicalObject.net_force.equalVector(netForce)
}


function userHandler() {
    canvas.addEventListener("mousedown", (event) => {
        isClicking = true;
    });
    
    canvas.addEventListener("mouseup", () => {
        isClicking = false;
    });
    
    canvas.addEventListener("mousemove", (event) => {
        ball_distance = distance(event.clientX - ball1.x, event.clientY - ball1.y);
        if (ball_distance < ball1.width + 10) {
            let mouseX = event.clientX;
            let mouseY = event.clientY;
        
            if (prevMouseX !== null && prevMouseY !== null) {
                let velocityX = mouseX - prevMouseX;
                let velocityY = mouseY - prevMouseY;
                mouseVelocity.equalVector(new Vector(velocityX, velocityY, 0, 0));
            }
        
            prevMouseX = mouseX;
            prevMouseY = mouseY;
        }

        
    
    });
}


function update(deltaTime) {

    for (let i = 0; i < balls.length; i++){

        if (!isClicking) {
            netForceObjectHandler(balls[i], new Vector(0, 0, 0, 0), deltaTime)
        }
        else {
            netForceObjectHandler(balls[i], appliedForce, deltaTime)

        }

        balls[i].collisionRect(ground, deltaTime);
        balls[i].airResistance(deltaTime)
    
        balls[i].accelerate();
    
        balls[i].move(deltaTime);
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++){
        balls[i].draw(1);
        ground.draw();
        balls[i].velocity.draw(balls[i].x, balls[i].y);
    }

}

let previousTime = 0;
const fixedDeltaTime = 1 / 60; // 60 updates per second
let accumulator = 0;


function animate(currentTime) {
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    accumulator += deltaTime;

    while (accumulator >= fixedDeltaTime) {
        userHandler();
        update(fixedDeltaTime);
        accumulator -= fixedDeltaTime;
    }


    draw();
    requestAnimationFrame(animate);

}



requestAnimationFrame(animate);
