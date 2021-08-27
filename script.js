(function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Player {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  class Projectile {
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
      ctx.fill();
    }

    update() {
      this.draw();
      this.x = this.x + this.velocity.x;
      this.y = this.y + this.velocity.y;
    }
  }

  const x = canvas.width / 2;
  const y = canvas.height / 2;

  const p = new Player(x, y, 30, "#f3f3f3"); // Instance of Player
  p.draw();

  const projectiles = [projectile];

  const animate = () => {
    requestAnimationFrame(animate);
    projectiles.forEach((projectile) => {
      projectile.update();
    });
  };

  addEventListener("click", (e) => {
    projectiles.push(
      new Projectile(canvas.width / 2, canvas.height / 2, 5, "#7ffc03", {
        x: 1,
        y: 1,
      })
    );
  });
})();
