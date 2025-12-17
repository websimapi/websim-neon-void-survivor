import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, random } from "remotion";
import { ASSETS } from "./assets.js";
const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 1200;
const ReplayComposition = ({ frames }) => {
  const currentFrame = useCurrentFrame();
  const state = frames[currentFrame] || frames[frames.length - 1];
  if (!state) return null;
  const shakeX = (random(`shake-x-${currentFrame}`) - 0.5) * state.shake;
  const shakeY = (random(`shake-y-${currentFrame}`) - 0.5) * state.shake;
  const cam = state.camera || { x: state.player.x - VIEW_WIDTH / 2, y: state.player.y - VIEW_HEIGHT / 2 };
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#050505", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { transform: `translate(${shakeX}px, ${shakeY}px)` }, children: [
      /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { opacity: 0.3 }, children: [...Array(9)].map((_, i) => {
        const bgSize = 1e3;
        const tx = Math.floor(cam.x / bgSize) * bgSize + (i % 3 - 1) * bgSize;
        const ty = Math.floor(cam.y / bgSize) * bgSize + (Math.floor(i / 3) - 1) * bgSize;
        return /* @__PURE__ */ jsxDEV(
          Img,
          {
            src: ASSETS.images.bg,
            style: {
              position: "absolute",
              left: tx - cam.x,
              top: ty - cam.y,
              width: bgSize,
              height: bgSize
            }
          },
          i,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 31,
            columnNumber: 16
          }
        );
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 25,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { transform: `translate(${-cam.x}px, ${-cam.y}px)` }, children: [
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
            lineNumber: 49,
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
            lineNumber: 66,
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
            lineNumber: 83,
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
              lineNumber: 101,
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
            lineNumber: 121,
            columnNumber: 15
          }) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 113,
            columnNumber: 13
          })
        ] }, `e-${i}`, true, {
          fileName: "<stdin>",
          lineNumber: 100,
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
                lineNumber: 141,
                columnNumber: 11
              }
            )
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 131,
            columnNumber: 9
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 46,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 23,
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
      lineNumber: 154,
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
      lineNumber: 167,
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
      lineNumber: 190,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 180,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: {
      background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
      backgroundSize: "100% 4px, 3px 100%",
      pointerEvents: "none"
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 198,
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
      lineNumber: 204,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 22,
    columnNumber: 5
  });
};
export {
  ReplayComposition
};
