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
    backgroundImage: `url(${ASSETS.images.bg})`,
    backgroundSize: "cover"
  }, children: [
    view === "menu" && /* @__PURE__ */ jsxDEV("div", { style: overlayStyle, children: [
      /* @__PURE__ */ jsxDEV("h1", { style: titleStyle, children: "NEON VOID" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 60,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("button", { style: buttonStyle, onClick: startGame, children: "START RUN" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 61,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("button", { style: buttonSecondaryStyle, onClick: () => setView("shop"), children: "SHOP" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 62,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { style: statsBoxStyle, children: [
        "Gold: ",
        gold
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 63,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 59,
      columnNumber: 9
    }),
    view === "playing" && /* @__PURE__ */ jsxDEV(Game, { upgrades, onGameOver }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 68,
      columnNumber: 9
    }),
    view === "shop" && /* @__PURE__ */ jsxDEV(Shop, { gold, upgrades, onBuy: buyUpgrade, onBack: () => setView("menu") }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 72,
      columnNumber: 9
    }),
    view === "gameover" && /* @__PURE__ */ jsxDEV("div", { style: overlayStyle, children: [
      /* @__PURE__ */ jsxDEV("h2", { style: { ...titleStyle, fontSize: "3rem", color: "#ff4444" }, children: "VOIDED" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 77,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("div", { style: statsSummaryStyle, children: [
        /* @__PURE__ */ jsxDEV("p", { children: [
          "Level Reached: ",
          stats.level
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 79,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          "Gold Earned: +",
          stats.goldEarned
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 80,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("p", { children: [
          "Enemies Defeated: ",
          stats.kills
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 81,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 78,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("button", { style: buttonStyle, onClick: startGame, children: "RETRY" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 83,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("button", { style: buttonSecondaryStyle, onClick: () => setView("replay"), children: "WATCH REPLAY" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 84,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("button", { style: buttonSecondaryStyle, onClick: () => setView("menu"), children: "MAIN MENU" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 85,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 76,
      columnNumber: 9
    }),
    view === "replay" && lastReplay && /* @__PURE__ */ jsxDEV("div", { style: overlayStyle, children: [
      /* @__PURE__ */ jsxDEV("div", { style: { width: "90%", height: "70%", borderRadius: "10px", overflow: "hidden", border: "2px solid #0ff" }, children: /* @__PURE__ */ jsxDEV(
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
          style: { width: "100%", height: "100%" }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 92,
          columnNumber: 13
        }
      ) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 91,
        columnNumber: 11
      }),
      /* @__PURE__ */ jsxDEV("button", { style: { ...buttonStyle, marginTop: "20px" }, onClick: () => setView("gameover"), children: "BACK" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 11
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 90,
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
  background: "rgba(0,0,0,0.8)",
  zIndex: 100
};
const titleStyle = {
  fontSize: "4rem",
  fontWeight: "bold",
  color: "#0ff",
  textShadow: "0 0 20px #0ff",
  marginBottom: "40px",
  letterSpacing: "8px"
};
const buttonStyle = {
  padding: "15px 40px",
  fontSize: "1.5rem",
  background: "#0ff",
  border: "none",
  borderRadius: "5px",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "15px",
  minWidth: "250px",
  boxShadow: "0 0 15px #0ff"
};
const buttonSecondaryStyle = {
  ...buttonStyle,
  background: "transparent",
  color: "#0ff",
  border: "2px solid #0ff",
  boxShadow: "none"
};
const statsBoxStyle = {
  marginTop: "20px",
  fontSize: "1.2rem",
  color: "#ff0"
};
const statsSummaryStyle = {
  fontSize: "1.3rem",
  textAlign: "center",
  marginBottom: "30px",
  color: "#fff",
  lineHeight: "1.6"
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(Main, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 165,
  columnNumber: 51
}));
