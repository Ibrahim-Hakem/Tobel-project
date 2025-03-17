
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

canvas.width = innerWidth - 2;
canvas.height = innerHeight - 6;


/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function isPositive(number) {
    return Math.abs(number) === number;
}



/* Controller */
window.addEventListener("resize", function () {
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
});

window.addEventListener("click", function (event) {

    let distanceToMouse = getDistance(player.x, player.y, event.x, event.y);
    let spawnProjectileRadius = 70;

    let ratio = spawnProjectileRadius / distanceToMouse;

    let A = getDistance(player.x, player.y, event.x, player.y)  * ((event.x < player.x) ? -1 : 1);
    let B = getDistance(event.x, player.y, event.x, event.y)   * ((event.y > player.y) ? 1 : -1);


    let x = ratio * A;
    let y = ratio * B;

    let angle = Math.atan2(event.y - player.y, event.x - player.x);
    let velocity = {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2
    }

    const newProjectile = new Projectile(player.x + x, player.y + y, 15, "blue", velocity, 100);
    playerProjetiles.push(newProjectile);
    
})

window.addEventListener("keydown", function (event) {

    if (event.keyCode === 39) {
        let velocity = { x: 2, y: 0 };
        player.velocity = velocity;
    }
    else if (event.keyCode == 38) {
        let velocity = { x: 0, y: -2 };
        player.velocity = velocity;
    }
    else if (event.keyCode == 37) {
        let velocity = { x: -2, y: 0 };
        player.velocity = velocity;
    }
    else if (event.keyCode == 40) {
        let velocity = { x: 0, y: 2 };
        player.velocity = velocity;
    }
});


/* Classes */

class Player{
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
    }

    isEnemyCollidingPlayer(enemies) {
        for (let i = 0; i < enemies.length; i++){
            let enemy = enemies[i];
            if (getDistance(this.x, this.y, enemy.x, enemy.y) - this.radius - enemy.radius <= 0) {
                return true;
            }
        }
        return false;
    }

    
}

class Enemy {
    constructor(x, y, radius, color, velocity, health) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.health = health;
        this.maxHealth = health;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.globalAlpha = this.health/this.maxHealth;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    /**
     * @param {Player} player
     */
    followPlayer(player) {
        let distanceToPlayer = getDistance(this.x, this.y, player.x, player.y);

        let x_distance = getDistance(this.x, this.y, player.x, this.y);
        let y_ditance = getDistance(this.x, this.y, this.x, player.y);

        let angle = Math.atan2(this.y - player.y, this.x - player.x);

        this.velocity = {
            x: -Math.cos(angle),
            y: -Math.sin(angle)
        };
    }

    detectCollisionProjectiles(hits) {
        for (let i = 0; i < hits.length; i++) {
            let hit = hits[i];
            if (hit instanceof Projectile) {
                if (getDistance(this.x, this.y, hit.x, hit.y) - this.radius - hit.radius <= 0) {
                    this.health -= hit.damage;
                    hits.splice(i, 1);
                    

                }
            }
        };

    }

    isDead() {
        if (this.health <= 0) {
            return true;
        }
        return false;
    }
}


class Projectile{
    constructor(x, y, radius, color, velocity, damage) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        

        this.velocity = velocity;
        this.originalVelocity = velocity;
        this.damage = damage;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

}


const player = new Player(canvas.width / 2, canvas.height / 2, 40, "white", {x: 0, y:0});
let playerProjetiles = [];
let enemies = [];

function init() {
    
    player.draw();
    let enemyVelocity = { x: 0, y: 0 };
    const enemy1 = new Enemy(150, 150, 75, "red", enemyVelocity, 100);
    enemies.push(enemy1);
}


function spawnEnemies() {
    let nextTimeToSpawn = Math.random() * 5000;
    setInterval(function () {
        if (enemies >= 20) {return}

        let radius = randomIntFromRange(25, 65);

        let x, y;
        if (Math.random() > 0.5) {
            x = randomIntFromRange(-250 - radius, canvas.width + radius + 250);
            y = (Math.random() > 0.5) ? 0 : canvas.height;
        }
        else {
            x = (Math.random() > 0.5) ? 0 : canvas.width;
            
            y = randomIntFromRange(-250 - radius, canvas.height + radius + 250);

        }
        let speed = randomIntFromRange(2, 7);
        let velocity = { x: speed, y: speed };

        let health = randomIntFromRange(50, 200);

        enemies.push(new Enemy(x, y, radius, "#ff0000", velocity, health));

        nextTimeToSpawn = Math.random() * 5000;
    }, 5000);
}

let animationID;
function animate() {
    animationID = requestAnimationFrame(animate);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    if (player.isEnemyCollidingPlayer(enemies)) {
        cancelAnimationFrame(animationID);
        clearInterval(spawnEnemies());
    }


    for (let i = 0; i < playerProjetiles.length; i++){
        playerProjetiles[i].update();
    }
    for (let i = 0; i < enemies.length; i++){
        /**
         * @param {Enemy} enemy
         */
        let enemy = enemies[i];
        enemy.update();
        enemy.followPlayer(player);
        enemy.detectCollisionProjectiles(playerProjetiles);
        if (enemy.isDead()) {
            enemies.splice(i, 1);
        }
    }


}
init();
spawnEnemies();
animate();