import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { Game } from "./game.jsx";
import { Shop } from "./shop.jsx";
import { ReplayComposition } from "./composition.jsx";
import { ASSETS } from "./assets.js";
const Main = () => {
  const [view, setView] = useState("menu");
  const [gold, setGold] = useState(parseInt(localStorage.getItem("gold") || "0"));
  const [upgrades, setUpgrades] = useState(JSON.parse(localStorage.getItem("upgrades") || JSON.stringify({
    speed: 0,
    health: 0,
    damage: 0,
    fireRate: 0,
    goldGain: 0
  })));
  const [lastReplay, setLastReplay] = useState(null);
  const [stats, setStats] = useState({ level: 1, goldEarned: 0, kills: 0 });
  useEffect(() => {
    localStorage.setItem("gold", gold);
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
  }, [gold, upgrades]);
  const startGame = () => {
    setView("playing");
  };
  const onGameOver = (gameData) => {
    setLastReplay(gameData.replay);
    setGold((prev) => prev + gameData.goldEarned);
    setStats({
      level: gameData.level,
      goldEarned: gameData.goldEarned,
      kills: gameData.kills
    });
    setView("gameover");
  };
  const buyUpgrade = (key, cost) => {
    if (gold >= cost) {
      setGold((prev) => prev - cost);
      setUpgrades((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { style: {
    width: "100%",
    height: "100%",
    position: "relative",
    background: "#000",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${ASSETS.images.bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }, children: [
    view === "menu" && /* @__PURE__ */ jsxDEV("div", { style: overlayStyle, children: [
      /* @__PURE__ */ jsxDEV("h1", { style: titleStyle, children: "NEON VOID" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 61,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "10px", width: "80%", maxWidth: "300px" }, children: [
        /* @__PURE__ */ jsxDEV("button", { style: buttonStyle, onClick: startGame, children: "START RUN" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 63,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("button", { style: buttonSecondaryStyle, onClick: () => setView("shop"), children: "SHOP" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 64,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 62,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { style: statsBoxStyle, children: [
        "BANKED GOLD: ",
        gold
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 66,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 60,
      columnNumber: 9
    }),
    view === "playing" && /* @__PURE__ */ jsxDEV(Game, { upgrades, onGameOver }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 71,
      columnNumber: 9
    }),
    view === "shop" && /* @__PURE__ */ jsxDEV(Shop, { gold, upgrades, onBuy: buyUpgrade, onBack: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 75,
      columnNumber: 9
    }),
    view === "gameover" && /* @__PURE__ */ jsxDEV("div", { style: overlayStyle, children: [
      /* @__PURE__ */ jsxDEV("h2", { style: { ...titleStyle, fontSize: "3.5rem", color: "#ff4444" }, children: "VOIDED" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 80,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { style: statsSummaryStyle, children: [
        /* @__PURE__ */ jsxDEV("div", { style: { color: "#0ff", fontSize: "1.5rem", marginBottom: "5px" }, children: [
          "LEVEL ",
          stats.level
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 82,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          "GOLD COLLECTED: +",
          stats.goldEarned
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 83,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("div", { children: [
          "KILLS: ",
          stats.kills
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 81,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", flexDirection: "column", gap: "10px", width: "80%", maxWidth: "300px" }, children: [
        /* @__PURE__ */ jsxDEV("button", { style: buttonStyle, onClick: startGame, children: "RETRY" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 87,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("button", { style: buttonSecondaryStyle, onClick: () => setView("replay"), children: "WATCH REPLAY" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 88,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("button", { style: buttonSecondaryStyle, onClick: () => setView("menu"), children: "MAIN MENU" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 89,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 86,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 79,
      columnNumber: 9
    }),
    view === "replay" && lastReplay && /* @__PURE__ */ jsxDEV("div", { style: overlayStyle, children: [
      /* @__PURE__ */ jsxDEV("div", { style: {
        width: "95%",
        height: "80%",
        maxHeight: "80vh",
        borderRadius: "15px",
        overflow: "hidden",
        border: "3px solid #0ff",
        background: "#000",
        boxShadow: "0 0 30px rgba(0,255,255,0.3)"
      }, children: /* @__PURE__ */ jsxDEV(
        Player,
        {
          component: ReplayComposition,
          durationInFrames: lastReplay.length,
          fps: 30,
          compositionWidth: 800,
          compositionHeight: 1200,
          inputProps: { frames: lastReplay },
          autoplay: true,
          loop: true,
          controls: true,
          style: { width: "100%", height: "100%" }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 106,
          columnNumber: 13
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 96,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("button", { style: { ...buttonStyle, marginTop: "20px", minWidth: "200px" }, onClick: () => setView("gameover"), children: "BACK" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 119,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 95,
      columnNumber: 9
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 50,
    columnNumber: 5
  });
};
const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.85)",
  zIndex: 100,
  padding: "20px"
};
const titleStyle = {
  fontSize: "3.5rem",
  fontWeight: "bold",
  color: "#0ff",
  textShadow: "0 0 15px #0ff, 0 0 30px #0ff",
  marginBottom: "40px",
  letterSpacing: "4px",
  textAlign: "center"
};
const buttonStyle = {
  padding: "18px 0",
  fontSize: "1.2rem",
  background: "#0ff",
  border: "none",
  borderRadius: "8px",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  width: "100%",
  boxShadow: "0 0 20px rgba(0,255,255,0.4)",
  transition: "all 0.2s"
};
const buttonSecondaryStyle = {
  ...buttonStyle,
  background: "transparent",
  color: "#0ff",
  border: "2px solid #0ff",
  boxShadow: "none",
  marginTop: "5px"
};
const statsBoxStyle = {
  marginTop: "30px",
  fontSize: "1.1rem",
  color: "#ff0",
  fontWeight: "bold",
  textShadow: "0 0 5px rgba(255,255,0,0.5)"
};
const statsSummaryStyle = {
  fontSize: "1.1rem",
  textAlign: "center",
  marginBottom: "30px",
  color: "#fff",
  lineHeight: "1.8",
  background: "rgba(255,255,255,0.05)",
  padding: "20px 40px",
  borderRadius: "15px",
  border: "1px solid rgba(255,255,255,0.1)"
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(Main, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 189,
  columnNumber: 51
}));
