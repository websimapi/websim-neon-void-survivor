import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
const Shop = ({ gold, upgrades, onBuy, onBack }) => {
  const upgradeList = [
    { key: "health", label: "Hull Integrity", base: 50, growth: 2 },
    { key: "speed", label: "Thrusters", base: 40, growth: 1.8 },
    { key: "damage", label: "Laser Power", base: 60, growth: 2.5 },
    { key: "fireRate", label: "Cooling System", base: 70, growth: 2.2 },
    { key: "goldGain", label: "Greed Magnet", base: 100, growth: 3 }
  ];
  return /* @__PURE__ */ jsxDEV("div", { style: shopOverlayStyle, children: [
    /* @__PURE__ */ jsxDEV("h1", { style: shopTitleStyle, children: "VOID TECH SHOP" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 14,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: goldCounterStyle, children: [
      "GOLD AVAILABLE: ",
      gold
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 15,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: upgradeContainerStyle, children: upgradeList.map((u) => {
      const cost = Math.floor(u.base * Math.pow(u.growth, upgrades[u.key]));
      const canAfford = gold >= cost;
      return /* @__PURE__ */ jsxDEV("div", { style: upgradeCardStyle, children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { style: upgradeLabelStyle, children: u.label }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 24,
            columnNumber: 17
          }),
          /* @__PURE__ */ jsxDEV("div", { style: upgradeLevelStyle, children: [
            "Rank: ",
            upgrades[u.key]
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 25,
            columnNumber: 17
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 23,
          columnNumber: 15
        }),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onBuy(u.key, cost),
            disabled: !canAfford,
            style: {
              ...buyButtonStyle,
              opacity: canAfford ? 1 : 0.5,
              cursor: canAfford ? "pointer" : "not-allowed"
            },
            children: [
              cost,
              "G"
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 27,
            columnNumber: 15
          }
        )
      ] }, u.key, true, {
        fileName: "<stdin>",
        lineNumber: 22,
        columnNumber: 13
      });
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 17,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("button", { style: backButtonStyle, onClick: onBack, children: "RETURN TO BASE" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 13,
    columnNumber: 5
  });
};
const shopOverlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.9)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  zIndex: 110,
  overflowY: "auto"
};
const shopTitleStyle = { color: "#0ff", fontSize: "2.5rem", marginBottom: "10px", textShadow: "0 0 10px #0ff" };
const goldCounterStyle = { color: "#ff0", fontSize: "1.5rem", marginBottom: "30px" };
const upgradeContainerStyle = { width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "15px" };
const upgradeCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid #333",
  borderRadius: "8px"
};
const upgradeLabelStyle = { color: "#fff", fontSize: "1.2rem", fontWeight: "bold" };
const upgradeLevelStyle = { color: "#aaa", fontSize: "0.9rem" };
const buyButtonStyle = {
  padding: "10px 20px",
  background: "#ff0",
  border: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  minWidth: "80px"
};
const backButtonStyle = {
  marginTop: "40px",
  padding: "15px 40px",
  background: "transparent",
  border: "2px solid #0ff",
  color: "#0ff",
  borderRadius: "5px",
  cursor: "pointer"
};
export {
  Shop
};
