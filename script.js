const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    class Invader {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speedX = 2;
      }

      draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      update() {
        this.x += this.speedX;
        if (this.x + this.width > canvas.width || this.x < 0) {
          this.speedX *= -1;
          this.y += 30;
        }
      }
    }

    class Player {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 20;
        this.speedX = 7;
        this.bullets = [];
      }

      draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      update() {
        if (this.leftPressed && this.x > 0) {
          this.x -= this.speedX;
        } else if (this.rightPressed && this.x < canvas.width - this.width) {
          this.x += this.speedX;
        }
      }

      shoot() {
        const bullet = new Bullet(this.x + this.width / 2, this.y);
        this.bullets.push(bullet);
      }
    }

    class Bullet {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.speedY = -7;
      }

      draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      update() {
        this.y += this.speedY;
      }
    }

    const invaders = [];
    for (let i = 0; i < 10; i++) {
      invaders.push(new Invader(50 + i * 60, 50));
    }

    const player = new Player(canvas.width / 2 - 25, canvas.height - 40);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        player.leftPressed = true;
      } else if (e.key === 'ArrowRight') {
        player.rightPressed = true;
      } else if (e.key === ' ') {
        player.shoot();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') {
        player.leftPressed = false;
      } else if (e.key === 'ArrowRight') {
        player.rightPressed = false;
      }
    });

    function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      invaders.forEach(invader => {
        invader.draw();
        invader.update();
      });

      player.draw();
      player.update();

      player.bullets.forEach(bullet => {
        bullet.draw();
        bullet.update();
      });

      requestAnimationFrame(gameLoop);
    }

    gameLoop();
