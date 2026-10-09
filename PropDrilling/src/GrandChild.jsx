import React from "react";

export const GrandChild = ({ theme, setTheme }) => (
  <button
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    style={{
      background: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#000" : "#fff",
    }}
  >
    Toggle Theme (currently {theme})
  </button>
);