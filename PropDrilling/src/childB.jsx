
import React from "react";
import { GrandChild } from "./GrandChild";

export const ChildB = ({ theme, setTheme }) => (
  <div>
    {/* Still no direct usage – forwarding continues */}
    <GrandChild theme={theme} setTheme={setTheme} />
  </div>
);