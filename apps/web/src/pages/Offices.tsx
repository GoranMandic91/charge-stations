import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";

import { getAllOffices } from "../store/offices";
import OfficeItem from "../components/OfficeItem";
import CreateDialog from "../components/CreateDialog";
import CustomSpeedDial from "../components/SpeedDial";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

export default function Offices() {
  const dispatch = useAppDispatch();
  const { user, offices, isLoading } = useAppSelector((state) => ({
    user: state.auth.user,
    offices: state.offices.list,
    isLoading: state.offices.isLoading,
  }));

  useEffect(() => {
    dispatch(getAllOffices() as any);
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": { m: 1, width: 250, height: 250 },
      }}
    >
      {!isLoading &&
        offices.map((office: any, index: any) => (
          <OfficeItem {...office} key={index} />
        ))}
      {user.role === "admin" && <CustomSpeedDial />}
      {user.role === "admin" && <CreateDialog />}
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
    </Box>
  );
}
