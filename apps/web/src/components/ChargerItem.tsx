import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Card, CardContent, CardHeader, Typography, Chip } from "@mui/material";

import { Charger } from "../store/offices";

export default function ChargerItem(charger: Charger) {
  const { id, available, sessionStart, sessionEnd } = charger;

  return (
    <Card sx={{ minWidth: 350, margin: "16px", backgroundColor: "#f5f5f5" }}>
      <CardHeader
        title={`Charging Lot #${id}`}
        sx={{ backgroundColor: available ? "#e0f7fa" : "#ffebee" }}
      />
      <CardContent>
        <Chip
          label={available ? "Available" : "Unavailable"}
          color={available ? "success" : "error"}
          icon={available ? <CheckCircleIcon /> : <CancelIcon />}
          sx={{ marginTop: 1 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
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
          Status:{" "}
          {sessionStart && !sessionEnd
            ? "In Progress"
            : sessionEnd
              ? "Completed"
              : "Not Started"}
        </Typography>
      </CardContent>
    </Card>
  );
}
