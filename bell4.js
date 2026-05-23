elements.chime = {
    color: "#ffee88",
    behavior: behaviors.GAS,
    category: "bell",
    state: "gas",
    density: 1,

    tick: function(pixel) {

        pixel.vx *= 0.95;
        pixel.vy *= 0.95;

        if (Math.random() < 0.08) {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

function dong(x, y, color) {

    for (let i = 0; i < 40; i++) {

        let angle = Math.random() * Math.PI * 2;

        let px = x + Math.floor(Math.cos(angle));
        let py = y + Math.floor(Math.sin(angle));

        if (outOfBounds(px, py)) continue;

        if (isEmpty(px, py)) {

            createPixel("chime", px, py);

            let p = pixelMap[px][py];

            if (p) {

                p.color = color;

                p.vx = Math.cos(angle) * 4;
                p.vy = Math.sin(angle) * 4;
            }
        }
    }
}

elements.ring = {
    color: "#ffffff",
    behavior: behaviors.GAS,
    category: "bell",
    state: "gas",
    density: 1,

    tick: function(pixel) {

        if (pixel.life === undefined) {
            pixel.life = 0;
        }

        pixel.life++;

        if (pixel.life > 30) {
            deletePixel(pixel.x, pixel.y);
            return;
        }

        tryMove(
            pixel,
            pixel.x + Math.sign(pixel.vx),
            pixel.y + Math.sign(pixel.vy)
        );

        for (let dx = -1; dx <= 1; dx++) {

            for (let dy = -1; dy <= 1; dy++) {

                let nx = pixel.x + dx;
                let ny = pixel.y + dy;

                if (outOfBounds(nx, ny)) continue;

                if (!isEmpty(nx, ny, true)) {

                    let other = pixelMap[nx][ny];

                    if (
                        other &&
                        other.element !== "ring" &&
                        other.element !== "bell"
                    ) {

                        deletePixel(nx, ny);
                    }
                }
            }
        }
    }
};

function toll(cx, cy, amount, speed) {

    for (let i = 0; i < amount; i++) {

        let angle = (Math.PI * 2) * (i / amount);

        let px = cx + Math.floor(Math.cos(angle));
        let py = cy + Math.floor(Math.sin(angle));

        if (outOfBounds(px, py)) continue;

        if (isEmpty(px, py)) {

            createPixel("ring", px, py);

            let p = pixelMap[px][py];

            if (p) {

                p.vx = Math.cos(angle) * speed;
                p.vy = Math.sin(angle) * speed;
            }
        }
    }
}

elements.bell = {

    color: ["#ffcc00", "#ffee55"],

    behavior: behaviors.WALL,

    category: "bell",

    state: "solid",

    density: 2000,

    conduct: 1,

    tick: function(pixel) {

        if (pixel.phase === undefined) {
            pixel.phase = 0;
        }

        pixel.phase += 0.15;

        pixel.color =
            Math.sin(pixel.phase) > 0.8
                ? "#ffee55"
                : "#ffcc00";

        if (pixel.charge) {

            dong(pixel.x, pixel.y, "#ffee55");

            toll(pixel.x, pixel.y, 50, 2);

            pixel.charge = 0;
        }
    }
};
