modCategories.bell = {
    color: "#ffdd55",
    icon: "🔔"
};

elements.chime = {
    color: "#ffee88",
    state: "gas",
    density: 1,
    category: "bell",
    tick(p) {
        p.vx *= 0.95;
        p.vy *= 0.95;
        if (Math.random() < 0.1) deletePixel(p.x, p.y);
    }
};

function dong(x, y, c) {
    for (let i = 0; i < 40; i++) {
        let a = Math.random() * Math.PI * 2;
        let p = createPixel("chime", x, y);
        if (p) {
            p.color = c;
            p.vx = Math.cos(a) * (Math.random() * 3);
            p.vy = Math.sin(a) * (Math.random() * 3);
        }
    }
}

elements.ring = {
    color: "#ffffff",
    state: "gas",
    density: 1,
    category: "bell",
    tick(p) {
        if (!p.age) p.age = 0;
        p.age++;

        if (p.age < 20) {
            p.vx *= 1.2;
            p.vy *= 1.2;
        }

        let t = getTouchingPixels(p.x, p.y);
        for (let q of t) {
            if (q.element !== "ring") deletePixel(q.x, q.y);
        }

        if (p.age > 20 && p.age < 40) {
            let dx = p.homeX - p.x;
            let dy = p.homeY - p.y;
            p.vx = dx * 0.15;
            p.vy = dy * 0.15;
        }

        if (p.age === 40) destroyCircle(p.homeX, p.homeY, 12);

        if (p.age > 45) deletePixel(p.x, p.y);
    }
};

function toll(cx, cy, n, s) {
    for (let i = 0; i < n; i++) {
        let a = (Math.PI * 2) * (i / n);
        let px = Math.floor(cx + Math.cos(a) * 2);
        let py = Math.floor(cy + Math.sin(a) * 2);
        let p = createPixel("ring", px, py);
        if (p) {
            p.vx = Math.cos(a) * s;
            p.vy = Math.sin(a) * s;
            p.homeX = cx;
            p.homeY = cy;
        }
    }
}

elements.bell = {
    color: "#ffcc00",
    behavior: behaviors.WALL,
    category: "bell",
    state: "solid",
    density: 2000,

    tick(p) {
        if (!p.phase) p.phase = 0;
        p.phase += 0.15;
        p.color = Math.sin(p.phase) > 0.9 ? "#ffee55" : "#ffcc00";
    },

    onClick(p) {
        dong(p.x, p.y, "#ffee55");
        toll(p.x, p.y, 140, 3.5);
    }
};
