import React, { useState } from "react";
import { ProgressBarOut, ProgressBar0 } from "./styled";

export const Progress = ({ bar, color }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      background: `${color}`,
      opacity: 1,
      width: `${bar}%`,
    };
    setStyle(newStyle);
  }, 1000);

  return (
    <ProgressBarOut>
      <ProgressBar0 style={style}>{(bar)}</ProgressBar0>
    </ProgressBarOut>
  );
};
