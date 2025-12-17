import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useCurrentFrame, Img } from "remotion";
import { ASSETS } from "./assets.js";
const GAME_WIDTH = 800;
const GAME_HEIGHT = 1200;
const ReplayComposition = ({ frames }) => {
  const currentFrame = useCurrentFrame();
  const state = frames[currentFrame] || frames[frames.length - 1];
  if (!state) return null;
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#000", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxDEV(Img, { src: ASSETS.images.bg, style: { position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 7
    }),
    state.pickups.map((pu, i) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          position: "absolute",
          left: pu.x - 8,
          top: pu.y - 8,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: pu.type === "gold" ? "#ff0" : "#0f0",
          boxShadow: `0 0 10px ${pu.type === "gold" ? "#ff0" : "#0f0"}`
        }
      },
      i,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 24,
        columnNumber: 9
      }
    )),
    state.bullets.map((b, i) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          position: "absolute",
          left: b.x - 4,
          top: b.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 0 8px #fff"
        }
      },
      i,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 41,
        columnNumber: 9
      }
    )),
    state.enemies.map((e, i) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          position: "absolute",
          left: e.x - 15,
          top: e.y - 15,
          width: 30,
          height: 30,
          background: "#f00",
          boxShadow: "0 0 15px #f00",
          border: "2px solid #fff"
        }
      },
      i,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 58,
        columnNumber: 9
      }
    )),
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          position: "absolute",
          left: state.player.x,
          top: state.player.y,
          width: 0,
          height: 0,
          transform: `translate(-50%, -50%) rotate(${state.player.angle + Math.PI / 2}rad)`,
          borderLeft: "20px solid transparent",
          borderRight: "20px solid transparent",
          borderBottom: "40px solid #0ff",
          filter: "drop-shadow(0 0 10px #0ff)"
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 74,
        columnNumber: 7
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 20,
      left: 20,
      color: "#0ff",
      fontSize: "40px",
      fontWeight: "bold",
      textShadow: "0 0 10px #000"
    }, children: [
      "REPLAY - LVL ",
      state.level
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 90,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      bottom: 40,
      right: 40,
      color: "#ff0",
      fontSize: "30px",
      fontWeight: "bold"
    }, children: [
      "GOLD: ",
      state.gold
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 102,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 20,
      left: "50%",
      transform: "translateX(-50%)",
      width: "300px",
      height: "20px",
      background: "#333",
      border: "2px solid #fff"
    }, children: /* @__PURE__ */ jsxDEV("div", { style: {
      width: `${state.player.hp / state.player.maxHp * 100}%`,
      height: "100%",
      background: "#f00"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 124,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 114,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      bottom: 20,
      left: 20,
      color: "rgba(255,255,255,0.3)",
      fontSize: "20px"
    }, children: [
      "FRAME: ",
      currentFrame,
      " / ",
      frames.length
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 131,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 18,
    columnNumber: 5
  });
};
export {
  ReplayComposition
};
