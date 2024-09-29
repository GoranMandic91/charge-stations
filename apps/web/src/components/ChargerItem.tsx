import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Stack,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EvStationIcon from "@mui/icons-material/EvStation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { Charger, reserveChargingLot } from "../store/offices";
import { useAppDispatch } from "../hooks/useAppDispatch";

export default function ChargerItem(charger: Charger & { officeId: string }) {
  const dispatch = useAppDispatch();
  const { id, available, sessionStart, sessionEnd, officeId, reservedBy } =
    charger;

  const handleReserveClick = () => {
    if (available) {
      dispatch(reserveChargingLot({ chargerId: id, officeId }) as any);
    }
  };

  return (
    <Card sx={{ minWidth: 350, margin: "16px", backgroundColor: "#f5f5f5" }}>
      <CardHeader
        title={`Charging Lot #${id}`}
        sx={{ backgroundColor: available ? "#e0f7fa" : "#ffebee" }}
        action={
          available && (
            <Tooltip title="Reserve this charging lot">
              <IconButton color="success" onClick={handleReserveClick}>
                <EvStationIcon />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <CardContent>
        <Chip
          label={available ? "Available" : "Unavailable"}
          color={available ? "success" : "error"}
          icon={available ? <CheckCircleIcon /> : <CancelIcon />}
          sx={{ marginTop: 1 }}
        />
        {reservedBy?.name && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
          >
            <PersonIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", marginRight: 0.5 }}
            />
            Reserved by: {reservedBy.name}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          {sessionStart ? (
            <EventAvailableIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", marginRight: 0.5 }}
            />
          ) : (
            <EventBusyIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", marginRight: 0.5 }}
            />
          )}
          Status:{" "}
          {sessionStart && !sessionEnd
            ? "In Progress"
            : sessionEnd
              ? "Completed"
              : "Not Started"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          <AccessTimeIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", marginRight: 0.5 }}
          />
          Session Start:
          {sessionStart
            ? new Date(sessionStart).toLocaleString()
            : "No session started"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          <AccessTimeIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", marginRight: 0.5 }}
          />
          Session End:
          {sessionEnd
            ? new Date(sessionEnd).toLocaleString()
            : "No session ended"}
        </Typography>
      </CardContent>
    </Card>
  );
}
