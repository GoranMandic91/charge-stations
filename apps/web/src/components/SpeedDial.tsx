import * as React from "react";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

export interface ActionItem {
  name: string;
  icon: React.ReactElement;
  clickHandler: () => void;
}

export default function CustomSpeedDial({
  actions,
}: {
  actions: ActionItem[];
}) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: "fixed", bottom: 24, right: 24 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.clickHandler}
        />
      ))}
    </SpeedDial>
  );
}
