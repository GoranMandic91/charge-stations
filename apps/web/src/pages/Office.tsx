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
  getOfficeStatistics,
  getSingleOffice,
  reserveChargingLot,
} from "../store/offices";
import ChargingStatistics from "../components/ChargerStatistics";

const POLLING_INTERVAL = 10000;

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
      clickHandler: () =>
        dispatch(reserveChargingLot({ officeId: office._id }) as any),
    },
  ];

  useEffect(() => {
    if (id) {
      dispatch(getSingleOffice({ id }) as any);
      dispatch(getOfficeStatistics({ id }) as any);

      const intervalId = setInterval(() => {
        dispatch(getSingleOffice({ id }) as any);
        dispatch(getOfficeStatistics({ id }) as any);
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
        {!isLoading &&
          office &&
          office.chargers.map((charger: any, index: any) => (
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
