import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef, useState, useCallback } from "react";
import nipplejs from "nipplejs";
import { ASSETS } from "./assets.js";
const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 1200;
const WORLD_SIZE = 4e3;
class Particle {
  constructor(x, y, color, speed, size, life) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.vx = (Math.random() - 0.5) * speed;
    this.vy = (Math.random() - 0.5) * speed;
    this.size = size;
    this.maxLife = life;
    this.life = life;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    return this.life > 0;
  }
}
const Game = ({ upgrades, onGameOver }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    player: {
      x: WORLD_SIZE / 2,
      y: WORLD_SIZE / 2,
      vx: 0,
      vy: 0,
      radius: 25,
      hp: 100 + upgrades.health * 20,
      maxHp: 100 + upgrades.health * 20,
      speed: 0.8 + upgrades.speed * 0.1,
      friction: 0.92,
      angle: -Math.PI / 2
    },
    camera: { x: 0, y: 0 },
    enemies: [],
    bullets: [],
    particles: [],
    pickups: [],
    keys: {},
    pointer: { x: 0, y: 0, active: false },
    goldEarned: 0,
    xp: 0,
    level: 1,
    kills: 0,
    timer: 0,
    replay: [],
    lastShot: 0,
    shake: 0,
    images: {}
  });
  const requestRef = useRef();
  useEffect(() => {
    Object.keys(ASSETS.images).forEach((key) => {
      const img = new Image();
      img.src = ASSETS.images[key];
      stateRef.current.images[key] = img;
    });
  }, []);
  const playSound = (type) => {
    const src = ASSETS.sounds[type];
    const audio = new Audio(src);
    audio.volume = 0.2;
    audio.play().catch(() => {
    });
  };
  const spawnEnemy = useCallback(() => {
    const s = stateRef.current;
    const p = s.player;
    const angle = Math.random() * Math.PI * 2;
    const dist = 700 + Math.random() * 200;
    const x = p.x + Math.cos(angle) * dist;
    const y = p.y + Math.sin(angle) * dist;
    const levelMult = 1 + (s.level - 1) * 0.2;
    s.enemies.push({
      x,
      y,
      hp: 15 * levelMult,
      maxHp: 15 * levelMult,
      speed: 2 + Math.random() * 2 + s.level * 0.1,
      radius: 20
    });
  }, []);
  const update = useCallback(() => {
    const s = stateRef.current;
    const p = s.player;
    let ax = 0;
    let ay = 0;
    if (s.keys["w"] || s.keys["ArrowUp"]) ay -= 1;
    if (s.keys["s"] || s.keys["ArrowDown"]) ay += 1;
    if (s.keys["a"] || s.keys["ArrowLeft"]) ax -= 1;
    if (s.keys["d"] || s.keys["ArrowRight"]) ax += 1;
    if (s.joyData) {
      ax = s.joyData.vector.x;
      ay = -s.joyData.vector.y;
    } else if (s.pointer.active) {
      const dx = s.pointer.x - VIEW_WIDTH / 2;
      const dy = s.pointer.y - VIEW_HEIGHT / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 20) {
        ax = dx / dist;
        ay = dy / dist;
      }
    }
    if (ax !== 0 || ay !== 0) {
      const mag = Math.sqrt(ax * ax + ay * ay);
      p.vx += ax / mag * p.speed;
      p.vy += ay / mag * p.speed;
      p.angle = Math.atan2(ay, ax);
      if (s.timer % 2 === 0) {
        s.particles.push(new Particle(p.x - Math.cos(p.angle) * 15, p.y - Math.sin(p.angle) * 15, "#0ff", 2, 3, 15));
      }
    }
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= p.friction;
    p.vy *= p.friction;
    p.x = Math.max(p.radius, Math.min(WORLD_SIZE - p.radius, p.x));
    p.y = Math.max(p.radius, Math.min(WORLD_SIZE - p.radius, p.y));
    s.camera.x = p.x - VIEW_WIDTH / 2;
    s.camera.y = p.y - VIEW_HEIGHT / 2;
    const fireRate = Math.max(4, 18 - upgrades.fireRate * 2);
    if (s.timer - s.lastShot > fireRate) {
      const spread = 0.05;
      const angle = p.angle + (Math.random() - 0.5) * spread;
      s.bullets.push({
        x: p.x + Math.cos(p.angle) * 20,
        y: p.y + Math.sin(p.angle) * 20,
        vx: Math.cos(angle) * 15,
        vy: Math.sin(angle) * 15,
        damage: 10 + upgrades.damage * 5
      });
      s.lastShot = s.timer;
      playSound("shoot");
    }
    s.particles = s.particles.filter((part) => part.update());
    s.bullets = s.bullets.filter((b) => {
      b.x += b.vx;
      b.y += b.vy;
      const dx = b.x - p.x;
      const dy = b.y - p.y;
      return dx * dx + dy * dy < 16e5;
    });
    const spawnRate = Math.max(10, 60 - s.level * 3);
    if (s.timer % spawnRate === 0) spawnEnemy();
    s.enemies.forEach((e) => {
      const angle = Math.atan2(p.y - e.y, p.x - e.x);
      e.x += Math.cos(angle) * e.speed;
      e.y += Math.sin(angle) * e.speed;
      s.enemies.forEach((other) => {
        if (e === other) return;
        const dx = e.x - other.x;
        const dy = e.y - other.y;
        const dist2 = Math.sqrt(dx * dx + dy * dy);
        if (dist2 < 40) {
          e.x += dx / dist2 * 1;
          e.y += dy / dist2 * 1;
        }
      });
      const dist = Math.sqrt((e.x - p.x) ** 2 + (e.y - p.y) ** 2);
      if (dist < 40) {
        p.hp -= 0.5;
        s.shake = 10;
        if (s.timer % 15 === 0) playSound("hit");
      }
    });
    s.bullets.forEach((b, bi) => {
      s.enemies.forEach((e, ei) => {
        const dist = Math.sqrt((b.x - e.x) ** 2 + (b.y - e.y) ** 2);
        if (dist < 30) {
          e.hp -= b.damage;
          s.bullets.splice(bi, 1);
          for (let i = 0; i < 3; i++) s.particles.push(new Particle(b.x, b.y, "#f00", 5, 4, 10));
          if (e.hp <= 0) {
            s.enemies.splice(ei, 1);
            s.kills++;
            s.shake = 5;
            for (let i = 0; i < 10; i++) s.particles.push(new Particle(e.x, e.y, "#f00", 8, 6, 20));
            s.pickups.push({
              x: e.x,
              y: e.y,
              type: Math.random() > 0.85 ? "gold" : "xp",
              angle: Math.random() * Math.PI * 2
            });
          }
        }
      });
    });
    s.pickups = s.pickups.filter((pu) => {
      const dist = Math.sqrt((pu.x - p.x) ** 2 + (pu.y - p.y) ** 2);
      if (dist < 60) {
        const angle = Math.atan2(p.y - pu.y, p.x - pu.x);
        pu.x += Math.cos(angle) * 10;
        pu.y += Math.sin(angle) * 10;
      }
      if (dist < 30) {
        if (pu.type === "gold") {
          const gain = 1 + upgrades.goldGain;
          s.goldEarned += gain;
          playSound("coin");
        } else {
          s.xp += 1;
          if (s.xp >= s.level * 15) {
            s.level++;
            s.xp = 0;
            playSound("levelup");
          }
        }
        return false;
      }
      return true;
    });
    if (s.shake > 0) s.shake *= 0.9;
    if (s.timer % 2 === 0) {
      s.replay.push({
        player: { x: p.x, y: p.y, angle: p.angle, hp: p.hp, maxHp: p.maxHp },
        camera: { x: s.camera.x, y: s.camera.y },
        enemies: s.enemies.map((e) => ({ x: e.x, y: e.y, hp: e.hp, maxHp: e.maxHp })),
        bullets: s.bullets.map((b) => ({ x: b.x, y: b.y })),
        pickups: s.pickups.map((pu) => ({ x: pu.x, y: pu.y, type: pu.type })),
        particles: s.particles.map((pt) => ({ x: pt.x, y: pt.y, color: pt.color, size: pt.size, life: pt.life, maxLife: pt.maxLife })),
        level: s.level,
        gold: s.goldEarned,
        shake: s.shake
      });
    }
    if (p.hp <= 0) {
      playSound("death");
      onGameOver({
        goldEarned: Math.floor(s.goldEarned),
        level: s.level,
        kills: s.kills,
        replay: s.replay
      });
      return;
    }
    s.timer++;
    draw();
    requestRef.current = requestAnimationFrame(update);
  }, [upgrades, spawnEnemy, onGameOver]);
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    const cam = s.camera;
    ctx.save();
    if (s.shake > 1) {
      ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);
    }
    ctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
    if (s.images.bg) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      const bgSize = 1e3;
      const startX = Math.floor(cam.x / bgSize) * bgSize;
      const startY = Math.floor(cam.y / bgSize) * bgSize;
      for (let x = startX; x < cam.x + VIEW_WIDTH + bgSize; x += bgSize) {
        for (let y = startY; y < cam.y + VIEW_HEIGHT + bgSize; y += bgSize) {
          ctx.drawImage(s.images.bg, x - cam.x, y - cam.y, bgSize, bgSize);
        }
      }
      ctx.restore();
    }
    ctx.save();
    ctx.translate(-cam.x, -cam.y);
    s.pickups.forEach((pu) => {
      const img = s.images[pu.type];
      if (img) {
        ctx.save();
        ctx.translate(pu.x, pu.y);
        ctx.rotate(s.timer * 0.1);
        ctx.drawImage(img, -15, -15, 30, 30);
        ctx.restore();
      }
    });
    s.particles.forEach((pt) => {
      ctx.globalAlpha = pt.life / pt.maxLife;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#0ff";
    s.bullets.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    s.enemies.forEach((e) => {
      if (s.images.enemy) {
        ctx.drawImage(s.images.enemy, e.x - 20, e.y - 20, 40, 40);
        ctx.fillStyle = "#300";
        ctx.fillRect(e.x - 20, e.y - 25, 40, 4);
        ctx.fillStyle = "#f00";
        ctx.fillRect(e.x - 20, e.y - 25, 40 * (e.hp / e.maxHp), 4);
      }
    });
    if (s.images.player) {
      ctx.save();
      ctx.translate(s.player.x, s.player.y);
      ctx.rotate(s.player.angle + Math.PI / 2);
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#0ff";
      ctx.drawImage(s.images.player, -30, -30, 60, 60);
      ctx.restore();
    }
    ctx.restore();
    ctx.restore();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 35px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`LVL ${s.level}`, 30, 50);
    ctx.fillStyle = "#ff0";
    ctx.fillText(`GOLD ${Math.floor(s.goldEarned)}`, 30, 95);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(VIEW_WIDTH / 2 - 150, 20, 300, 30);
    ctx.fillStyle = "#f00";
    const hpPct = Math.max(0, s.player.hp / s.player.maxHp);
    ctx.fillRect(VIEW_WIDTH / 2 - 150, 20, 300 * hpPct, 30);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(VIEW_WIDTH / 2 - 150, 20, 300, 30);
  };
  useEffect(() => {
    const handleKeyDown = (e) => stateRef.current.keys[e.key] = true;
    const handleKeyUp = (e) => stateRef.current.keys[e.key] = false;
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    const handlePointerMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const scaleX = VIEW_WIDTH / rect.width;
      const scaleY = VIEW_HEIGHT / rect.height;
      const x = (e.clientX || e.touches && e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches && e.touches[0].clientY) - rect.top;
      stateRef.current.pointer = { x: x * scaleX, y: y * scaleY, active: true };
    };
    const handlePointerDown = (e) => {
      stateRef.current.pointer.active = true;
      handlePointerMove(e);
    };
    const handlePointerUp = () => {
      stateRef.current.pointer.active = false;
    };
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    canvas.addEventListener("touchmove", handlePointerMove, { passive: false });
    canvas.addEventListener("touchstart", handlePointerDown, { passive: false });
    window.addEventListener("touchend", handlePointerUp);
    const joystick = nipplejs.create({
      zone: document.getElementById("joystick-zone"),
      mode: "static",
      position: { left: "80px", bottom: "100px" },
      color: "cyan"
    });
    joystick.on("move", (evt, data) => {
      stateRef.current.joyData = data;
    });
    joystick.on("end", () => {
      stateRef.current.joyData = null;
    });
    requestRef.current = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
      canvas.removeEventListener("touchmove", handlePointerMove);
      canvas.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchend", handlePointerUp);
      cancelAnimationFrame(requestRef.current);
      joystick.destroy();
    };
  }, [update]);
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", touchAction: "none" }, children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        width: VIEW_WIDTH,
        height: VIEW_HEIGHT,
        style: { height: "100%", maxHeight: "100vh", width: "auto", background: "#050505", display: "block" }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 466,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { id: "joystick-zone", style: { position: "absolute", left: 0, bottom: 0, width: "200px", height: "300px", zIndex: 1e3 } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 472,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 465,
    columnNumber: 5
  });
};
export {
  Game
};
