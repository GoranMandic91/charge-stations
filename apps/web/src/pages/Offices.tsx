import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";

import OfficeItem from "../components/OfficeItem";
import CreateDialog from "../components/CreateDialog";
import CustomSpeedDial from "../components/SpeedDial";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getAllOffices, setIsCreateDialogOpen } from "../store/offices";

const POLLING_INTERVAL = 10000;

export default function Offices() {
  const dispatch = useAppDispatch();
  const { user, offices, isLoading } = useAppSelector((state) => ({
    user: state.auth.user,
    offices: state.offices.list,
    isLoading: state.offices.isLoading,
  }));

  useEffect(() => {
    dispatch(getAllOffices() as any);

    const intervalId = setInterval(() => {
      dispatch(dispatch(getAllOffices() as any));
    }, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const actions = [
    {
      icon: <FileCopyIcon />,
      name: "Create New Office",
      clickHandler: () => dispatch(setIsCreateDialogOpen(true)),
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": { m: 1, width: 250, height: 250 },
        }}
      >
        {offices.map((office: any, index: any) => (
          <OfficeItem {...office} key={index} />
        ))}
      </Box>

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {user.role === "admin" && <CreateDialog />}
      {user.role === "admin" && <CustomSpeedDial actions={actions} />}
    </>
  );
}
