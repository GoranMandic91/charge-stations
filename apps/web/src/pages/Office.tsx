import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import EvStationIcon from "@mui/icons-material/EvStation";

import ChargerItem from "../components/ChargerItem";
import ChargerQueue from "../components/ChargerQueue";
import CustomSpeedDial from "../components/SpeedDial";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  Charger,
  getOfficeStatistics,
  getSingleOffice,
  reserveChargingLot,
} from "../store/offices";
import ChargingStatistics from "../components/ChargerStatistics";

const POLLING_INTERVAL = 5000;

export default function Office() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user, office, statistics, isLoading } = useAppSelector((state) => ({
    user: state.auth.user,
    office: state.offices.office,
    statistics: state.offices.statistics,
    isLoading: state.offices.isLoading,
  }));

  const actions = [
    {
      icon: <EvStationIcon />,
      name: "Reserve charging lot",
      clickHandler: () => {
        if (office) {
          dispatch(reserveChargingLot({ officeId: office._id }));
        }
      },
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getSingleOffice({ id }));
      dispatch(getOfficeStatistics({ id }));

      const intervalId = setInterval(() => {
        dispatch(getSingleOffice({ id }));
        dispatch(getOfficeStatistics({ id }));
      }, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, id]);

  return (
    <>
      {office && <ChargerQueue {...office} />}
      {statistics && <ChargingStatistics data={statistics} />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": { m: 1, width: 250, height: 250 },
        }}
      >
        {office &&
          office.chargers.map((charger: Charger, index: number) => (
            <ChargerItem
              charger={charger}
              officeId={office._id}
              user={user}
              key={index}
            />
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
      <CustomSpeedDial actions={actions} />
    </>
  );
}
