import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../hooks/useAppSelector";
import { getAllOffices } from "../store/offices";
import { useAppDispatch } from "../hooks/useAppDispatch";
import CustomSpeedDial from "../components/SpeedDial";
import CreateDialog from "../components/CreateDialog";
import OfficeItem from "../components/OfficeItem";
import { CircularProgress } from "@mui/material";

export default function Offices() {
  const dispatch = useAppDispatch();
  const { user, offices, isLoading, isCreateDialogOpen } = useAppSelector(
    (state) => ({
      user: state.auth.user,
      offices: state.offices.list,
      isLoading: state.offices.isLoading,
      isCreateDialogOpen: state.offices.isCreateDialogOpen,
    })
  );

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
          <OfficeItem office={office} key={index} />
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
