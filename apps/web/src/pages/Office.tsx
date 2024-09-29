import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import EvStationIcon from "@mui/icons-material/EvStation";

import ChargerItem from "../components/ChargerItem";
import CreateDialog from "../components/CreateDialog";
import CustomSpeedDial from "../components/SpeedDial";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { getSingleOffice, reserveChargingLot } from "../store/offices";

export default function Office() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user, office, isLoading } = useAppSelector((state) => ({
    user: state.auth.user,
    office: state.offices.office,
    isLoading: state.offices.isLoading,
  }));

  const actions = [
    {
      icon: <EvStationIcon />,
      name: "Reserve charging lot",
      clickHandler: () =>
        dispatch(reserveChargingLot({ officeId: office._id }) as any),
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getSingleOffice({ id }) as any);
    }
  }, [dispatch, id]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": { m: 1, width: 250, height: 250 },
        }}
      >
        {!isLoading &&
          office &&
          office.chargers.map((charger: any, index: any) => (
            <ChargerItem {...charger} officeId={office._id} key={index} />
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
