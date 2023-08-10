const eMath = new engine.EngineMath();

const game = new engine.Game({
  loop: loop,
  name: "Circle Game",
  bg: "lightBlue",
});
game.setFps({
  fps: 1000,
});
game.add({
  name: "foods",
  value: [],
});

const player = new engine.Object({
  color: "#F67280",
});
player.add({
  name: "speed",
  value: 2,
});
player.add({
  name: "checkFood",
  value: function () {
    game.foods.forEach((food, i) => {
      if (
        engine.collide({
          object1: player,
          object2: food,
        })
      ) {
        game.foods.splice(i, 1);
        player.s.w *= 1.05;
        player.s.h *= 1.05;

        game.foods.push(
          new engine.Object({
            color: "#CFFF8D",
            s: {
              w: 15,
              h: 15,
            },
            pos: {
              x: eMath.random({ min: 0, max: game.w }),
              y: eMath.random({ min: 0, max: game.h }),
            },
          })
        );
      }
    });
  },
});

function createFood() {
  for (let i = 0; i < 10; i++) {
    game.foods.push(
      new engine.Object({
        color: "#CFFF8D",
        s: {
          w: 15,
          h: 15,
        },
        pos: {
          x: eMath.random({ min: 0, max: game.w }),
          y: eMath.random({ min: 0, max: game.h }),
        },
      })
    );
  }
}

function updateFood() {
  game.foods.forEach((food) => {
    food.update();
  });
}

function loop() {
  updateFood();
  player.update();
  player.checkFood();

  if (game.key({ key: "w" })) {
    player.pos.y -= player.speed;
  }
  if (game.key({ key: "a" })) {
    player.pos.x -= player.speed;
  }
  if (game.key({ key: "s" })) {
    player.pos.y += player.speed;
  }
  if (game.key({ key: "d" })) {
    player.pos.x += player.speed;
  }
}

createFood();
game.begin();
