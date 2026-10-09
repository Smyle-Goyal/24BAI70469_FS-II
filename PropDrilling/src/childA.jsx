import React from "react";
import { ChildB } from "./ChildB";

export const ChildA = ({ theme, setTheme }) => (
  <section>
    {/* This component does not use the props, it merely forwards them */}
    <ChildB theme={theme} setTheme={setTheme} />
  </section>
);