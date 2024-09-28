import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../hooks/useAppSelector";
import { getAllOffices } from "../store/offices";
import { useAppDispatch } from "../hooks/useAppDispatch";

export default function Offices() {
  const { list } = useAppSelector((state) => ({ list: state.offices.list }));
  const dispatch = useAppDispatch();

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
      {list.map((_: any, index: any) => (
        <Paper elevation={6} square key={index} />
      ))}
    </Box>
  );
}
