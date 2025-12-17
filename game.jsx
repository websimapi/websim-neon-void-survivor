import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useEffect, useRef, useState, useCallback } from "react";
import nipplejs from "nipplejs";
import { ASSETS } from "./assets.js";
const GAME_WIDTH = 800;
const GAME_HEIGHT = 1200;
const Game = ({ upgrades, onGameOver }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    player: {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT / 2,
      radius: 20,
      hp: 100 + upgrades.health * 20,
      maxHp: 100 + upgrades.health * 20,
      speed: 5 + upgrades.speed * 0.5,
      angle: -Math.PI / 2
    },
    enemies: [],
    bullets: [],
    particles: [],
    pickups: [],
    keys: {},
    goldEarned: 0,
    xp: 0,
    level: 1,
    kills: 0,
    timer: 0,
    replay: [],
    lastShot: 0
  });
  const requestRef = useRef();
  const audioCtx = useRef(new (window.AudioContext || window.webkitAudioContext)());
  const playSound = (type) => {
    const src = ASSETS.sounds[type];
    const audio = new Audio(src);
    audio.volume = 0.3;
    audio.play().catch(() => {
    });
  };
  const spawnEnemy = useCallback(() => {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    if (side === 0) {
      x = Math.random() * GAME_WIDTH;
      y = -50;
    } else if (side === 1) {
      x = GAME_WIDTH + 50;
      y = Math.random() * GAME_HEIGHT;
    } else if (side === 2) {
      x = Math.random() * GAME_WIDTH;
      y = GAME_HEIGHT + 50;
    } else {
      x = -50;
      y = Math.random() * GAME_HEIGHT;
    }
    stateRef.current.enemies.push({
      x,
      y,
      hp: 10 + stateRef.current.level * 5,
      speed: 2 + Math.random() * 2,
      type: "basic"
    });
  }, []);
  const update = useCallback(() => {
    const s = stateRef.current;
    const p = s.player;
    let dx = 0;
    let dy = 0;
    if (s.keys["w"] || s.keys["ArrowUp"]) dy -= 1;
    if (s.keys["s"] || s.keys["ArrowDown"]) dy += 1;
    if (s.keys["a"] || s.keys["ArrowLeft"]) dx -= 1;
    if (s.keys["d"] || s.keys["ArrowRight"]) dx += 1;
    if (s.joyData) {
      dx = s.joyData.vector.x;
      dy = -s.joyData.vector.y;
    }
    if (dx !== 0 || dy !== 0) {
      const mag = Math.sqrt(dx * dx + dy * dy);
      p.x += dx / mag * p.speed;
      p.y += dy / mag * p.speed;
      p.angle = Math.atan2(dy, dx);
    }
    p.x = Math.max(p.radius, Math.min(GAME_WIDTH - p.radius, p.x));
    p.y = Math.max(p.radius, Math.min(GAME_HEIGHT - p.radius, p.y));
    const fireRate = Math.max(5, 20 - upgrades.fireRate * 2);
    if (s.timer - s.lastShot > fireRate) {
      s.bullets.push({
        x: p.x,
        y: p.y,
        vx: Math.cos(p.angle) * 10,
        vy: Math.sin(p.angle) * 10,
        damage: 10 + upgrades.damage * 5
      });
      s.lastShot = s.timer;
      playSound("shoot");
    }
    s.bullets = s.bullets.filter((b) => {
      b.x += b.vx;
      b.y += b.vy;
      return b.x > 0 && b.x < GAME_WIDTH && b.y > 0 && b.y < GAME_HEIGHT;
    });
    if (s.timer % 60 === 0) spawnEnemy();
    s.enemies.forEach((e) => {
      const angle = Math.atan2(p.y - e.y, p.x - e.x);
      e.x += Math.cos(angle) * e.speed;
      e.y += Math.sin(angle) * e.speed;
      const dist = Math.sqrt((e.x - p.x) ** 2 + (e.y - p.y) ** 2);
      if (dist < 30) {
        p.hp -= 0.5;
        if (s.timer % 10 === 0) playSound("hit");
      }
    });
    s.bullets.forEach((b, bi) => {
      s.enemies.forEach((e, ei) => {
        const dist = Math.sqrt((b.x - e.x) ** 2 + (b.y - e.y) ** 2);
        if (dist < 25) {
          e.hp -= b.damage;
          s.bullets.splice(bi, 1);
          if (e.hp <= 0) {
            s.enemies.splice(ei, 1);
            s.kills++;
            s.pickups.push({
              x: e.x,
              y: e.y,
              type: Math.random() > 0.8 ? "gold" : "xp",
              val: 1
            });
          }
        }
      });
    });
    s.pickups = s.pickups.filter((pu) => {
      const dist = Math.sqrt((pu.x - p.x) ** 2 + (pu.y - p.y) ** 2);
      if (dist < 40) {
        if (pu.type === "gold") {
          const gain = 1 + upgrades.goldGain;
          s.goldEarned += gain;
          playSound("coin");
        } else {
          s.xp += 1;
          if (s.xp >= s.level * 10) {
            s.level++;
            s.xp = 0;
            playSound("levelup");
          }
        }
        return false;
      }
      return true;
    });
    if (s.timer % 2 === 0) {
      s.replay.push({
        player: { x: p.x, y: p.y, angle: p.angle, hp: p.hp, maxHp: p.maxHp },
        enemies: s.enemies.map((e) => ({ x: e.x, y: e.y })),
        bullets: s.bullets.map((b) => ({ x: b.x, y: b.y })),
        pickups: s.pickups.map((pu) => ({ x: pu.x, y: pu.y, type: pu.type })),
        level: s.level,
        gold: s.goldEarned
      });
    }
    if (p.hp <= 0) {
      playSound("death");
      onGameOver({
        goldEarned: s.goldEarned,
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
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    s.pickups.forEach((pu) => {
      ctx.fillStyle = pu.type === "gold" ? "#ff0" : "#0f0";
      ctx.shadowBlur = 10;
      ctx.shadowColor = ctx.fillStyle;
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, 8, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#fff";
    s.bullets.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#f00";
    ctx.fillStyle = "#f00";
    s.enemies.forEach((e) => {
      ctx.fillRect(e.x - 15, e.y - 15, 30, 30);
    });
    ctx.save();
    ctx.translate(s.player.x, s.player.y);
    ctx.rotate(s.player.angle + Math.PI / 2);
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#0ff";
    ctx.strokeStyle = "#0ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(20, 15);
    ctx.lineTo(-20, 15);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px Arial";
    ctx.fillText(`LVL ${s.level}`, 20, 45);
    ctx.fillText(`GOLD: ${s.goldEarned}`, 20, 85);
    ctx.fillStyle = "#333";
    ctx.fillRect(GAME_WIDTH / 2 - 150, 20, 300, 25);
    ctx.fillStyle = "#f00";
    const hpPct = Math.max(0, s.player.hp / s.player.maxHp);
    ctx.fillRect(GAME_WIDTH / 2 - 150, 20, 300 * hpPct, 25);
  };
  useEffect(() => {
    const handleKeyDown = (e) => stateRef.current.keys[e.key] = true;
    const handleKeyUp = (e) => stateRef.current.keys[e.key] = false;
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    const joystick = nipplejs.create({
      zone: document.getElementById("joystick-zone"),
      mode: "static",
      position: { left: "80px", bottom: "80px" },
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
      cancelAnimationFrame(requestRef.current);
      joystick.destroy();
    };
  }, [update]);
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }, children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        ref: canvasRef,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        style: { height: "100vh", maxWidth: "100%", background: "transparent", border: "1px solid #333" }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 292,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { id: "joystick-zone", style: { position: "absolute", left: 0, bottom: 0, width: "200px", height: "200px" } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 298,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 291,
    columnNumber: 5
  });
};
export {
  Game
};
