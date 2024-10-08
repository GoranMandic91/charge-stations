import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Tooltip,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EvStationIcon from "@mui/icons-material/EvStation";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  Charger,
  releaseChargingLot,
  reserveChargingLot,
} from "../store/offices";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { User } from "../store/auth";

interface ChargerItemProps {
  charger: Charger;
  officeId: string;
  user?: User;
}

export default function ChargerItem({
  charger,
  officeId,
  user,
}: ChargerItemProps) {
  const dispatch = useAppDispatch();
  const { id, available, sessionStart, sessionEnd, reservedBy } = charger;

  const handleReserveClick = () => {
    if (available) {
      dispatch(reserveChargingLot({ chargerId: id, officeId }));
    }
  };

  const handleReleaseClick = () => {
    if (!available) {
      dispatch(releaseChargingLot({ chargerId: id, officeId }));
    }
  };

  const showRelease =
    !available && (reservedBy?.id === user?._id || user?.role === "admin");

  return (
    <Card sx={{ minWidth: 350, margin: "16px", backgroundColor: "#f5f5f5" }}>
      <CardHeader
        title={`Charging Lot #${id}`}
        sx={{ backgroundColor: available ? "#e0f7fa" : "#ffebee" }}
        action={
          available ? (
            <Tooltip title="Reserve this charging lot">
              <Button
                color="success"
                variant="outlined"
                onClick={handleReserveClick}
                endIcon={<EvStationIcon />}
              >
                Reserve
              </Button>
            </Tooltip>
          ) : (
            showRelease && (
              <Tooltip title="Release this charging lot">
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleReleaseClick}
                  endIcon={<ExitToAppIcon />}
                >
                  Release
                </Button>
              </Tooltip>
            )
          )
        }
      />
      <CardContent>
        <Chip
          label={available ? "Available" : "Unavailable"}
          color={available ? "success" : "error"}
          icon={available ? <CheckCircleIcon /> : <CancelIcon />}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          <PersonIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", marginRight: 0.5 }}
          />
          Reserved by: {reservedBy?.name ?? "N/A"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
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
          Status: {sessionStart ? "In Progress" : "Not Started"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          <AccessTimeIcon
            fontSize="small"
            sx={{ verticalAlign: "middle", marginRight: 0.5 }}
          />
          Session start:
          {sessionStart
            ? new Date(sessionStart).toLocaleString()
            : "No session started"}
        </Typography>
      </CardContent>
    </Card>
  );
}
