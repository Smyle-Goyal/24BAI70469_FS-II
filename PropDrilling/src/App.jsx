import React, { useState } from "react";
import { ChildA } from "./ChildA";

export const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div>
      <h1>Current theme: {theme}</h1>
      {/* Pass theme and setter down the tree */}
      <ChildA theme={theme} setTheme={setTheme} />
    </div>
  );
};

