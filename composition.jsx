import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, random } from "remotion";
import { ASSETS } from "./assets.js";
const GAME_WIDTH = 800;
const GAME_HEIGHT = 1200;
const ReplayComposition = ({ frames }) => {
  const currentFrame = useCurrentFrame();
  const state = frames[currentFrame] || frames[frames.length - 1];
  if (!state) return null;
  const shakeX = (random(`shake-x-${currentFrame}`) - 0.5) * state.shake;
  const shakeY = (random(`shake-y-${currentFrame}`) - 0.5) * state.shake;
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#050505", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { transform: `translate(${shakeX}px, ${shakeY}px)` }, children: [
      /* @__PURE__ */ jsxDEV(Img, { src: ASSETS.images.bg, style: { position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 9
      }),
      state.pickups.map((pu, i) => /* @__PURE__ */ jsxDEV(
        Img,
        {
          src: ASSETS.images[pu.type],
          style: {
            position: "absolute",
            left: pu.x - 15,
            top: pu.y - 15,
            width: 30,
            height: 30,
            transform: `rotate(${currentFrame * 0.1}rad)`,
            filter: `drop-shadow(0 0 5px ${pu.type === "gold" ? "#ff0" : "#0f0"})`
          }
        },
        `pu-${i}`,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 26,
          columnNumber: 11
        }
      )),
      state.particles.map((pt, i) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            position: "absolute",
            left: pt.x - pt.size / 2,
            top: pt.y - pt.size / 2,
            width: pt.size,
            height: pt.size,
            borderRadius: "50%",
            background: pt.color,
            opacity: pt.life / pt.maxLife
          }
        },
        `pt-${i}`,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 43,
          columnNumber: 11
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
            boxShadow: "0 0 10px #0ff"
          }
        },
        `b-${i}`,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 60,
          columnNumber: 11
        }
      )),
      state.enemies.map((e, i) => /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { left: e.x, top: e.y, width: 0, height: 0 }, children: [
        /* @__PURE__ */ jsxDEV(
          Img,
          {
            src: ASSETS.images.enemy,
            style: {
              position: "absolute",
              left: -20,
              top: -20,
              width: 40,
              height: 40,
              filter: "drop-shadow(0 0 10px #f00)"
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 78,
            columnNumber: 13
          }
        ),
        /* @__PURE__ */ jsxDEV("div", { style: {
          position: "absolute",
          left: -20,
          top: -25,
          width: 40,
          height: 4,
          background: "#300"
        }, children: /* @__PURE__ */ jsxDEV("div", { style: {
          width: `${e.hp / e.maxHp * 100}%`,
          height: "100%",
          background: "#f00"
        } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 98,
          columnNumber: 15
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 90,
          columnNumber: 13
        })
      ] }, `e-${i}`, true, {
        fileName: "<stdin>",
        lineNumber: 77,
        columnNumber: 11
      })),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            position: "absolute",
            left: state.player.x,
            top: state.player.y,
            width: 60,
            height: 60,
            transform: `translate(-50%, -50%) rotate(${state.player.angle + Math.PI / 2}rad)`
          },
          children: /* @__PURE__ */ jsxDEV(
            Img,
            {
              src: ASSETS.images.player,
              style: {
                width: "100%",
                height: "100%",
                filter: "drop-shadow(0 0 15px #0ff)"
              }
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 118,
              columnNumber: 11
            }
          )
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 108,
          columnNumber: 9
        }
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 40,
      left: 40,
      color: "#0ff",
      fontSize: "48px",
      fontWeight: "bold",
      fontFamily: "monospace",
      textShadow: "0 0 10px #000"
    }, children: [
      "[REPLAY] LVL ",
      state.level
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 130,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      bottom: 80,
      left: 40,
      color: "#ff0",
      fontSize: "36px",
      fontWeight: "bold",
      fontFamily: "monospace"
    }, children: [
      "GOLD: ",
      state.gold
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 143,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 40,
      left: "50%",
      transform: "translateX(-50%)",
      width: "400px",
      height: "30px",
      background: "rgba(0,0,0,0.5)",
      border: "3px solid #fff"
    }, children: /* @__PURE__ */ jsxDEV("div", { style: {
      width: `${state.player.hp / state.player.maxHp * 100}%`,
      height: "100%",
      background: "#f00"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 166,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 156,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: {
      background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
      backgroundSize: "100% 4px, 3px 100%",
      pointerEvents: "none"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 174,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      bottom: 40,
      right: 40,
      color: "rgba(0,255,255,0.5)",
      fontSize: "24px",
      fontFamily: "monospace"
    }, children: [
      "FRM: ",
      currentFrame,
      " / ",
      frames.length
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 180,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 19,
    columnNumber: 5
  });
};
export {
  ReplayComposition
};
