import React from "react";
import {
  Box,
  Card,
  Chip,
  CardHeader,
  Typography,
  CardContent,
} from "@mui/material";
import { Office } from "../store/offices";
import Button from "@mui/material/Button";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Link as RouterLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function OfficeItem(office: Office) {
  const { _id, name, location, chargers, highDemandDuration } = office;

  return (
    <Card sx={{ minWidth: 350, margin: "16px", backgroundColor: "#e3f2fd" }}>
      <CardHeader
        title={<Typography variant="h6">{name}</Typography>}
        subheader={
          <Box display="flex" alignItems="center">
            <LocationOnIcon fontSize="small" sx={{ marginRight: 0.5 }} />
            {location}
          </Box>
        }
        sx={{ backgroundColor: "#bbdefb" }}
      />
      <CardContent>
        <Chip
          label={`Max Charge Time: ${highDemandDuration} hour(s)`}
          color="warning"
          icon={<FlashOnIcon />}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 1 }}
        >
          Chargers: {chargers.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available: {chargers.filter((c) => c.available).length}
        </Typography>
        <Button
          variant="text"
          color="primary"
          component={RouterLink}
          to={`/offices/${_id}`}
          sx={{ marginTop: 2 }}
          fullWidth
        >
          More Details
        </Button>
      </CardContent>
    </Card>
  );
}
