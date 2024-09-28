import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setIsCreateDialogOpen } from "../store/offices";

export default function CustomSpeedDial() {
  const dispatch = useAppDispatch();

  const actions = [
    {
      icon: <FileCopyIcon />,
      name: "Create New Office",
      clickHandler: () => dispatch(setIsCreateDialogOpen(true)),
    },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 24, right: 24 }}
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
